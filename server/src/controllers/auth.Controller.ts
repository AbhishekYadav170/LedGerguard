import { Request, Response } from "express";
import { signupService } from "../services/auth.service";
import { loginService } from "../services/auth.service";
import { AuthRequest } from "../middleware/auth.middleware";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { generateToken } from "../utils/generateToken";


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

export const getProfile = (
  req: AuthRequest,
  res: Response
) => {

  res.status(200).json({
    success: true,
    user: req.user,
  });

};

export const ownerOnlyRoute = (
  req: AuthRequest,
  res: Response
) => {

  res.status(200).json({
    success: true,
    message:
      "Welcome Owner",
  });

};

export const refreshAccessToken = async (
  req: Request,
  res: Response
) => {
  try {

    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: "Refresh token required",
      });
    }

    const decoded: any = jwt.verify(
      refreshToken,
      process.env.JWT_SECRET!
    );

    const user = await User.findById(
      decoded.userId
    );

    if (
      !user ||
      user.refreshToken !== refreshToken
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid Refresh Token",
      });
    }

    const accessToken = generateToken({
      userId: user._id,
      tenantId: user.tenantId,
      role: user.role,
    });

    return res.status(200).json({
      success: true,
      accessToken,
    });

  } catch (error: any) {

    return res.status(401).json({
      success: false,
      message: error.message,
    });

  }
};

export const logout = async (
  req: AuthRequest,
  res: Response
) => {

  await User.findByIdAndUpdate(
    req.user.userId,
    {
      refreshToken: null,
    }
  );

  res.status(200).json({
    success: true,
    message: "Logged out",
  });

};