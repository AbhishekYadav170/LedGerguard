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

/**
 * @swagger
 * /api/auth/refresh-token:
 *   post:
 *     summary: Generate new access token
 *     tags:
 *       - Auth
 */

router.post(
  "/refresh-token",
  refreshAccessToken
);


/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout User
 *     tags:
 *       - Auth
 */

router.post(
  "/logout",
  authMiddleware,
  logout
);

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Request password reset token
 *     tags:
 *       - Auth
 */
router.post(
 "/forgot-password",
 forgotPassword
);

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Reset user password
 *     tags:
 *       - Auth
 */
router.post(
 "/reset-password",
 resetPassword
);

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new tenant and owner
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               companyName:
 *                 type: string
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 */

router.post(
 "/signup",
 validate(signupSchema),
 signup
);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login User
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */

router.post(
 "/login",
 validate(loginSchema),
 login
);

export default router;