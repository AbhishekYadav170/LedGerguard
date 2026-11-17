import { Router } from "express";
import { getAuditLogs } from "../controllers/audit.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = Router();

router.get(
  "/",
  authMiddleware,
  authorize("Owner"),
  getAuditLogs
);

export default router;