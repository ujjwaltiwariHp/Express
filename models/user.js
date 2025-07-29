const pool = require('../db');

const UserModel = {
  // Find all users
  async getAllUsers() {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
  },

  // Delete user by ID
  async deleteUserById(id) {
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
  }
};

module.exports = UserModel;
