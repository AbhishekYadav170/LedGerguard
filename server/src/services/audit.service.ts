import AuditLog from "../models/AuditLog";

export const createAuditLog = async (
  action: string,
  userId: string,
  tenantId: string
) => {

  await AuditLog.create({
    action,
    userId,
    tenantId,
  });

};