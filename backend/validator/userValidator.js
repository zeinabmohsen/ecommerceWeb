const {check,body} = require('express-validator');
const validatorMiddleware = require('./validationMiddleware')
const pool = require('../models/database')
const bcrypt = require('bcrypt');

exports.checkUserValidator = [
    check('password')
        .notEmpty().withMessage('Password required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    check('passwordConfirm')
        .notEmpty().withMessage('Password Confirmation required')
        .custom((passwordConfirm, { req }) => {
            if (passwordConfirm !== req.body.password) {
                throw new Error('Password Confirmation Error');
            }
            return true; 
        }),
    validatorMiddleware
];



exports.changeUserPasswordValidator = [
    check('id')
        .isInt() 
        .withMessage('Invalid User id format'),
    body('currentPassword')
        .notEmpty()
        .withMessage('You must enter your current password'),
    body('passwordConfirm')
        .notEmpty()
        .withMessage('You must enter the password confirm'),
    body('password')
        .notEmpty()
        .withMessage('You must enter new password')
        .custom(async (val, { req }) => {
            try {
                // 1) Verify current password
                const id = parseInt(req.params.id);
                const userQuery = 'SELECT * FROM users WHERE id = $1';
                const userResult = await pool.query(userQuery, [id]);
                const user = userResult.rows[0];

                if (!user) {
                    throw new Error('There is no user for this id');
                }

                const isCorrectPassword = await bcrypt.compare(
                    req.body.currentPassword,
                    user.password
                );
                if (!isCorrectPassword) {
                    throw new Error('Incorrect current password');
                }

                // 2) Verify password confirm
                if (val !== req.body.passwordConfirm) {
                    throw new Error('Password Confirmation incorrect');
                }
                return true;
            } catch (error) {
                throw new Error(error.message); 
            }
        }),
    validatorMiddleware
];