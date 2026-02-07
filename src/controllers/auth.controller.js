const { success, error } = require('../utils/response');

const login = async (req, res) => {
    try {
        // Logic for login (usually handled on client side with Firebase, token passed to backend)
        // Here we might verify the user or return profile data
        const { token } = req.body;
        // ... verification logic ...

        return success(res, { message: 'Login successful' });
    } catch (err) {
        return error(res, 'Login failed', 500, err);
    }
};
// Registration controller
const register = async (req, res) => {
    try {
        // Registration logic
        return success(res, { message: 'User registered' }, 'User created', 201);
    } catch (err) {
        return error(res, 'Registration failed', 500, err);
    }
}

module.exports = {
    login,
    register
};
