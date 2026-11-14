import { Router } from "express";
import { signup,login, getProfile } from "../controllers/auth.Controller";
import { authMiddleware, } from "../middleware/auth.middleware";
import { ownerOnlyRoute, } from "../controllers/auth.Controller";
import { authorize, } from "../middleware/role.middleware";
import { refreshAccessToken,} from "../controllers/auth.Controller";
import { logout } from "../controllers/auth.Controller";


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

router.get(
  "/owner-only",
  authMiddleware,
  authorize("Owner"),
  ownerOnlyRoute
);

router.post(
  "/refresh-token",
  refreshAccessToken
);

router.post(
  "/logout",
  authMiddleware,
  logout
);

export default router;