import bcrypt from "bcryptjs";
import crypto from "crypto";

import ApiKey from "../models/ApiKey";

export const createApiKeyService =
async (
 tenantId:string
) => {

 const rawKey =
  crypto.randomBytes(32)
  .toString("hex");

 const keyHash =
  await bcrypt.hash(
   rawKey,
   10
  );

 await ApiKey.create({

  name:"Default Key",

  keyHash,

  tenantId,

 });

 return rawKey;

};