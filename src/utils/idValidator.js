/**
 * Validates the format of a Campus ID.
 * Expected format: 1-3 uppercase letters followed by 4-6 digits.
 * Example: ST12345, ADM998877
 * 
 * @param {string} campusId 
 * @returns {boolean}
 */
const isValidCampusId = (campusId) => {
    if (!campusId || typeof campusId !== 'string') return false;
    const regex = /^[A-Z]{1,3}\d{4,6}$/;
    return regex.test(campusId);
};

module.exports = { isValidCampusId };
