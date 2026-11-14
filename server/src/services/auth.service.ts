import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken";
import Tenant from "../models/Tenants";
import User from "../models/User";
import { createAuditLog }
from "./audit.service";
import { generateRefreshToken } from "../utils/generateRefreshToken";

interface SignupData {
  companyName: string;
  name: string;
  email: string;
  password: string;
}

export const signupService = async (data: SignupData) => {
  const { companyName, name, email, password } = data;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const tenant = await Tenant.create({
    name: companyName,
  });

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    passwordHash,
    role: "Owner",
    tenantId: tenant._id,
  });

  return user;
};
export const loginService = async (email: string, password: string) => {
  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw new Error("Invalid Credentials");
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);

  if (!isMatch) {
    throw new Error("Invalid Credentials");
  }

  await createAuditLog(
     "LOGIN",
     user._id.toString(),
     user.tenantId.toString()
  );
  const accessToken = generateToken({
    userId: user._id,
    tenantId: user.tenantId,
    role: user.role,
  });

  const refreshToken = generateRefreshToken({
    userId: user._id,
  });

  user.refreshToken = refreshToken;

  await user.save();

  return {
    user,
    accessToken,
    refreshToken,
  };
};
