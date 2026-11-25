import { Router } from "express";
import { createCustomer,getCustomers,} from "../controllers/customer.controller";
import { authMiddleware, } from "../middleware/auth.middleware";

const router = Router();

/**
 * @swagger
 * /api/customers:
 *   post:
 *     summary: Create Customer
 *     tags:
 *       - Customers
*/

router.post(
 "/",
 authMiddleware,
 createCustomer
);


/**
 * @swagger
 * /api/customers:
 *   get:
 *     summary: Get Customers
 *     tags:
 *       - Customers
 */
router.get(
 "/",
 authMiddleware,
 getCustomers
);

export default router;