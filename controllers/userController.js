const UserModel = require('../models/user');
const UserProfileModel = require('../models/userProfile');

// Controller object
const UserController = {
  // GET /api/users/average-age
  async getAverageAge(req, res) {
    try {
      const avgAge = await UserProfileModel.getAverageAge();
      res.status(200).json({ average_age: parseFloat(avgAge).toFixed(2) });
    } catch (err) {
      console.error('Error getting average age:', err.message);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // DELETE /api/users/delete-over-25
  async deleteUsersOver25(req, res) {
    try {
      const userIds = await UserProfileModel.getUserIdsAboveAge(25);

      for (const id of userIds) {
        await UserModel.deleteUserById(id);
      }

      res.status(200).json({ message: `${userIds.length} user(s) deleted.` });
    } catch (err) {
      console.error('Error deleting users:', err.message);
      res.status(500).json({ error: 'Server error' });
    }
  }
};

module.exports = UserController;
