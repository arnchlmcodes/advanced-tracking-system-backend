const { approveForSale } = require("../services/sale.service");

/**
 * Admin approves an item for sale
 * Route: POST /api/admin/sale/approve
 */
const approveSale = async (req, res) => {
  try {
    const { itemId, price } = req.body;

    // ✅ BASIC VALIDATION
    if (!itemId || price === undefined) {
      return res.status(400).json({
        message: "itemId and price are required",
      });
    }

    // ✅ ADMIN ID (comes from auth middleware)
    // Your friend’s admin backend will later ensure this is an admin
    const adminId = req.user?.uid;

    if (!adminId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    // ✅ CALL SERVICE (now includes audit logging)
    await approveForSale(itemId.trim(), price, adminId);

    return res.status(200).json({
      message: "Item approved for sale",
    });
  } catch (error) {
    console.error("❌ Admin approve error:", error.message);

    return res.status(500).json({
      message: error.message || "Failed to approve item",
    });
  }
};

module.exports = {
  approveSale
};
