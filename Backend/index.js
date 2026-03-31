const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
app.use(cors({
    origin: '*', 
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const mongoose = require('mongoose');

const mongooseConnection = mongoose.connect(process.env.MONGO_URI);
if (mongooseConnection) {
    console.log('Connected to MongoDB');
} else {
    console.log('Failed to connect to MongoDB');
}

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const studentRoutes = require('./routes/student');
app.use('/api/students', studentRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});