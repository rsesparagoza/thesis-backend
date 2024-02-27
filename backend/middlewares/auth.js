

exports.isAuth = (req, res, next) => {
    console.log(req.headers.authorization);
    next();
};