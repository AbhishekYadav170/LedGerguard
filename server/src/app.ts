import express from "express";
import cors from "cors";
import helmet from "helmet";

import authRoutes from "./routes/auth.routes";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.get("/", (req, res) => {
  res.send("LedgerGuard API Running");
});

app.use(
  "/api/auth",
  authRoutes
);

export default app;
