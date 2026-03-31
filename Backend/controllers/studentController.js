const Student = require('../models/student');
const fs = require('fs');

const addStudent = async (req, res) => {
    const name = req.body?.name;
    const gender = req.body?.gender;

    if (!name || !gender) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const image = req.file ? `/uploads/students/${req.file.filename}` : undefined;

    try {
        const student = await Student.create({
            name,
            gender,
            ...(image ? { image } : {})
        });
        return res.status(201).json({ message: 'Student added successfully', student });
    } catch (err) {
        return res.status(500).json({ message: 'Error adding student', error: err.message });
    }
};

const getStudents = (req, res) => {
    Student.find().then(students => {
        res.status(200).json({ students });
    })
};


const updateStudent = async (req, res) => {
    const studentId = req.params.id;
    const name = req.body?.name;
    const gender = req.body?.gender;

    if (!name || !gender) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const image = req.file ? `/uploads/students/${req.file.filename}` : undefined;

    if (image) {
        // delete the old image
        const student = await Student.findById(studentId);
        if (student && student.image) {
            const oldImagePath = `.${student.image}`;
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
        }
    }

    try {
        const student = await Student.findByIdAndUpdate(studentId, { name, gender, ...(image ? { image } : {}) }, { new: true });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        return res.status(200).json({ message: 'Student updated successfully', student });
    } catch (err) {
        return res.status(500).json({ message: 'Error updating student', error: err.message });
    }
}

const deleteStudent = async (req, res) => {
    const studentId = req.params.id;
    try {
        const student = await Student.findByIdAndDelete(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        // delete the image if exists
        if (student.image) {
            const imagePath = `.${student.image}`;
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        return res.status(200).json({ message: 'Student deleted successfully' });
    } catch (err) {
        return res.status(500).json({ message: 'Error deleting student', error: err.message });
    }
};


module.exports = { addStudent, getStudents, updateStudent, deleteStudent };