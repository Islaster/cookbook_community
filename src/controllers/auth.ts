import {prisma} from "@/lib/prisma"
import bcrypt from "bcrypt"

export async function createUser({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) {
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      }
    });
  
    const { password: _, ...safeUser } = user;
    return safeUser;
  }