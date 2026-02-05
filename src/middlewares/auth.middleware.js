const { auth } = require('../config/firebase');

module.exports = async (req, res, next) => {
    // ✅ Dev-only bypass
    if (process.env.NODE_ENV !== 'production') {
        req.user = {
            uid: 'test-user-123',
            role: 'admin' // or 'user'
        };
        return next();
    }

    // 🔒 Production auth
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = await auth.verifyIdToken(token);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};
