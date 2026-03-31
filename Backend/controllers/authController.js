const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');

const login = (req, res) => {
    const { email, password } = req.body;
    Admin.findOne({ email: email })
        .then(admin => {
            if (!admin) {
                return res.status(404).json({ message: 'Admin not found' });
            }
            bcrypt.compare(password, admin.password)
                .then(isMatch => {
                    if (!isMatch) {
                        return res.status(401).json({ message: 'Invalid credentials' });
                    }
                    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                    res.json({ token });
                })
        })
};

const isAuthenticated = (req, res) => {
    res.status(200).json({ message: 'Authenticated', user: req.user });
};

const logout = (req, res) => {
    // distroy the token
    res.status(200).json({ message: 'Logged out successfully' });
}

module.exports = { login, isAuthenticated, logout };