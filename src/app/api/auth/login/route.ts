import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || "super-secret-key-for-esports-admin");

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    // Check password (In real world, this should be in .env)
    const adminPassword = process.env.ADMIN_PASSWORD || "admin1234";

    if (password !== adminPassword) {
      return NextResponse.json({ success: false, error: "รหัสผ่านไม่ถูกต้อง" }, { status: 401 });
    }

    // Create JWT
    const token = await new SignJWT({ role: "admin" })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("12h")
      .sign(SECRET_KEY);

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 12 // 12 hours
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
