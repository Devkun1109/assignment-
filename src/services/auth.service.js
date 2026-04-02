const pool = require('../db');
const { hashPassword, comparePassword } = require('../utils/hash');
const { generateToken } = require('../utils/jwt');

const registerUser = async ({ name, email, password, role = 'viewer' }) => {
  // get role_id
  const roleRes = await pool.query(
    'SELECT id FROM roles WHERE name = $1',
    [role]
  );

  if (roleRes.rows.length === 0) {
    throw new Error('Invalid role');
  }

  const role_id = roleRes.rows[0].id;

  const hashed = await hashPassword(password);

  const result = await pool.query(
    `INSERT INTO users (name, email, password_hash, role_id)
     VALUES ($1, $2, $3, $4)
     RETURNING id, email`,
    [name, email, hashed, role_id]
  );

  return result.rows[0];
};

const loginUser = async ({ email, password }) => {
  const result = await pool.query(
    `SELECT u.*, r.name as role
     FROM users u
     JOIN roles r ON u.role_id = r.id
     WHERE email = $1`,
    [email]
  );

  if (result.rows.length === 0) {
    throw new Error('User not found');
  }

  const user = result.rows[0];

  const isMatch = await comparePassword(password, user.password_hash);

  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const token = generateToken({
    id: user.id,
    role: user.role,
  });

  return { token };
};

module.exports = { registerUser, loginUser };