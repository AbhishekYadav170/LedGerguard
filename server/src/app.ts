import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./routes/auth.routes";
import customerRoutes from "./routes/customer.routes";
import teamRoutes from "./routes/team.routes";
import auditRoutes from "./routes/audit.routes";
import { apiLimiter } from "./middleware/rateLimiter";
import { errorHandler } from "./middleware/error.middleware";
import apiKeyRoutes from "./routes/apiKey.routes";
import superAdminRoutes from "./routes/superAdmin.routes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";


const app = express();

app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(apiLimiter);
app.use("/api/api-keys", apiKeyRoutes);

app.get("/", (req, res) => {
  res.send("LedgerGuard API Running");
});

app.use(
  "/api/auth",
  authRoutes
);

app.use(
 "/api/customers",
 customerRoutes
);

app.use(
 "/api/team",
 teamRoutes
);

app.use(
  "/api/audit-logs",
  auditRoutes
);

app.use(
 "/api/super-admin",
 superAdminRoutes
);

app.use(
 "/api-docs",
 swaggerUi.serve,
 swaggerUi.setup(swaggerSpec)
);

app.use(errorHandler);

export default app;
