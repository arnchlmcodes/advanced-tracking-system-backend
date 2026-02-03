const { success, error } = require('../utils/response');

const getFeatureData = async (req, res) => {
    try {
        return success(res, { data: 'Feature X data' });
    } catch (err) {
        return error(res, 'Error fetching Feature X data', 500, err);
    }
};

const createFeatureItem = async (req, res) => {
    try {
        const { name } = req.body;
        return success(res, { id: 123, name }, 'Feature item created', 201);
    } catch (err) {
        return error(res, 'Error creating feature item', 500, err);
    }
}

module.exports = {
    getFeatureData,
    createFeatureItem
};
