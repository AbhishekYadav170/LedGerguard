import { Response } from "express";

import { AuthRequest }
from "../middleware/auth.middleware";

import {
 createApiKeyService
}
from "../services/apiKey.service";
import {
 createAuditLog
}
from "../services/audit.service";

export const createApiKey =

async (
 req:AuthRequest,
 res:Response
)=>{

 const key =
  await createApiKeyService(
   req.user.tenantId
  );

  await createAuditLog(
  "API_KEY_CREATED",
  req.user.userId,
  req.user.tenantId
 );

 res.status(201).json({
  success:true,
  apiKey:key
 });

};