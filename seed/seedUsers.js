const pool = require('../db'); // PostgreSQL pool
const bcrypt = require('bcrypt');

// Sample user data
const users = [
  {
    first_name: 'Ujjwal',
    last_name: 'Tiwari',
    email: 'ujjwal@example.com',
    password: 'password123',
    dob: '1998-03-15',
    mobile_no: '9998887771'
  },
  {
    first_name: 'Aman',
    last_name: 'Singh',
    email: 'aman@example.com',
    password: 'password123',
    dob: '2002-07-20',
    mobile_no: '8887776662'
  },
  {
    first_name: 'Neha',
    last_name: 'Kumar',
    email: 'neha@example.com',
    password: 'password123',
    dob: '1995-01-05',
    mobile_no: '7776665553'
  },
  {
    first_name: 'Ravi',
    last_name: 'Verma',
    email: 'ravi@example.com',
    password: 'password123',
    dob: '2000-12-10',
    mobile_no: '6665554444'
  },
  {
    first_name: 'Anjali',
    last_name: 'Sharma',
    email: 'anjali@example.com',
    password: 'password123',
    dob: '1997-06-22',
    mobile_no: '5554443335'
  }
];

const seedUsers = async () => {
  try {
    for (const user of users) {
      // Hash password
      const hashedPassword = await bcrypt.hash(user.password, 10);

      // Insert into users table
      const userResult = await pool.query(
        `INSERT INTO users (first_name, last_name, email, password)
         VALUES ($1, $2, $3, $4) RETURNING id`,
        [user.first_name, user.last_name, user.email, hashedPassword]
      );

      const userId = userResult.rows[0].id;

      // Insert into user_profiles table
      await pool.query(
        `INSERT INTO user_profiles (user_id, dob, mobile_no)
         VALUES ($1, $2, $3)`,
        [userId, user.dob, user.mobile_no]
      );
    }

    console.log('✅ Successfully seeded 5 users');
  } catch (err) {
    console.error('❌ Error seeding users:', err.message);
  } finally {
    process.exit(); // Exit the script
  }
};

seedUsers();
