import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { team1Score, team2Score, status, scheduledTime } = body;

    const currentMatch = await prisma.match.findUnique({
      where: { id }
    });

    if (!currentMatch) {
      return NextResponse.json({ success: false, error: "ไม่พบแมตช์ที่ระบุ" }, { status: 444 });
    }

    const t1Score = parseInt(team1Score) || 0;
    const t2Score = parseInt(team2Score) || 0;

    let winnerId: string | null = null;
    if (status === "completed") {
      if (t1Score > t2Score) winnerId = currentMatch.team1Id;
      else if (t2Score > t1Score) winnerId = currentMatch.team2Id;
    }

    // Update current match
    const updatedMatch = await prisma.match.update({
      where: { id },
      data: {
        team1Score: t1Score,
        team2Score: t2Score,
        status,
        scheduledTime,
        winnerId
      }
    });

    // Advance winner logic in database
    if (status === "completed" && winnerId) {
      const parts = id.split("-");
      if (parts.length === 3) {
        const [prefix, roundStr, matchNumStr] = parts;
        const rIdx = parseInt(roundStr.replace("r", ""));
        const matchNum = parseInt(matchNumStr);

        const nextRound = rIdx + 1;
        const nextMatchNum = Math.ceil(matchNum / 2);
        const nextMatchId = `${prefix}-r${nextRound}-${nextMatchNum}`;
        const isTeam1 = matchNum % 2 !== 0;

        // Check if next match exists
        const nextMatch = await prisma.match.findUnique({ where: { id: nextMatchId } });
        
        if (nextMatch) {
          await prisma.match.update({
            where: { id: nextMatchId },
            data: isTeam1 ? { team1Id: winnerId } : { team2Id: winnerId }
          });
        }
      }
    }

    return NextResponse.json({ success: true, match: updatedMatch });
  } catch (error: any) {
    console.error("API update bracket match error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
