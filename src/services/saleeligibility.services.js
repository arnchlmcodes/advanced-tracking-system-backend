import { db } from "../../../src/config/firebase.js";

export const markSaleEligibleItems = async () => {
  const snapshot = await db
    .collection("items")
    .where("status", "==", "unclaimed")
    .get();

  const now = Date.now();
  const limit = Number(process.env.SALE_ELIGIBLE_DAYS) * 86400000;

  snapshot.forEach(async (doc) => {
    const item = doc.data();
    if (now - item.unclaimedSince > limit) {
      await doc.ref.update({
        saleEligible: true,
        saleEligibleAt: now,
      });
    }
  });
};
