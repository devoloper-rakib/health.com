const express = require('express');

const app = express();
require('dotenv').config();
const dbConfig = require('./config/dbConfig');
app.use(express.json());

const userRoutes = require('./src/routes/userRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const doctorRoutes = require('./src/routes/doctorsRoutes');

const port = process.env.PORT || 5000;

app.get('/health', (req, res) => {
	res.send('Server is up and running');
});

app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/doctor', doctorRoutes);

app.listen(port, () => console.log(`Server started on port ${port}`));
