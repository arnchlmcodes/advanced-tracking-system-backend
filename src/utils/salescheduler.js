import { markSaleEligibleItems } from "../services/saleEligibility.service.js";

export const runDailySaleCheck = async () => {
  await markSaleEligibleItems();
};
