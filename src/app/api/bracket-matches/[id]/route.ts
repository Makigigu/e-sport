import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { team1Score, team2Score, status } = body;

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
        winnerId
      }
    });

    // Advance winner logic in database
    const settingsSize = await prisma.settings.findUnique({ where: { key: "bracketSize" } });
    const bracketSize = parseInt(settingsSize?.value || "8") || 8;

    if (bracketSize === 4) {
      if (id === "m4-1") {
        await prisma.match.update({ where: { id: "m4-3" }, data: { team1Id: winnerId } });
      } else if (id === "m4-2") {
        await prisma.match.update({ where: { id: "m4-3" }, data: { team2Id: winnerId } });
      }
    } else if (bracketSize === 8) {
      if (id === "m8-qf-1") {
        await prisma.match.update({ where: { id: "m8-sf-1" }, data: { team1Id: winnerId } });
      } else if (id === "m8-qf-2") {
        await prisma.match.update({ where: { id: "m8-sf-1" }, data: { team2Id: winnerId } });
      } else if (id === "m8-qf-3") {
        await prisma.match.update({ where: { id: "m8-sf-2" }, data: { team1Id: winnerId } });
      } else if (id === "m8-qf-4") {
        await prisma.match.update({ where: { id: "m8-sf-2" }, data: { team2Id: winnerId } });
      } else if (id === "m8-sf-1") {
        await prisma.match.update({ where: { id: "m8-f" }, data: { team1Id: winnerId } });
      } else if (id === "m8-sf-2") {
        await prisma.match.update({ where: { id: "m8-f" }, data: { team2Id: winnerId } });
      }
    } else if (bracketSize === 16) {
      if (id.startsWith("m16-r1-")) {
        const matchNum = parseInt(id.replace("m16-r1-", ""));
        const nextQfNum = Math.ceil(matchNum / 2);
        const isTeam1 = matchNum % 2 !== 0;
        await prisma.match.update({
          where: { id: `m16-qf-${nextQfNum}` },
          data: isTeam1 ? { team1Id: winnerId } : { team2Id: winnerId }
        });
      } else if (id.startsWith("m16-qf-")) {
        const matchNum = parseInt(id.replace("m16-qf-", ""));
        const nextSfNum = Math.ceil(matchNum / 2);
        const isTeam1 = matchNum % 2 !== 0;
        await prisma.match.update({
          where: { id: `m16-sf-${nextSfNum}` },
          data: isTeam1 ? { team1Id: winnerId } : { team2Id: winnerId }
        });
      } else if (id === "m16-sf-1") {
        await prisma.match.update({ where: { id: "m16-f" }, data: { team1Id: winnerId } });
      } else if (id === "m16-sf-2") {
        await prisma.match.update({ where: { id: "m16-f" }, data: { team2Id: winnerId } });
      }
    }

    return NextResponse.json({ success: true, match: updatedMatch });
  } catch (error: any) {
    console.error("API update bracket match error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
