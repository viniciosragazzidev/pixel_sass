import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  try {
    if (email) {
      const users = await prisma.user.findMany({
        where: {
          email,
        },
        include: {
          Role: true,
          Profile: true,
        },
      });

      if (users.length > 0) {
        return NextResponse.json({ users }, { status: 200 });
      } else {
        throw new Error("User not found");
      }
    } else {
      const users = await prisma.user.findMany();

      return NextResponse.json({ users }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const id = uuidv4();
  const { name, email, password, roleId } = await request.json();
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    if (email && password) {
      const user = await prisma.user.create({
        data: {
          id,
          name,
          email,
          roleId,
          password: hashedPassword,
        },
      });

      // Adicione o ID do usuário à lista userIds no papel (role) associado
      await prisma.role.update({
        where: { id: roleId },
        data: {
          users: {
            connect: { id },
          },
        },
      });
      return NextResponse.json({ user }, { status: 200 });
    } else {
      throw new Error("Email and password are required");
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  try {
    if (email) {
      const user = await prisma.user.delete({
        where: {
          email,
        },
      });
      return NextResponse.json({ user }, { status: 200 });
    } else {
      throw new Error("Email and password are required");
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const {
    email,
    name,
    password,
    roleId,
  }: { email?: string; name?: string; password?: string; roleId?: string } =
    await request.json();

  try {
    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const user = await prisma.user.update({
      where: {
        email,
      },
      data: {
        name,
        password: hashedPassword,
        email,
        Role: {
          connect: {
            id: roleId,
          },
        },
      },
    });

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
