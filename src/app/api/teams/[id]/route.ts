import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, groupId, wins, losses, points } = body;

    // Build update payload
    const updateData: any = {};
    if (status !== undefined) updateData.status = status;
    
    // Group updates. Allow explicit null or undefined.
    if (groupId !== undefined) {
      updateData.groupId = groupId; // can be string or null
    }

    if (wins !== undefined) updateData.wins = parseInt(wins) || 0;
    if (losses !== undefined) updateData.losses = parseInt(losses) || 0;
    if (points !== undefined) updateData.points = parseInt(points) || 0;

    const updatedTeam = await prisma.team.update({
      where: { id },
      data: updateData
    });

    const formattedTeam = {
      ...updatedTeam,
      players: typeof updatedTeam.players === "string" 
        ? JSON.parse(updatedTeam.players) 
        : updatedTeam.players,
    };

    return NextResponse.json({ success: true, team: formattedTeam });
  } catch (error: any) {
    console.error("API update team error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
