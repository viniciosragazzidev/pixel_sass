import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    if (id) {
      const company = await prisma.company.findUnique({
        where: {
          id,
        },
      });

      return NextResponse.json({ company }, { status: 200 });
    } else {
      const companies = await prisma.company.findMany();

      return NextResponse.json({ companies }, { status: 200 });
    }
  } catch (error) {
    NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const id = uuidv4();
  const {
    name,
    cnpj,
    address,
    cep,
    city,
    state,
    country,
    companyType,
    phoneNumber,
    email,
    website,
    industry,
    description,
    logo,
    userId,
  } = await request.json();

  try {
    if (name && userId) {
      const company = await prisma.company.create({
        data: {
          id,
          name,
          cnpj,
          address,
          cep,
          city,
          state,
          country,
          companyType,
          phoneNumber,
          email,
          website,
          industry,
          description,
          logo,
          users: {
            connect: {
              id: userId,
            },
          },
        },
      });

      return NextResponse.json({ company }, { status: 200 });
    } else {
      throw new Error("Faltam dados importantes!");
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
