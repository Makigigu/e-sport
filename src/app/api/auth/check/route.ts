import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || "super-secret-key-for-esports-admin");

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    await jwtVerify(token, SECRET_KEY);
    return NextResponse.json({ authenticated: true });
  } catch (error) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
