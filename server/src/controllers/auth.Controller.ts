import { Request, Response } from "express";
import { signupService } from "../services/auth.service";
import {
 loginService
} from "../services/auth.service";

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

export const login = async (
  req: Request,
  res: Response
) => {

  try {

    const { email, password }
      = req.body;

    const result =
      await loginService(
        email,
        password
      );

    res.status(200).json({
      success: true,
      data: result,
    });

  } catch (error: any) {

    res.status(400).json({
      success: false,
      message: error.message,
    });

  }

};