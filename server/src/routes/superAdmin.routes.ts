import { Router } from "express";
import { getAllTenants, suspendTenant, activateTenant} from "../controllers/superAdmin.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { authorize} from "../middleware/role.middleware";

const router = Router();

/**
 * @swagger
 * /api/super-admin/tenants:
 *   get:
 *     summary: Get All Tenants
 *     tags:
 *       - Super Admin
 */

router.get(
  "/tenants",
  authMiddleware,
  authorize("SuperAdmin"),
  getAllTenants
);

/**
 * @swagger
 * /api/super-admin/tenant/:id/suspend:
 *   patch:
 *     summary: Suspend Tenant
 *     tags:
 *       - Super Admin
 */
router.patch(
  "/tenant/:id/suspend",
  authMiddleware,
  authorize("SuperAdmin"),
  suspendTenant
);

/**
 * @swagger
 * /api/super-admin/tenant/{id}/activate:
 *   patch:
 *     summary: Activate Tenant
 *     tags:
 *       - Super Admin
 */
router.patch(
  "/tenant/:id/activate",
  authMiddleware,
  authorize("SuperAdmin"),
  activateTenant
);

export default router;