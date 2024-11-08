var jwt = require("jsonwebtoken");
import prisma from "../../../shared/prisma";
import bcrypt from "bcrypt";

const userLogIn = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findFirstOrThrow({
    where: {
      email: payload.email,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );
  if (!isCorrectPassword) {
    throw new Error("Invalid password!");
  }

  const accessToken = jwt.sign(
    {
      email: payload.email,
      role: userData.role,
    },
    "asdfghjkl",
    {
      algorithm: "HS256",
      expiresIn: "15m",
    }
  );

  const refreshToken = jwt.sign(
    {
      email: payload.email,
      role: userData.role,
    },
    "asdfghjkl123",
    {
      algorithm: "HS256",
      expiresIn: "30d",
    }
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

export const authServices = {
  userLogIn,
};
