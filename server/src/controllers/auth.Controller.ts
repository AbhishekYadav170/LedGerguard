// import { Request, Response } from "express";

// import {
//   signupService,
// } from "../services/auth.service";

// export const signup = async (
//   req: Request,
//   res: Response
// ) => {

//   try {

//     const result =
//       await signupService(req.body);

//     res.status(201).json({
//       success: true,
//       user: result,
//     });

//   } catch (error: any) {

//     res.status(400).json({
//       success: false,
//       message: error.message,
//     });

//   }
// };



import { Request, Response } from "express";
import { signupService } from "../services/auth.service";

export const signup = async (
  req: Request,
  res: Response
) => {
  try {
    const user = await signupService(
      req.body
    );

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};