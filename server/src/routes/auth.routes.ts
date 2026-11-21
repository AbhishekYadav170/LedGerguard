import { Router } from "express";
import { signup,login, getProfile, forgotPassword, resetPassword } from "../controllers/auth.Controller";
import { authMiddleware, } from "../middleware/auth.middleware";
import { ownerOnlyRoute, } from "../controllers/auth.Controller";
import { authorize, } from "../middleware/role.middleware";
import { refreshAccessToken,} from "../controllers/auth.Controller";
import { logout } from "../controllers/auth.Controller";
import { validate } from "../middleware/validate.middleware";
import { signupSchema, loginSchema } from "../validators/auth.validator";

const router = Router();


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

router.post(
 "/forgot-password",
 forgotPassword
);

router.post(
 "/reset-password",
 resetPassword
);

router.post(
 "/signup",
 validate(signupSchema),
 signup
);

router.post(
 "/login",
 validate(loginSchema),
 login
);

export default router;