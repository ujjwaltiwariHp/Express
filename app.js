require('dotenv').config();
const express = require('express');
const app = express();
const pool = require('./db');
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running');
});

// future route: app.use('/api/users', require('./routes/userRoutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
