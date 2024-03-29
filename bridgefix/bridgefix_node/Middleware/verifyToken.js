const jwt = require('jsonwebtoken')
const JWT_SECRET = '59a082d57c643853959807b8ad2517160caa9f162efd9b2bf7585b811a2fb14e';

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization; 

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: Token not provided' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized: Invalid token' });
        }
        req.userId = decoded.userId; 
        next();
    });
};

module.exports = verifyToken;