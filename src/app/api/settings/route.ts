import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { liveStreamUrl, bracketSize, gameId } = body;
    const activeGameId = gameId || "rov";

    if (liveStreamUrl !== undefined) {
      await prisma.settings.upsert({
        where: { key: `${activeGameId}_liveStreamUrl` },
        update: { value: liveStreamUrl },
        create: { key: `${activeGameId}_liveStreamUrl`, value: liveStreamUrl }
      });
    }

    if (bracketSize !== undefined) {
      const sizeNum = parseInt(bracketSize) || 8;
      
      // Update bracketSize setting for the specific game
      await prisma.settings.upsert({
        where: { key: `${activeGameId}_bracketSize` },
        update: { value: sizeNum.toString() },
        create: { key: `${activeGameId}_bracketSize`, value: sizeNum.toString() }
      });

      // Query approved teams to seed the new bracket first round
      const approvedTeams = await prisma.team.findMany({
        where: { status: "Approved", gameId: activeGameId },
        orderBy: { createdAt: "asc" }
      });

      // Re-generate matches in database for this specific game
      await prisma.match.deleteMany({ where: { gameId: activeGameId } });

      const matchesToCreate: any[] = [];
      const totalTeams = approvedTeams.length;

      // Handle Byes (dynamic bracket logic)
      const generateMatches = (rounds: number, matchPrefix: string) => {
        // Round 0 (Quarterfinals/Round of 16 etc.)
        const expectedTeamsInFirstRound = Math.pow(2, rounds - 1);
        
        for (let i = 0; i < expectedTeamsInFirstRound / 2; i++) {
          const t1 = approvedTeams[i] || null;
          const t2 = approvedTeams[expectedTeamsInFirstRound - 1 - i] || null;
          
          let t1Score = 0;
          let t2Score = 0;
          let status = "scheduled";
          let winnerId = null;

          // If one team is null but the other isn't, the existing team gets a "Bye" (automatically wins round 0)
          if (t1 && !t2) {
            t1Score = 1;
            status = "completed";
            winnerId = t1.id;
          } else if (!t1 && t2) {
            t2Score = 1;
            status = "completed";
            winnerId = t2.id;
          }

          matchesToCreate.push({
            id: `${matchPrefix}-r0-${i + 1}`,
            team1Id: t1?.id || null,
            team2Id: t2?.id || null,
            team1Score: t1Score,
            team2Score: t2Score,
            winnerId,
            status,
            round: 0,
            gameId: activeGameId
          });
        }

        // Subsequent Rounds
        let currentMatchesInRound = expectedTeamsInFirstRound / 4;
        for (let r = 1; r < rounds; r++) {
          for (let i = 0; i < currentMatchesInRound; i++) {
            matchesToCreate.push({
              id: `${matchPrefix}-r${r}-${i + 1}`,
              team1Id: null,
              team2Id: null,
              team1Score: 0,
              team2Score: 0,
              status: "scheduled",
              round: r,
              gameId: activeGameId
            });
          }
          currentMatchesInRound /= 2;
        }
      };

      if (sizeNum === 4) {
        generateMatches(2, "m4");
      } else if (sizeNum === 8) {
        generateMatches(3, "m8");
      } else {
        generateMatches(4, "m16");
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
