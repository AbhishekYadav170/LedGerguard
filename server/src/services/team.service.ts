import bcrypt from "bcryptjs";
import User from "../models/User";


type UserRole =
  | "Owner"
  | "Admin"
  | "Billing"
  | "Viewer";


interface TeamMemberData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export const createTeamMemberService =
async (
  data: TeamMemberData,
  tenantId: string
) => {

  const existingUser =
    await User.findOne({
      email: data.email,
    });

  if (existingUser) {
    throw new Error(
      "Email already exists"
    );
  }

  const passwordHash =
    await bcrypt.hash(
      data.password,
      10
    );

  const user =
    await User.create({
      name: data.name,
      email: data.email,
      passwordHash,
      role: data.role,
      tenantId,
    });

  return user;

};