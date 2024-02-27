const {check, validationResult} = require('express-validator');

exports.validateUserSignUp = [
    check('fullname')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Name should be provided')
        .isString()
        .withMessage('Enter valid name')
        .isLength({min: 3, max: 20})
        .withMessage('Fullname must be within 3 to 20 characters'),
    check('username')
        .trim()
        .not()
        .isEmpty()
        .isLength({min: 3, max: 10})
        .withMessage('Username must be within 3 to 20 characters'),
    check('email')
        .normalizeEmail()
        .isEmail()
        .withMessage('Invalid email'),
    check('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Password is empty')
        .isLength({min: 5, max: 15})
        .withMessage('Password must be 5 to 15 characters'),
    check('conPassword')
        .trim()
        .not()
        .isEmpty()
        .custom((value, {req}) => {
            if(value !== req.body.password){
                throw new Error('Both passwords should match')
            }
            return true;
        }),
    check('contact')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Contact field is required')
        .isNumeric()
        .withMessage('Contact must be a numeric value')
        .isLength({ min: 11, max: 11 })
        .withMessage('Contact must have exactly 11 digits'),
    
]

exports.userValidation = (req, res, next) => {
    const result = validationResult(req).array();
    if(!result.length) return next();

    const error = result[0].msg;
    res.json({success: false, message: error});
} 

exports.validateUserSignIn = [
    check('username')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Enter username'),
    check('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Password is required')
]

/* exports.validateUserSignIn = [
    check('username')
        .trim()
        .isEmail()
        .withMessage('Username and Password are required'),
    check('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Username and Password are required')
] */

/* exports.userValidation = (req, res, next) => {
    const errors = validationResult(req).array();

    // Extract email and username from the request body
    const { email, username } = req.body;

    // Include email and username in the response
    const response = {
        errors,
        email,
        username
    };

    console.log(response);

    return res.status(400).json(response);
}; */