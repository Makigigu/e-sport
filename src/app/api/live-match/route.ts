import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { team1Id, team2Id, team1Side, team2Side, t1Score, t2Score, currentGameIndex, status, scheduledTime, gameId } = body;
    const activeGameId = gameId || "rov";

    const updateData: any = {};
    if (team1Id !== undefined) updateData.team1Id = team1Id;
    if (team2Id !== undefined) updateData.team2Id = team2Id;
    if (team1Side !== undefined) updateData.team1Side = team1Side;
    if (team2Side !== undefined) updateData.team2Side = team2Side;
    if (t1Score !== undefined) updateData.t1Score = parseInt(t1Score) || 0;
    if (t2Score !== undefined) updateData.t2Score = parseInt(t2Score) || 0;
    if (currentGameIndex !== undefined) updateData.currentGameIndex = parseInt(currentGameIndex) || 1;
    if (status !== undefined) updateData.status = status;
    if (scheduledTime !== undefined) updateData.scheduledTime = scheduledTime;

    // Use updateMany to target by gameId since id might not be 'active-live-match' for other games
    // Fallback to creating if it doesn't exist
    const existing = await prisma.liveMatch.findFirst({ where: { gameId: activeGameId } });
    
    let updated;
    if (existing) {
      await prisma.liveMatch.update({
        where: { id: existing.id },
        data: updateData
      });
      updated = { ...existing, ...updateData };
    } else {
      updated = await prisma.liveMatch.create({
        data: {
          id: `active-live-match-${activeGameId}`,
          team1Id: team1Id || "",
          team2Id: team2Id || "",
          team1Side: team1Side || "Blue Side",
          team2Side: team2Side || "Red Side",
          t1Score: parseInt(t1Score) || 0,
          t2Score: parseInt(t2Score) || 0,
          currentGameIndex: parseInt(currentGameIndex) || 1,
          status: status || "scheduled",
          scheduledTime: scheduledTime || null,
          gameId: activeGameId,
          ...updateData
        }
      });
    }

    return NextResponse.json({ success: true, liveMatch: updated });
  } catch (error: any) {
    console.error("API update live match error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
