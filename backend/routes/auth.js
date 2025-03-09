const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');

const JWT_SECRET = process.env.JWT_SECRET;

// Utility function to handle errors
const handleErrors = (res, errors) => {
    return res.status(400).json({ errors: errors.array() });
};

// Route 1: Create a new user
router.post('/createuser', [
    body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),
    body('email').isEmail().withMessage('Enter a valid email address'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return handleErrors(res, errors);

    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ error: "User with this email already exists" });

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save the user
        user = new User({ name, email, password: hashedPassword });
        await user.save();

        // Generate JWT token
        const authToken = jwt.sign({ user: { id: user.id } }, JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ message: "User created successfully!", authToken });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Route 2: Authenticate/Login a user
router.post('/login', [
    body('email').isEmail().withMessage('Enter a valid email address'),
    body('password').notEmpty().withMessage('Password is required'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return handleErrors(res, errors);

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "Invalid credentials" });

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        // Generate JWT token
        const authToken = jwt.sign({ user: { id: user.id } }, JWT_SECRET, { expiresIn: '1h' });

        const { password: _, ...userWithoutPassword } = user.toObject();

        res.status(200).json({ message: "Login successful!", authToken, user: userWithoutPassword });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Route 3: Get all users (Protected route)
router.get('/', async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: error.message });
    }
});


//Get Logged-in User Details (token required)
router.get('/getuser', fetchUser, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ error: "User not found" });

        res.json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
