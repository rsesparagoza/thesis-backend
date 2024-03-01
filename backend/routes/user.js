const express = require('express');

const router = express.Router();
const { createUser,
        userSignIn} = require('../controllers/user');
const { validateUserSignUp,
        userValidation,
        validateUserSignIn} = require('../middlewares/validation/user');
const { isAuth  } = require('../middlewares/auth');

router.post('/create-user', validateUserSignUp, userValidation, createUser);
router.post('/sign-in', validateUserSignIn, userValidation, userSignIn);
router.post('/create-post', isAuth, (req, res) => {
    // create post
    res.send('You are in secret route, welcome!');
});

module.exports = router;