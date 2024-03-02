import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

export async function GET(request: Request) {
  const { email } = await request.json();

  try {
    if (email) {
      const profile = await prisma.profile.findFirst({ where: { email } });
      return NextResponse.json({ profile });
    } else {
      const profile = await prisma.profile.findMany();

      return NextResponse.json({ profile });
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const id = uuidv4();
  const {
    userId,
    name,
    surname,
    gender,
    birthDate,
    address,
    cep,
    city,
    state,
    country,
    email,
    phoneNumber,
    document,
    profileImage,
    position,
  }: any = await request.json();

  try {
    if (userId) {
      const profile = await prisma.profile.create({
        data: {
          id,
          name,
          surname,
          gender,
          birthDate,
          address,
          cep,
          city,
          state,
          country,
          email,
          phoneNumber,
          document,
          profileImage,
          position,
          user: {
            connect: { id: userId },
          },
        },
      });

      return NextResponse.json({ profile });
    } else {
      throw new Error("userId is required");
    }
  } catch (error) {
    //console.log(error);

    return NextResponse.json("Erro sério" + { error }, { status: 500 });
  }
}
