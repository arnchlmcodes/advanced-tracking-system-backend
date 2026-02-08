const { auth } = require('../config/firebase');

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // 🔒 Production auth (or fake token in dev)

        // Support fake token in dev mode
        if (process.env.NODE_ENV !== 'production' && authHeader === 'Bearer fake-admin-token') {
            req.user = {
                uid: 'admin-uid',
                email: 'admin@gmail.com',
                role: 'admin'
            };
            return next();
        }

        if (!authHeader?.startsWith('Bearer ')) {
            // Dev-only fallback: Treat unauthenticated dev requests as 'test-user'
            if (process.env.NODE_ENV !== 'production') {
                req.user = { uid: 'test-user-123', email: 'test@example.com', role: 'user' };
                return next();
            }
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = await auth.verifyIdToken(token);

        // Hardcode admin logic based on email for convenience
        if (decoded.email === 'admin@gmail.com') {
            decoded.role = 'admin';
        } else {
            decoded.role = decoded.role || 'user';
        }

        req.user = decoded;
        next();
    } catch (err) {
        console.error('Auth Middleware Error:', err.message);
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};
