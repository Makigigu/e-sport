import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const gameId = searchParams.get("gameId") || "rov";
    // 1. Check if database has groups, if not seed defaults
    const groupCount = await prisma.group.count({ where: { gameId } });
    let groupAId = `group-a-${gameId}`;
    let groupBId = `group-b-${gameId}`;

    if (groupCount === 0) {
      const gA = await prisma.group.create({
        data: { id: `group-a-${gameId}`, name: "กลุ่ม A", gameId }
      });
      const gB = await prisma.group.create({
        data: { id: `group-b-${gameId}`, name: "กลุ่ม B", gameId }
      });
      groupAId = gA.id;
      groupBId = gB.id;
    }

    // 2. Check if database has teams, if not seed defaults
    const teamCount = await prisma.team.count({ where: { gameId } });
    if (teamCount === 0 && gameId === "rov") {
      await prisma.team.create({
        data: {
          id: "team-1",
          schoolName: "โรงเรียนกรุงเทพวิทยา",
          teamName: "Bacon E-Sports Junior",
          teamTag: "BAC",
          level: "มัธยม",
          managerName: "สมชาย ยอดกตัญญู",
          players: [
            { name: "ปกรณ์ ศรีวรรณา", openid: "ROV-BAC-001" },
            { name: "ธีรเดช เจริญผล", openid: "ROV-BAC-002" },
            { name: "ณัฐวุฒิ สมบัติ", openid: "ROV-BAC-003" },
            { name: "วรเมธ เกียรติทวี", openid: "ROV-BAC-004" },
            { name: "ศุภกิจ มิ่งขวัญ", openid: "ROV-BAC-005" },
            { name: "กฤษดา ศิลาชัย", openid: "ROV-BAC-006" }
          ] as any,
          status: "Approved",
          groupId: groupAId,
          wins: 2,
          losses: 0,
          points: 6,
        }
      });
      await prisma.team.create({
        data: {
          id: "team-2",
          schoolName: "โรงเรียนเตรียมอุดมศึกษาพัฒนาการ",
          teamName: "Buriram United Kids",
          teamTag: "BRU",
          level: "มัธยม",
          managerName: "วิชัย รักชาติ",
          players: [
            { name: "ชยพล วัฒนศิริ", openid: "ROV-BRU-001" },
            { name: "ธนารักษ์ รัตนโรจน์", openid: "ROV-BRU-002" },
            { name: "อิทธิพล สร้อยอินทร์", openid: "ROV-BRU-003" },
            { name: "พงษ์ศักดิ์ สุขประเสริฐ", openid: "ROV-BRU-004" },
            { name: "เอกชัย เลิศวิไล", openid: "ROV-BRU-005" },
            { name: "อนันต์ทรัพย์ วันทอง", openid: "ROV-BRU-006" }
          ] as any,
          status: "Approved",
          groupId: groupAId,
          wins: 1,
          losses: 1,
          points: 3,
        }
      });
      await prisma.team.create({
        data: {
          id: "team-3",
          schoolName: "โรงเรียนสาธิตประสานมิตร",
          teamName: "Talon Esports Academy",
          teamTag: "TLN",
          level: "มัธยม",
          managerName: "อนันต์ ตั้งใจ",
          players: [
            { name: "พิพัฒน์ โชคดี", openid: "ROV-TLN-001" },
            { name: "นพกร เจริญวงศ์", openid: "ROV-TLN-002" },
            { name: "จิรายุ สมบูรณ์", openid: "ROV-TLN-003" },
            { name: "กฤติน ใจซื่อ", openid: "ROV-TLN-004" },
            { name: "สุภัทร มั่งคั่ง", openid: "ROV-TLN-005" },
            { name: "พศิน แก้วประเสริฐ", openid: "ROV-TLN-006" }
          ] as any,
          status: "Approved",
          groupId: groupBId,
          wins: 2,
          losses: 0,
          points: 6,
        }
      });
      await prisma.team.create({
        data: {
          id: "team-4",
          schoolName: "โรงเรียนเซนต์คาเบรียล",
          teamName: "Hydra Esport Rookies",
          teamTag: "HDR",
          level: "มัธยม",
          managerName: "ประเสริฐ แสนสุข",
          players: [
            { name: "กานต์ ปรีชาศักดิ์", openid: "ROV-HDR-001" },
            { name: "ธีรภัทร ชาญชัย", openid: "ROV-HDR-002" },
            { name: "วุฒิชัย เจริญผล", openid: "ROV-HDR-003" },
            { name: "สุรเกียรติ สุขสมบูรณ์", openid: "ROV-HDR-004" },
            { name: "ภวัต วิวัฒนา", openid: "ROV-HDR-005" },
            { name: "เจตนิพัทธ์ ดวงดี", openid: "ROV-HDR-006" }
          ] as any,
          status: "Approved",
          groupId: groupBId,
          wins: 0,
          losses: 2,
          points: 0,
        }
      });
      await prisma.team.create({
        data: {
          id: "team-5",
          schoolName: "โรงเรียนวัดสุทธิวราราม",
          teamName: "King of Gamers Club",
          teamTag: "KOG",
          level: "มัยม",
          managerName: "มานะ ดีใจ",
          players: [
            { name: "พสิษฐ์ ทองคำ", openid: "ROV-KOG-001" },
            { name: "ณภัทร เลิศล้ำ", openid: "ROV-KOG-002" },
            { name: "กวีพจน์ อินทรา", openid: "ROV-KOG-003" },
            { name: "รัฐศาสตร์ รักษ์ไทย", openid: "ROV-KOG-004" },
            { name: "นิธิกรณ์ ทองอ่อง", openid: "ROV-KOG-005" },
            { name: "สิทธิเดช ชื่นบาน", openid: "ROV-KOG-006" }
          ] as any,
          status: "Approved",
          groupId: groupAId,
          wins: 0,
          losses: 2,
          points: 0,
        }
      });
      await prisma.team.create({
        data: {
          id: "team-6",
          schoolName: "โรงเรียนสวนกุหลาบวิทยาลัย",
          teamName: "Goldcity Esports",
          teamTag: "GLG",
          level: "มัธยม",
          managerName: "อภิชาติ สว่างจิต",
          players: [
            { name: "ยศพล บัวทอง", openid: "ROV-GLG-001" },
            { name: "ปิยะพัฒน์ โสภา", openid: "ROV-GLG-002" },
            { name: "กรวิชญ์ แสนสุข", openid: "ROV-GLG-003" },
            { name: "ธนวัชร รัตนบุรี", openid: "ROV-GLG-004" },
            { name: "ชุติพนธ์ อินสอน", openid: "ROV-GLG-005" },
            { name: "อิทธิพัทธ์ บูรพา", openid: "ROV-GLG-006" }
          ] as any,
          status: "Approved",
          groupId: groupBId,
          wins: 1,
          losses: 1,
          points: 3,
        }
      });
      await prisma.team.create({
        data: {
          id: "team-7",
          schoolName: "โรงเรียนประถมศึกษาบางกอก",
          teamName: "Elementary Elite",
          teamTag: "ELE",
          level: "ประถม",
          managerName: "ครูวิภา เรียนดี",
          players: [
            { name: "ด.ช.วิชญ์ บวรชัย", openid: "ROV-ELE-001" },
            { name: "ด.ช.ธวัช เกษมศรี", openid: "ROV-ELE-002" },
            { name: "ด.ช.ภูริ ปัญญาดี", openid: "ROV-ELE-003" },
            { name: "ด.ช.วัชรินทร์ สมหวัง", openid: "ROV-ELE-004" },
            { name: "ด.ช.ปองพล ชาญศิลป์", openid: "ROV-ELE-005" },
            { name: "ด.ช.ศิวกร เรืองฤทธิ์", openid: "ROV-ELE-006" }
          ] as any,
          status: "Pending",
          wins: 0,
          losses: 0,
          points: 0,
        }
      });
      await prisma.team.create({
        data: {
          id: "team-8",
          schoolName: "โรงเรียนบ้านรักเรียน",
          teamName: "School Esports Stars",
          teamTag: "SES",
          level: "มัธยม",
          managerName: "ครูปรีชา ทักษะ",
          players: [
            { name: "ปรีชาวัฒน์ สุวรรณ", openid: "ROV-SES-001" },
            { name: "ณัฐนนท์ ยอดรัก", openid: "ROV-SES-002" },
            { name: "สรวิชญ์ มณีรัตน์", openid: "ROV-SES-003" },
            { name: "สถาพร ลาภผล", openid: "ROV-SES-004" },
            { name: "วรดนย์ ศิริวงศ์", openid: "ROV-SES-005" },
            { name: "เอกภพ สว่างวงศ์", openid: "ROV-SES-006" }
          ] as any,
          status: "Pending",
          wins: 0,
          losses: 0,
          points: 0,
          gameId
        }
      });
    }

    // Auto-migrate old plain-string players arrays to new { name, openid } structure
    const existingTeamsForMigration = await prisma.team.findMany({ where: { gameId } });
    for (const t of existingTeamsForMigration) {
      const playersArr = typeof t.players === "string" ? JSON.parse(t.players) : t.players;
      if (Array.isArray(playersArr) && playersArr.length > 0 && typeof playersArr[0] === "string") {
        const migratedPlayers = playersArr.map((openid) => {
          let name = "ผู้เล่นกิตติมศักดิ์";
          if (openid === "ROV-BAC-001") name = "ปกรณ์ ศรีวรรณา";
          else if (openid === "ROV-BAC-002") name = "ธีรเดช เจริญผล";
          else if (openid === "ROV-BAC-003") name = "ณัฐวุฒิ สมบัติ";
          else if (openid === "ROV-BAC-004") name = "วรเมธ เกียรติทวี";
          else if (openid === "ROV-BAC-005") name = "ศุภกิจ มิ่งขวัญ";
          else if (openid === "ROV-BAC-006") name = "กฤษดา ศิลาชัย";
          else if (openid === "ROV-BRU-001") name = "ชยพล วัฒนศิริ";
          else if (openid === "ROV-BRU-002") name = "ธนารักษ์ รัตนโรจน์";
          else if (openid === "ROV-BRU-003") name = "อิทธิพล สร้อยอินทร์";
          else if (openid === "ROV-BRU-004") name = "พงษ์ศักดิ์ สุขประเสริฐ";
          else if (openid === "ROV-BRU-005") name = "เอกชัย เลิศวิไล";
          else if (openid === "ROV-BRU-006") name = "อนันต์ทรัพย์ วันทอง";
          else if (openid === "ROV-TLN-001") name = "พิพัฒน์ โชคดี";
          else if (openid === "ROV-TLN-002") name = "นพกร เจริญวงศ์";
          else if (openid === "ROV-TLN-003") name = "จิรายุ สมบูรณ์";
          else if (openid === "ROV-TLN-004") name = "กฤติน ใจซื่อ";
          else if (openid === "ROV-TLN-005") name = "สุภัทร มั่งคั่ง";
          else if (openid === "ROV-TLN-006") name = "พศิน แก้วประเสริฐ";
          else if (openid === "ROV-HDR-001") name = "กานต์ ปรีชาศักดิ์";
          else if (openid === "ROV-HDR-002") name = "ธีรภัทร ชาญชัย";
          else if (openid === "ROV-HDR-003") name = "วุฒิชัย เจริญผล";
          else if (openid === "ROV-HDR-004") name = "สุรเกียรติ สุขสมบูรณ์";
          else if (openid === "ROV-HDR-005") name = "ภวัต วิวัฒนา";
          else if (openid === "ROV-HDR-006") name = "เจตนิพัทธ์ ดวงดี";
          else if (openid === "ROV-KOG-001") name = "พสิษฐ์ ทองคำ";
          else if (openid === "ROV-KOG-002") name = "ณภัทร เลิศล้ำ";
          else if (openid === "ROV-KOG-003") name = "กวีพจน์ อินทรา";
          else if (openid === "ROV-KOG-004") name = "รัฐศาสตร์ รักษ์ไทย";
          else if (openid === "ROV-KOG-005") name = "นิธิกรณ์ ทองอ่อง";
          else if (openid === "ROV-KOG-006") name = "สิทธิเดช ชื่นบาน";
          else if (openid === "ROV-GLG-001") name = "ยศพล บัวทอง";
          else if (openid === "ROV-GLG-002") name = "ปิยะพัฒน์ โสภา";
          else if (openid === "ROV-GLG-003") name = "กรวิชญ์ แสนสุข";
          else if (openid === "ROV-GLG-004") name = "ธนวัชร รัตนบุรี";
          else if (openid === "ROV-GLG-005") name = "ชุติพนธ์ อินสอน";
          else if (openid === "ROV-GLG-006") name = "อิทธิพัทธ์ บูรพา";
          else if (openid === "ROV-ELE-001") name = "ด.ช.วิชญ์ บวรชัย";
          else if (openid === "ROV-ELE-002") name = "ด.ช.ธวัช เกษมศรี";
          else if (openid === "ROV-ELE-003") name = "ด.ช.ภูริ ปัญญาดี";
          else if (openid === "ROV-ELE-004") name = "ด.ช.วัชรินทร์ สมหวัง";
          else if (openid === "ROV-ELE-005") name = "ด.ช.ปองพล ชาญศิลป์";
          else if (openid === "ROV-ELE-006") name = "ด.ช.ศิวกร เรืองฤทธิ์";
          else if (openid === "ROV-SES-001") name = "ปรีชาวัฒน์ สุวรรณ";
          else if (openid === "ROV-SES-002") name = "ณัฐนนท์ ยอดรัก";
          else if (openid === "ROV-SES-003") name = "สรวิชญ์ มณีรัตน์";
          else if (openid === "ROV-SES-004") name = "สถาพร ลาภผล";
          else if (openid === "ROV-SES-005") name = "วรดนย์ ศิริวงศ์";
          else if (openid === "ROV-SES-006") name = "เอกภพ สว่างวงศ์";
          return { name, openid };
        });
        await prisma.team.update({
          where: { id: t.id },
          data: { players: migratedPlayers }
        });
      }
    }

    // 3. Seed liveStreamUrl setting if empty
    const streamSetting = await prisma.settings.findUnique({ where: { key: "liveStreamUrl" } });
    if (!streamSetting) {
      await prisma.settings.create({
        data: { key: "liveStreamUrl", value: "https://www.youtube.com/embed/d3R28hY1Dlo" }
      });
    }

    // Seed bracketSize setting if empty
    const bracketSizeSetting = await prisma.settings.findUnique({ where: { key: "bracketSize" } });
    if (!bracketSizeSetting) {
      await prisma.settings.create({
        data: { key: "bracketSize", value: "8" }
      });
    }

    // 4. Seed LiveMatch and events if empty
    const liveMatchCount = await prisma.liveMatch.count({ where: { gameId } });
    if (liveMatchCount === 0 && gameId === "rov") {
      await prisma.liveMatch.create({
        data: {
          id: "active-live-match-rov",
          team1Id: "team-1", // BAC
          team2Id: "team-2", // BRU
          team1Side: "Blue Side",
          team2Side: "Red Side",
          t1Score: 1,
          t2Score: 0,
          currentGameIndex: 2,
          status: "live",
          gameId
        }
      });

      // Seed timeline events
      const eventCount = await prisma.timelineEvent.count();
      if (eventCount === 0) {
        await prisma.timelineEvent.createMany({
          data: [
            {
              gameIndex: 1,
              time: "02:14",
              type: "First Blood",
              description: "Blue Side (BAC) สังหารเลนกลางของ Red Side เพื่อชิงความได้เปรียบ",
              side: "blue"
            },
            {
              gameIndex: 1,
              time: "06:45",
              type: "Abyssal Dragon",
              description: "Red Side (BRU) สังหารมังกร Abyssal Dragon ได้บัฟทีมก้อนแรก",
              side: "red"
            },
            {
              gameIndex: 1,
              time: "11:30",
              type: "Dark Slayer",
              description: "Blue Side (BAC) ล่า Dark Slayer สำเร็จและดันป้อมนอกด้านบน",
              side: "blue"
            },
            {
              gameIndex: 1,
              time: "15:20",
              type: "Victory",
              description: "Blue Side (BAC) ทะลายฐานหลัก ชนะเกมที่ 1 นำ 1-0 คะแนน",
              side: "blue"
            },
            {
              gameIndex: 2,
              time: "01:30",
              type: "First Blood",
              description: "Red Side (BRU) ไล่ต้อนแครี่ฝั่ง Blue Side เก็บเฟิรสบลัดต้นเกม",
              side: "red"
            }
          ]
        });
      }
    }

    // 5. Seed default matches for bracket size 8 if empty
    const matchCount = await prisma.match.count({ where: { gameId } });
    if (matchCount === 0) {
      await prisma.match.createMany({
        data: [
          { id: "m8-qf-1", team1Id: "team-1", team2Id: "team-5", team1Score: 0, team2Score: 0, status: "scheduled", round: 0 },
          { id: "m8-qf-2", team1Id: "team-2", team2Id: "team-3", team1Score: 0, team2Score: 0, status: "scheduled", round: 0 },
          { id: "m8-qf-3", team1Id: "team-4", team2Id: "team-6", team1Score: 0, team2Score: 0, status: "scheduled", round: 0 },
          { id: "m8-qf-4", team1Id: null, team2Id: null, team1Score: 0, team2Score: 0, status: "scheduled", round: 0 },
          { id: "m8-sf-1", team1Id: null, team2Id: null, team1Score: 0, team2Score: 0, status: "scheduled", round: 1 },
          { id: "m8-sf-2", team1Id: null, team2Id: null, team1Score: 0, team2Score: 0, status: "scheduled", round: 1 },
          { id: "m8-f",   team1Id: null, team2Id: null, team1Score: 0, team2Score: 0, status: "scheduled", round: 2 }
        ]
      });
    }

    // 6. Query all state
    const dbTeams = await prisma.team.findMany({ where: { gameId }, orderBy: { createdAt: "asc" } });
    const dbGroups = await prisma.group.findMany({ where: { gameId }, include: { teams: true }, orderBy: { name: "asc" } });
    const dbSettings = await prisma.settings.findMany();
    const dbLiveMatch = await prisma.liveMatch.findFirst({ where: { gameId } });
    const dbTimeline = await prisma.timelineEvent.findMany({ where: { gameId }, orderBy: { createdAt: "desc" } });
    const dbMatches = await prisma.match.findMany({ where: { gameId }, orderBy: { round: "asc" } });

    // Format fields correctly
    const formattedTeams = dbTeams.map((t) => ({
      ...t,
      players: typeof t.players === "string" ? JSON.parse(t.players) : t.players,
    }));

    const formattedGroups = dbGroups.map((g) => ({
      id: g.id,
      name: g.name,
      teamIds: g.teams.map((t) => t.id)
    }));

    const liveStreamUrlVal = dbSettings.find(s => s.key === "liveStreamUrl")?.value || "https://www.youtube.com/embed/d3R28hY1Dlo";
    const bracketSizeVal = parseInt(dbSettings.find(s => s.key === "bracketSize")?.value || "8") || 8;

    const formattedLiveMatch = dbLiveMatch ? {
      team1Id: dbLiveMatch.team1Id,
      team2Id: dbLiveMatch.team2Id,
      team1Side: dbLiveMatch.team1Side as any,
      team2Side: dbLiveMatch.team2Side as any,
      gameScores: [dbLiveMatch.t1Score, dbLiveMatch.t2Score],
      currentGameIndex: dbLiveMatch.currentGameIndex,
      status: dbLiveMatch.status as any,
      timeline: dbTimeline.map((e) => ({
        id: e.id,
        gameIndex: e.gameIndex,
        time: e.time,
        type: e.type,
        description: e.description,
        side: e.side as any
      }))
    } : {
      team1Id: "",
      team2Id: "",
      team1Side: "Blue Side" as const,
      team2Side: "Red Side" as const,
      gameScores: [0, 0],
      currentGameIndex: 1,
      status: "scheduled" as const,
      timeline: []
    };

    return NextResponse.json({
      success: true,
      teams: formattedTeams,
      groups: formattedGroups,
      bracketSize: bracketSizeVal,
      bracketMatches: dbMatches,
      liveMatch: formattedLiveMatch,
      liveStreamUrl: liveStreamUrlVal
    });
  } catch (error: any) {
    console.error("API init error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
