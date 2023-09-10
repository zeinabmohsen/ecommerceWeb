const dotenv = require('dotenv');
const asyncHandler = require('async-handler');
const ApiError = require('../utils/apiError')
const jwt = require('jsonwebtoken');
const pool = require('../models/database')
const {hashPassword,comparePasswords} = require('../models/hashPassword')
dotenv.config();

const signUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        const hashedPassword = await hashPassword(password);
        const insertQuery = `
            INSERT INTO users ("username", "email", "password")
            VALUES ($1, $2, $3)
            RETURNING "username", "email"
        `;
        const result = await pool.query(insertQuery, [username, email, hashedPassword]);

        const insertedUser = result.rows[0];
        res.status(201).json(insertedUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Retrieve user from the database
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const storedHashedPassword = user.rows[0].password;

        // Compare passwords
        const isPasswordValid = await comparePasswords(password, storedHashedPassword);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate and send JWT
        const token = jwt.sign({ userId: user.rows[0].id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



const protect = async (req, res, next) => {
    // 1) Check if token exists; if it exists, get it
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    
    // If no token, return unauthorized
    if (!token) {
        return next(new ApiError('You are not logged in. Please log in to access this route.', 401));
    }

    try {
        // 2) Verify the token (no change happens, expired token)
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); 
        // 3) Check if the user exists in the database
        const currentUser = await pool.query('SELECT * FROM users WHERE id = $1', [decoded.userId]);
        if (currentUser.rows.length === 0) {
            return next(new ApiError('The user associated with this token does not exist.', 401));
        }
        
        // 4) Check if the user changed their password after the token was created
        if (currentUser.rows[0].passwordChangedAt) {
            const passChangedTimestamp = parseInt(
                currentUser.rows[0].passwordChangedAt.getTime() / 1000,
                10
            );
            
            // 5) Password changed after the token was created (Error)
            if (passChangedTimestamp > decoded.iat) {
                return next(new ApiError('User recently changed their password. Please log in again.', 401));
            }
        }
        
        req.user = currentUser.rows[0];
        next();
    } catch (error) {
        return next(new ApiError('Authentication failed. Invalid token.', 401));
    }
}


module.exports = {
    login,
    signUp,
    protect
}

