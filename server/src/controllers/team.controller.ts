import { Response } from "express";

import { AuthRequest }
from "../middleware/auth.middleware";

import {
 createTeamMemberService,
} from "../services/team.service";

export const createTeamMember =
async (
 req: AuthRequest,
 res: Response
) => {

 try {

  const user =
   await createTeamMemberService(
    req.body,
    req.user.tenantId
   );

  res.status(201).json({
   success: true,
   data: user,
  });

 } catch(error:any){

  res.status(400).json({
   success:false,
   message:error.message,
  });

 }

};