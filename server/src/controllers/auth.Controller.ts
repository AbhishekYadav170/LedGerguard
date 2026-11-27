import { Request, Response } from "express";
import { signupService } from "../services/auth.service";
import { loginService } from "../services/auth.service";
import { AuthRequest } from "../middleware/auth.middleware";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { generateToken } from "../utils/generateToken";
import { forgotPasswordService } from "../services/auth.service";
import { resetPasswordService } from "../services/auth.service";

// ==========================================
// SIGNUP
// ==========================================

export const signup = async (
  req: Request,
  res: Response
) => {
  try {
    const user = await signupService(req.body);

    // Remove sensitive information before sending response
    const safeUser = user.toObject();

    delete safeUser.passwordHash;
    delete safeUser.refreshToken;
    delete safeUser.resetPasswordToken;
    delete safeUser.resetPasswordExpire;

    res.status(201).json({
      success: true,
      data: safeUser,
    });

  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// LOGIN
// ==========================================

export const login = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, password } = req.body;

    const result = await loginService(
      email,
      password
    );

    // Remove sensitive information from user object
    const safeUser = result.user.toObject();

    delete safeUser.passwordHash;
    delete safeUser.refreshToken;
    delete safeUser.resetPasswordToken;
    delete safeUser.resetPasswordExpire;

    res.status(200).json({
      success: true,
      data: {
        user: safeUser,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      },
    });

  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// GET USER PROFILE
// ==========================================

export const getProfile = (
  req: AuthRequest,
  res: Response
) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

// ==========================================
// OWNER ONLY ROUTE
// ==========================================

export const ownerOnlyRoute = (
  req: AuthRequest,
  res: Response
) => {
  res.status(200).json({
    success: true,
    message: "Welcome Owner",
  });
};

// ==========================================
// REFRESH ACCESS TOKEN
// ==========================================

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

// ==========================================
// LOGOUT
// ==========================================

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

// ==========================================
// FORGOT PASSWORD
// ==========================================

export const forgotPassword = async (
  req: Request,
  res: Response
) => {
  try {
    const { email } = req.body;

    const resetToken = await forgotPasswordService(
      email
    );

    res.status(200).json({
      success: true,
      resetToken,
    });

  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// RESET PASSWORD
// ==========================================

export const resetPassword = async (
  req: Request,
  res: Response
) => {
  try {
    const { token, password } = req.body;

    await resetPasswordService(
      token,
      password
    );

    res.status(200).json({
      success: true,
      message: "Password Reset Successful",
    });

  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
```