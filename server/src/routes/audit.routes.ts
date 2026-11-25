import { Router } from "express";
import { getAuditLogs } from "../controllers/audit.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";


const router = Router();

/**
 * @swagger
 * /api/audit-logs:
 *   get:
 *     summary: Get Audit Logs
 *     tags:
 *       - Audit
 */

router.get(
  "/",
  authMiddleware,
  authorize("Owner"),
  getAuditLogs
);

export default router;