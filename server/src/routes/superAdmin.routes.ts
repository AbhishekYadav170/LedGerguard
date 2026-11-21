import { Router } from "express";
import { getAllTenants, suspendTenant, activateTenant} from "../controllers/superAdmin.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { authorize} from "../middleware/role.middleware";

const router = Router();

router.get(
  "/tenants",
  authMiddleware,
  authorize("SuperAdmin"),
  getAllTenants
);

router.patch(
  "/tenant/:id/suspend",
  authMiddleware,
  authorize("SuperAdmin"),
  suspendTenant
);

router.patch(
  "/tenant/:id/activate",
  authMiddleware,
  authorize("SuperAdmin"),
  activateTenant
);

export default router;