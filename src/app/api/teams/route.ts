import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { schoolName, teamName, teamTag, level, managerName, players } = body;

    if (!schoolName || !teamName || !teamTag || !level || !players || players.length !== 6) {
      return NextResponse.json({ success: false, error: "ข้อมูลไม่ครบถ้วนหรือรายชื่อผู้เล่นไม่เท่ากับ 6 คน" }, { status: 400 });
    }

    // Validate that each player has name and openid
    for (const player of players) {
      if (typeof player === "object" && player !== null) {
        if (!player.name?.trim() || !player.openid?.trim()) {
          return NextResponse.json({ success: false, error: "กรุณาระบุชื่อและ OpenID ของผู้เข้าแข่งขันให้ครบทุกคน" }, { status: 400 });
        }
      } else {
        return NextResponse.json({ success: false, error: "รูปแบบข้อมูลรายชื่อผู้เข้าแข่งขันไม่ถูกต้อง" }, { status: 400 });
      }
    }

    const newTeam = await prisma.team.create({
      data: {
        schoolName,
        teamName,
        teamTag: teamTag.toUpperCase(),
        level,
        managerName: managerName || null,
        players: players,
        status: "Pending",
        wins: 0,
        losses: 0,
        points: 0
      }
    });

    const formattedTeam = {
      ...newTeam,
      players: newTeam.players as any,
    };

    return NextResponse.json({ success: true, team: formattedTeam }, { status: 201 });
  } catch (error: any) {
    console.error("API create team error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
