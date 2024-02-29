import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  const password = searchParams.get("password");
  try {
    if (email && password) {
      const users =
        await sql`SELECT * FROM users WHERE email = ${email} AND password = ${password};`;
      return NextResponse.json({ users }, { status: 200 });
    } else {
      throw new Error("Email and password are required");
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
