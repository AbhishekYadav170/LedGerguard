import { Router } from "express";

import {
 createTeamMember,
} from "../controllers/team.controller";

import {
 authMiddleware,
} from "../middleware/auth.middleware";

import {
 authorize,
} from "../middleware/role.middleware";

const router = Router();

router.post(
 "/",
 authMiddleware,
 authorize("Owner"),
 createTeamMember
);

export default router;