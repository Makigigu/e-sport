import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { gameIndex, time, type, description, side } = body;

    if (gameIndex === undefined || !time || !type || !description || !side) {
      return NextResponse.json({ success: false, error: "ข้อมูลเหตุการณ์ไม่ครบถ้วน" }, { status: 400 });
    }

    const newEvent = await prisma.timelineEvent.create({
      data: {
        gameIndex: parseInt(gameIndex) || 1,
        time,
        type,
        description,
        side
      }
    });

    return NextResponse.json({ success: true, event: newEvent }, { status: 201 });
  } catch (error: any) {
    console.error("API create timeline event error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    await prisma.timelineEvent.deleteMany({});
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("API delete timeline events error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
