import { Response } from "express";
import AuditLog from "../models/AuditLog";
import { AuthRequest } from "../middleware/auth.middleware";


export const getAuditLogs = async (
  req: AuthRequest,
  res: Response
) => {
  try {

    const logs = await AuditLog.find({
      tenantId: req.user.tenantId,
    })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: logs,
    });

  } catch (error: any) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};