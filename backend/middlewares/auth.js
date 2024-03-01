const jwt = require('jsonwebtoken');
const User = require('../models/user'); 
// require('dotenv').config();  


exports.isAuth = async (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    console.log('Received Token:', token);

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded Token:');
        console.log('  Issued At:', new Date(decode.iat * 1000).toLocaleString());
        console.log('  Expiration Time:', new Date(decode.exp * 1000).toLocaleString());

        const user = await User.findById(decode.userId);
        if (!user) {
        console.error('User not found for the decoded token.');
        return res.json({ success: false, message: 'Unauthorized access' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Error during token verification:', error);

        if (error.name === 'JsonWebTokenError') {
            return res.json({ success: false, message: 'Unauthorized access' });
        }
        if (error.name === 'TokenExpiredError') {
            return res.json({ success: false, message: 'Session has expired, sign in again' });
        }

        res.json({ success: false, message: 'Internal server error' });
    }
  } else {
    console.log('No authorization header found in the request.');
    res.json({ success: false, message: 'Unauthorized access' });
  }
};




  
/* exports.isAuth = async (req, res, next) => {  
    if (req.headers && req.headers.authorization){
        const token = req.headers.authorization.split(' ')[1];
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decode.userId);
            if(!user){
                return res.json({success: false, message: 'Unauthorized access'});
            }
            req.user = user;
            next();
        } catch (error) {
            if(error.name === 'JsonWebTokenError'){
                return res.json({success: false, message: 'Unauthorized access'});
            }
            if(error.name === 'TokenExpiredError'){
                return res.json({success: false, message: 'Session has expired, sign in again'});
            }
            res.json({success: false, message: 'Internal server error'});
        }
        
    } else {
        res.json({success: false, message: 'Unauthorized access'})
    }
};  */



/* exports.isAuth = (req, res, next) => {  
    console.log(req.headers.authorization);
}; */