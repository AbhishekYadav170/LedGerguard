import { Router } from "express";

import {
 createCustomer,
 getCustomers,
}
from "../controllers/customer.controller";

import {
 authMiddleware,
}
from "../middleware/auth.middleware";

const router = Router();

router.post(
 "/",
 authMiddleware,
 createCustomer
);

router.get(
 "/",
 authMiddleware,
 getCustomers
);

export default router;