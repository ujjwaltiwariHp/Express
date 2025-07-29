const pool = require('../db');

const UserProfile = {
  // Get average age of all users
  async getAverageAge() {
    const result = await pool.query(`
      SELECT AVG(EXTRACT(YEAR FROM AGE(dob))) AS avg_age
      FROM user_profiles
    `);
    return result.rows[0].avg_age;
  },

  // Get all user IDs where age > given age
  async getUserIdsAboveAge(age) {
    const result = await pool.query(`
      SELECT user_id
      FROM user_profiles
      WHERE EXTRACT(YEAR FROM AGE(dob)) > $1
    `, [age]);

    return result.rows.map(row => row.user_id);
  }
};

module.exports = UserProfile;
