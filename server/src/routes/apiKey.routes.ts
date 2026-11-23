import { Router }
from "express";
import { createApiKey } from "../controllers/apiKey.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = Router();

/**
 * @swagger
 * /api/api-keys:
 *   post:
 *     summary: Create API Key
 *     tags:
 *       - API Keys
 */

router.post(
 "/",
 authMiddleware,
 authorize("Owner"),
 createApiKey
);

export default router;