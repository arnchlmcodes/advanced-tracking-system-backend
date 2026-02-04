const authService = require('../services/auth.service');
const { isValidCampusId } = require('../utils/idValidator');

class AuthController {
    /**
     * Handles login request.
     * POST /auth/login
     */
    async login(req, res) {
        try {
            const { campusId, password } = req.body;

            // Basic validation
            if (!campusId || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Campus ID and password are required'
                });
            }

            if (!isValidCampusId(campusId)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid Campus ID format'
                });
            }

            // Call service
            const result = await authService.login(campusId, password);

            if (!result.success) {
                return res.status(401).json(result);
            }

            // Return success with masked info if needed, or OTP info for dev
            res.status(200).json(result);

        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({
                success: false,
                message: 'An error occurred during login'
            });
        }
    }

    /**
     * Handles OTP verification.
     * POST /auth/verify-otp
     */
    async verifyOtp(req, res) {
        try {
            const { userId, otp } = req.body;

            if (!userId || !otp) {
                return res.status(400).json({
                    success: false,
                    message: 'User ID and OTP are required'
                });
            }

            const result = await authService.verifyOtp(userId, otp);

            if (!result.success) {
                return res.status(400).json(result);
            }

            res.status(200).json(result);

        } catch (error) {
            console.error('OTP verification error:', error);
            res.status(500).json({
                success: false,
                message: 'An error occurred during verification'
            });
        }
    }
}

module.exports = new AuthController();
