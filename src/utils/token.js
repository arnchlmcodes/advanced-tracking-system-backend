const jwt = require('jsonwebtoken');

// WARNING: checking env vars in critical path, but better to fail early if missing
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_please_change_in_prod';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

/**
 * Generates a JWT token for a user.
 * 
 * @param {object} payload - Data to encode (userId, role, etc)
 * @returns {string} - The JWT token
 */
const generateToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

/**
 * Verifies a JWT token.
 * 
 * @param {string} token 
 * @returns {object|null} - Decoded payload or null if invalid
 */
const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
};

module.exports = { generateToken, verifyToken };
