const jwt =  require('jsonwebtoken');
const User = require('../models/user');
const TOKEN_EXPIRATION = '1m';


exports.createUser =  async (req, res) => {
    const { fullname, username, email, password, contact } = req.body;
    try {
        const isEmailInUse = await User.EmailInUse(email);

        console.log('isEmailInUse:', isEmailInUse);

        if (!isEmailInUse) {
            const user = new User({
                fullname,
                username,
                email,
                password,
                contact,
            });

            await user.save();
            console.log('User saved to database:', user);
            res.json(user);
        } else {
            console.log('Email is already in use.');  
            return res.json({
                success: false,
                message: 'Email already in use'
            });
        }
    } catch (error) {
        console.error('Error creating user:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.userSignIn = async (req, res) => {
    const {username, password} =  req.body
    const user = await User.findOne({username})

    if(!user) return res.json({
        success: false, 
        message: 'User not found with the given username '})

    const isMatch = await user.comparePassword(password)
    if(!isMatch) return res.json({
        success: false, 
        message: 'Username and Password do not match'})
        
        const token = jwt.sign({userId: user._id},
            process.env.JWT_SECRET, {expiresIn: TOKEN_EXPIRATION})
    res.json({success: true, user, token});
};


/* exports.createUser =  async (req, res) => {
    const {fullname, username, email, password, contact} = req.body;
        const isEmailInUse = await User.EmailInUse(email);
        if (!isEmailInUse) {
        return res.json({
            success: false,
            message: 'Email already in use'
        }); 
        }
        const user = new User({
            fullname,
            username,
            email, 
            password,
            contact,
        });
        await user.save();
        res.json(user);
} */