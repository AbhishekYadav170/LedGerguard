import { Router }
from "express";

import {
 createApiKey
}
from "../controllers/apiKey.controller";

import {
 authMiddleware
}
from "../middleware/auth.middleware";

import {
 authorize
}
from "../middleware/role.middleware";

const router = Router();

router.post(
 "/",
 authMiddleware,
 authorize("Owner"),
 createApiKey
);

export default router;