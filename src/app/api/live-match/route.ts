import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { team1Id, team2Id, team1Side, team2Side, t1Score, t2Score, currentGameIndex, status } = body;

    const updateData: any = {};
    if (team1Id !== undefined) updateData.team1Id = team1Id;
    if (team2Id !== undefined) updateData.team2Id = team2Id;
    if (team1Side !== undefined) updateData.team1Side = team1Side;
    if (team2Side !== undefined) updateData.team2Side = team2Side;
    if (t1Score !== undefined) updateData.t1Score = parseInt(t1Score) || 0;
    if (t2Score !== undefined) updateData.t2Score = parseInt(t2Score) || 0;
    if (currentGameIndex !== undefined) updateData.currentGameIndex = parseInt(currentGameIndex) || 1;
    if (status !== undefined) updateData.status = status;

    const updated = await prisma.liveMatch.update({
      where: { id: "active-live-match" },
      data: updateData
    });

    return NextResponse.json({ success: true, liveMatch: updated });
  } catch (error: any) {
    console.error("API update live match error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
