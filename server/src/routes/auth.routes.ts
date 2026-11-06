import { Router } from "express";

import { signup,login, getProfile } from "../controllers/auth.controller";
import { authMiddleware, } from "../middleware/auth.middleware";



const router = Router();

router.post(
  "/signup",
  signup
);

router.post(
 "/login",
 login
);

router.get(
  "/me",
  authMiddleware,
  getProfile
);

export default router;