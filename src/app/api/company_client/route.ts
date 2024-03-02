import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const document = searchParams.get("document");

  try {
    if (document) {
      const client = await prisma.client.findFirst({
        where: {
          document,
        },
      });
      return NextResponse.json({ client });
    } else {
      const clients = await prisma.client.findMany();
      return NextResponse.json({ clients });
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const id = uuidv4();
  const {
    name,
    email,
    document,
    gender,
    contact,
    address,
    cep,
    city,
    state,
    companyId,
  } = await request.json();

  try {
    if (name && document && companyId) {
      const client = await prisma.client.create({
        data: {
          id,
          name,
          email,
          document,
          gender,
          contact,
          address,
          cep,
          city,
          state,
          company: {
            connect: {
              id: companyId,
            },
          },
        },
      });

      return NextResponse.json({ client });
    } else {
      throw new Error("Name, document and companyId are required");
    }
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error }, { status: 500 });
  }
}
