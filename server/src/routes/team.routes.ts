import { Router } from "express";
import { createTeamMember,} from "../controllers/team.controller";
import { authMiddleware,} from "../middleware/auth.middleware";
import { authorize,} from "../middleware/role.middleware";

const router = Router();

/**
 * @swagger
 * /api/teams:
 *   post:
 *     summary: Create Team Member
 *     tags:
 *       - Teams
 */

router.post(
 "/",
 authMiddleware,
 authorize("Owner"),
 createTeamMember
);

export default router;