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

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get logged-in user profile
 *     description: Returns the profile details of the currently authenticated user.
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       401:
 *         description: Unauthorized - Invalid or missing access token
 */

router.get(
  "/me",
  authMiddleware,
  getProfile
);

/**
 * @swagger
 * /api/auth/owner-only:
 *   get:
 *     summary: Access owner-only route
 *     description: Allows only authenticated users with the Owner role to access this route.
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Owner access granted successfully
 *       401:
 *         description: Unauthorized - Invalid or missing access token
 *       403:
 *         description: Forbidden - Owner role required
 */

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