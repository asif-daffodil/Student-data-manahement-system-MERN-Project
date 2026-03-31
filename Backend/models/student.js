const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true
    },
    image: {
        type: String,
        required: false,
    }
}, { timestamps: true, collection: 'student' });

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;