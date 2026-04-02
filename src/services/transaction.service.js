const pool=require('../db');
const createTransaction=async(data,user)=>{
  const {amount,type,category_id,date,notes} = data;

  const result=await pool.query(
    'INSERT INTO transactions(user_id,amount,type,category_id,date,notes) VALUES($1,$2,$3,$4,$5,$6) RETURNING *',
    [user.id,amount,type,category_id,date,notes]
  );
  return result.rows[0];
};
const getTransactions=async(filters,user)=>{
  let query='SELECT * FROM transactions WHERE 1=1';
  let values=[];
  let i=1;

  if(user.role!=='admin') {
    query+=' AND user_id=$${i++}';
    values.push(user.id);
  }
  if(filters.type) {
    query+=' AND type = $${i++}';
    values.push(filters.type);
  }
  if(filters.category_id) {
    query+=' AND category_id = $${i++}';
    values.push(filters.category_id);
  }
  if(filters.startDate && filters.endDate) {
    query+=' AND date BETWEEN $${i++} AND $${i++}';
    values.push(filters.startDate,filters.endDate);
  }
  const result=await pool.query(query,values);
  return result.rows;
};

module.exports={createTransaction,getTransactions};