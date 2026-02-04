import { db } from "../config/firebase.js";

export const logAudit = async ({
  action,
  performedBy,
  role,
  itemId,
  details = {}
}) => {
  await db.collection("audit_logs").add({
    action,
    performedBy,
    role,
    itemId,
    details,
    timestamp: Date.now(),
  });
};
