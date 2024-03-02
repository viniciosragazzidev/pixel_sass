import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  try {
    if (id) {
      const roles = await prisma.role.findMany({
        where: {
          id,
        },
      });
      return NextResponse.json({ roles }, { status: 200 });
    } else {
      const roles = await prisma.role.findMany();
      return NextResponse.json({ roles }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

// Add role
export async function POST(request: Request) {
  const { name, permissions } = await request.json();
  const id = uuidv4();

  try {
    if (name) {
      const roles = await prisma.role.create({
        data: {
          id,
          name,
          permissions,
        },
      });

      return NextResponse.json({ roles }, { status: 200 });
    } else {
      throw new Error("Name is required");
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
