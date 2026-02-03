const firebaseService = require('../services/firebase.service');
const { error } = require('../utils/response');

const verifyAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return error(res, 'Unauthorized: No token provided', 401);
        }

        const token = authHeader.split(' ')[1];
        const decodedToken = await firebaseService.verifyToken(token);

        req.user = decodedToken;
        next();
    } catch (err) {
        console.error('Auth Middleware Error:', err);
        return error(res, 'Unauthorized: Invalid token', 401, err.message);
    }
};

module.exports = verifyAuth;
