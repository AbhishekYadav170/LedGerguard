import jwt from "jsonwebtoken";

export const generateRefreshToken = (
  payload: object
) => {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET!,
    {
      expiresIn: "30d",
    }
  );
};