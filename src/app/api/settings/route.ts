import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { liveStreamUrl, bracketSize } = body;

    if (liveStreamUrl !== undefined) {
      await prisma.settings.upsert({
        where: { key: "liveStreamUrl" },
        update: { value: liveStreamUrl },
        create: { key: "liveStreamUrl", value: liveStreamUrl }
      });
    }

    if (bracketSize !== undefined) {
      const sizeNum = parseInt(bracketSize) || 8;
      
      // Update bracketSize setting
      await prisma.settings.upsert({
        where: { key: "bracketSize" },
        update: { value: sizeNum.toString() },
        create: { key: "bracketSize", value: sizeNum.toString() }
      });

      // Query approved teams to seed the new bracket first round
      const approvedTeams = await prisma.team.findMany({
        where: { status: "Approved" },
        orderBy: { createdAt: "asc" }
      });

      // Re-generate matches in database
      await prisma.match.deleteMany({}); // Delete existing matches

      const matchesToCreate: any[] = [];

      if (sizeNum === 4) {
        matchesToCreate.push({
          id: "m4-1",
          team1Id: approvedTeams[0]?.id || null,
          team2Id: approvedTeams[3]?.id || null,
          team1Score: 0,
          team2Score: 0,
          status: "scheduled",
          round: 0
        });
        matchesToCreate.push({
          id: "m4-2",
          team1Id: approvedTeams[1]?.id || null,
          team2Id: approvedTeams[2]?.id || null,
          team1Score: 0,
          team2Score: 0,
          status: "scheduled",
          round: 0
        });
        matchesToCreate.push({
          id: "m4-3",
          team1Id: null,
          team2Id: null,
          team1Score: 0,
          team2Score: 0,
          status: "scheduled",
          round: 1
        });
      } else if (sizeNum === 8) {
        for (let i = 0; i < 4; i++) {
          matchesToCreate.push({
            id: `m8-qf-${i + 1}`,
            team1Id: approvedTeams[i]?.id || null,
            team2Id: approvedTeams[7 - i]?.id || null,
            team1Score: 0,
            team2Score: 0,
            status: "scheduled",
            round: 0
          });
        }
        matchesToCreate.push({ id: "m8-sf-1", team1Id: null, team2Id: null, team1Score: 0, team2Score: 0, status: "scheduled", round: 1 });
        matchesToCreate.push({ id: "m8-sf-2", team1Id: null, team2Id: null, team1Score: 0, team2Score: 0, status: "scheduled", round: 1 });
        matchesToCreate.push({ id: "m8-f",   team1Id: null, team2Id: null, team1Score: 0, team2Score: 0, status: "scheduled", round: 2 });
      } else {
        // 16 Teams
        for (let i = 0; i < 8; i++) {
          matchesToCreate.push({
            id: `m16-r1-${i + 1}`,
            team1Id: approvedTeams[i]?.id || null,
            team2Id: approvedTeams[15 - i]?.id || null,
            team1Score: 0,
            team2Score: 0,
            status: "scheduled",
            round: 0
          });
        }
        for (let i = 0; i < 4; i++) {
          matchesToCreate.push({ id: `m16-qf-${i + 1}`, team1Id: null, team2Id: null, team1Score: 0, team2Score: 0, status: "scheduled", round: 1 });
        }
        matchesToCreate.push({ id: "m16-sf-1", team1Id: null, team2Id: null, team1Score: 0, team2Score: 0, status: "scheduled", round: 2 });
        matchesToCreate.push({ id: "m16-sf-2", team1Id: null, team2Id: null, team1Score: 0, team2Score: 0, status: "scheduled", round: 2 });
        matchesToCreate.push({ id: "m16-f",   team1Id: null, team2Id: null, team1Score: 0, team2Score: 0, status: "scheduled", round: 3 });
      }

      await prisma.match.createMany({
        data: matchesToCreate
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("API update settings error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
