const express = require('express');
const router = express.Router();
const isAuthorised = require('../middlewares/isAuthorised');
const uploadImage = require('../middlewares/uploadImage');
const { addStudent, getStudents, getStudent, updateStudent, deleteStudent} = require('../controllers/studentController');

router.post('/add-student', isAuthorised, uploadImage.single('image'), addStudent);
router.get('/get-students', getStudents);
router.get('/get-student/:id', isAuthorised, getStudent);
router.put('/update-student/:id', isAuthorised, uploadImage.single('image'), updateStudent);
router.delete('/delete-student/:id', isAuthorised, deleteStudent);

module.exports = router;

