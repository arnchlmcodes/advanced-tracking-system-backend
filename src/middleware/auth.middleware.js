const { verifyToken } = require('../utils/token');

/**
 * Middleware to protect routes by verifying JWT token.
 * Attaches decoded user data to req.user.
 */
const authenticate = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. No token provided.'
            });
        }

        const token = authHeader.split(' ')[1];
        const decoded = verifyToken(token);

        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: 'Invalid or expired token.'
            });
        }

        req.user = decoded;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

module.exports = { authenticate };
