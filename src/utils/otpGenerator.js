const crypto = require('crypto');

/**
 * Generates a numeric OTP of specified length.
 * Default length is 6.
 * 
 * @param {number} length 
 * @returns {string}
 */
const generateOtp = (length = 6) => {
    if (length <= 0) length = 6;
    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;
    return crypto.randomInt(min, max + 1).toString();
};

module.exports = { generateOtp };
