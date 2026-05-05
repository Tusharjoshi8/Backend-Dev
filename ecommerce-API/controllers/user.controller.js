import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';

// using scyncronous functions for better readability and error handling

export function loginuser(req, res) {
    try {
        const { email, password } = req.body;
        // Find user by email
        const user = User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Compare password
        const isMatch = bcrypt.compareSync(password, user.passwordHash);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Generate JWT
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });


    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Server error' });

    }
} 