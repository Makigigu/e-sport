import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, gameId } = body;

    if (!name) {
      return NextResponse.json({ success: false, error: "กรุณาระบุชื่อกลุ่ม" }, { status: 400 });
    }

    const newGroup = await prisma.group.create({
      data: { name, gameId: gameId || "rov" }
    });

    return NextResponse.json({ success: true, group: { id: newGroup.id, name: newGroup.name, teamIds: [] } });
  } catch (error: any) {
    console.error("API create group error:", error);
    let errorMessage = error.message;
    if (error.code === "P2002" || (error.message && error.message.includes("Unique constraint"))) {
      errorMessage = "ชื่อกลุ่มนี้มีอยู่แล้วในระบบ กรุณาใช้ชื่ออื่น";
    }
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "กรุณาระบุ Group ID" }, { status: 400 });
    }

    // Delete the group. Related teams' groupId will automatically be set to null due to onDelete: SetNull
    await prisma.group.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("API delete group error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
