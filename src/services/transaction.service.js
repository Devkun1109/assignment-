const pool = require('../db');


// 🔹 CREATE
const createTransaction = async (data, user) => {
  const { amount, type, category_id, date, notes } = data;

  const result = await pool.query(
    `INSERT INTO transactions 
     (user_id, amount, type, category_id, date, notes)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [user.id, amount, type, category_id, date, notes]
  );

  return result.rows[0];
};


// 🔹 GET (with filters + pagination + soft delete)
const getTransactions=async(filters,user)=>{
  let{
    page=1,
    limit=10,
    type,
    category_id,
    startDate,
    endDate
  } = filters;

  page = Number(page);
  limit = Number(limit);

  if (page < 1) page = 1;
  if (limit > 50) limit = 50;

  const offset = (page - 1) * limit;

  let baseQuery = `FROM transactions WHERE deleted_at IS NULL`;
  let values = [];
  let i = 1;

  // 🔒 role restriction
  if (user.role !== 'admin') {
    baseQuery += ` AND user_id = $${i++}`;
    values.push(user.id);
  }

  // filters
  if (type) {
    baseQuery += ` AND type = $${i++}`;
    values.push(type);
  }

  if (category_id) {
    baseQuery += ` AND category_id = $${i++}`;
    values.push(category_id);
  }

  if (startDate && endDate) {
    baseQuery += ` AND date BETWEEN $${i++} AND $${i++}`;
    values.push(startDate, endDate);
  }

  // 🔹 total count
  const countResult = await pool.query(
    `SELECT COUNT(*) ${baseQuery}`,
    values
  );

  const total = Number(countResult.rows[0].count);

  // 🔹 data query
  const dataQuery = `
    SELECT * ${baseQuery}
    ORDER BY date DESC
    LIMIT $${i++} OFFSET $${i++}
  `;

  const result = await pool.query(
    dataQuery,
    [...values, limit, offset]
  );

  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    data: result.rows
  };
};


// 🔹 UPDATE
const updateTransaction = async (id, data, user) => {
  const { amount, type, category_id, date, notes } = data;

  let query = `
    UPDATE transactions
    SET amount=$1, type=$2, category_id=$3, date=$4, notes=$5
    WHERE id=$6 AND deleted_at IS NULL
  `;

  let values = [amount, type, category_id, date, notes, id];

  // 🔒 restrict non-admin
  if (user.role !== 'admin') {
    query += ` AND user_id=$7`;
    values.push(user.id);
  }

  const result = await pool.query(query, values);

  if (result.rowCount === 0) {
    throw new Error('Transaction not found or not allowed');
  }

  return { message: 'Transaction updated' };
};


// 🔹 SOFT DELETE
const deleteTransaction = async (id, user) => {
  let query = `
    UPDATE transactions
    SET deleted_at = CURRENT_TIMESTAMP
    WHERE id = $1 AND deleted_at IS NULL
  `;

  let values = [id];

  if (user.role !== 'admin') {
    query += ` AND user_id = $2`;
    values.push(user.id);
  }

  const result = await pool.query(query, values);

  if (result.rowCount === 0) {
    throw new Error('Transaction not found or not allowed');
  }

  return { message: 'Transaction deleted (soft)' };
};


module.exports = {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction
};