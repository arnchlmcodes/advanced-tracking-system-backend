const { reserveItem, completeSale } = require("../services/sale.service");

const buyItem = async (req, res) => {
  try {
    const { itemId } = req.body;
    const buyerId = req.user.uid;

    await reserveItem(itemId, buyerId);
    await completeSale(itemId, buyerId);

    res.status(200).json({ message: "Purchase successful" });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

module.exports = {
  buyItem
};
