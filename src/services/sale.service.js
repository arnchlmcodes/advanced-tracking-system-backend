const { db } = require('../config/firebase');

/**
 * Admin approves an item for sale
 * Conditions:
 * - Item must exist
 * - Item must be marked saleEligible
 * - Price must be a valid positive number
 */
const approveForSale = async (itemId, price) => {
  const ref = db.collection("items").doc(itemId);
  const doc = await ref.get();

  if (!doc.exists) {
    throw new Error("Item not found");
  }

  const item = doc.data();

  // 🔒 Ensure item is eligible for sale
  if (!item.saleEligible) {
    throw new Error("Item is not eligible for sale");
  }

  // 🔒 Validate price
  if (typeof price !== "number" || price <= 0) {
    throw new Error("Invalid price");
  }

  await ref.update({
    price,
    saleApproved: true,
    saleStatus: "listed",
    approvedAt: Date.now(),
  });
};

/**
 * Buyer reserves an item
 * Rule: First buyer wins
 */
const reserveItem = async (itemId, buyerId) => {
  const ref = db.collection("items").doc(itemId);

  await db.runTransaction(async (t) => {
    const doc = await t.get(ref);

    if (!doc.exists) {
      throw new Error("Item not found");
    }

    const item = doc.data();

    // 🔒 Item must be listed
    if (item.saleStatus !== "listed") {
      throw new Error("Item not available for sale");
    }

    t.update(ref, {
      saleStatus: "reserved",
      reservedBy: buyerId,
      reservedAt: Date.now(),
    });
  });
};

/**
 * Complete the sale
 * Condition:
 * - Item must be reserved before completing sale
 */
const completeSale = async (itemId, buyerId) => {
  const ref = db.collection("items").doc(itemId);
  const doc = await ref.get();

  if (!doc.exists) {
    throw new Error("Item not found");
  }

  const item = doc.data();

  // 🔒 Ensure correct flow
  if (item.saleStatus !== "reserved") {
    throw new Error("Item must be reserved before completing sale");
  }

  await ref.update({
    saleStatus: "sold",
    ownerId: buyerId,
    soldAt: Date.now(),
  });
};

module.exports = {
  approveForSale,
  reserveItem,
  completeSale
};
