const pool = require('../db');
const getSummary = async (user) => {
  let query = `
    SELECT 
      SUM(CASE WHEN type='income' THEN amount ELSE 0 END) AS total_income,
      SUM(CASE WHEN type='expense' THEN amount ELSE 0 END) AS total_expense
    FROM transactions
    WHERE deleted_at IS NULL
  `;
  let values = [];
  let i = 1;

  if (user.role !== 'admin') {
    query += ` AND user_id = $${i++}`;
    values.push(user.id);
  }

  const result = await pool.query(query, values);

  const income = result.rows[0].total_income || 0;
  const expense = result.rows[0].total_expense || 0;

  return {
    totalIncome: Number(income),
    totalExpense: Number(expense),
    netBalance: Number(income) - Number(expense),
  };
};


const getCategorySummary = async (user) => {
  let query = `
    SELECT c.name, SUM(t.amount) as total
    FROM transactions t
    JOIN categories c ON t.category_id = c.id
    WHERE t.deleted_at IS NULL
  `;

  let values = [];
  let i = 1;

  if (user.role !== 'admin') {
    query += ` AND t.user_id = $${i++}`;
    values.push(user.id);
  }

  query += ` GROUP BY c.name ORDER BY total DESC`;

  const result = await pool.query(query, values);
  return result.rows;
};


const getRecentTransactions = async (user) => {
  let query = `
    SELECT * FROM transactions
    WHERE deleted_at IS NULL
  `;

  let values = [];
  let i = 1;

  if (user.role !== 'admin') {
    query += ` AND user_id = $${i++}`;
    values.push(user.id);
  }

  query += ` ORDER BY date DESC LIMIT 5`;

  const result = await pool.query(query, values);
  return result.rows;
};


const getMonthlyTrends = async (user) => {
  let query = `
    SELECT 
      TO_CHAR(date, 'YYYY-MM') as month,
      SUM(CASE WHEN type='income' THEN amount ELSE 0 END) as income,
      SUM(CASE WHEN type='expense' THEN amount ELSE 0 END) as expense
    FROM transactions
    WHERE deleted_at IS NULL
  `;

  let values = [];
  let i = 1;

  if (user.role !== 'admin') {
    query += ` AND user_id = $${i++}`;
    values.push(user.id);
  }

  query += ` GROUP BY month ORDER BY month`;

  const result = await pool.query(query, values);
  return result.rows;
};


module.exports = {
  getSummary,
  getCategorySummary,
  getRecentTransactions,
  getMonthlyTrends
};