const jwt = require('jsonwebtoken');

if (process.env.NODE_ENV != 'production') {
    require('dotenv/config');
}
const { SECRET_KEY } = process.env;

const generateToken = (id) => {
    const token = jwt.sign({ id }, SECRET_KEY, { expiresIn: 600 });

    return token;
};

const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(401).json({
            auth: false, message: 'No token provided.'
        });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                auth: false, message: 'Failed to authenticate token.'
            });
        }
        req.id = decoded.id
        next();
    });
}

module.exports = {
    generateToken,
    verifyToken
};
