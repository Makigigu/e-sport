"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Types definition
export interface Team {
  id: string;
  schoolName: string;
  teamName: string;
  teamTag: string; // Max 3 chars, uppercase
  level: "ประถม" | "มัธยม";
  managerName?: string;
  players: any[]; // 6 player OpenIDs or { name, openid } objects
  status: "Pending" | "Approved" | "Waitlisted" | "Rejected";
  groupId?: string; // Group ID if assigned
  wins: number;
  losses: number;
  points: number;
}

export interface Match {
  id: string;
  team1Id: string | null;
  team2Id: string | null;
  team1Score?: number;
  team2Score?: number;
  winnerId?: string | null;
  status: "scheduled" | "live" | "completed";
  round: number; // 0, 1, 2 depending on bracket size
}

export interface TimelineEvent {
  id: string;
  gameIndex: number;
  time: string;
  type: string;
  description: string;
  side: "blue" | "red" | "neutral";
}

export interface LiveMatch {
  team1Id: string;
  team2Id: string;
  team1Side: "Blue Side" | "Red Side";
  team2Side: "Blue Side" | "Red Side";
  gameScores: number[]; // e.g. [1, 1] means 1-1
  currentGameIndex: number;
  status: "scheduled" | "live" | "completed";
  timeline: TimelineEvent[];
}

export interface Group {
  id: string;
  name: string; // Group A, Group B, etc.
  teamIds: string[];
}

interface AppContextType {
  teams: Team[];
  groups: Group[];
  bracketSize: number; // 4, 8, 16
  bracketMatches: Match[];
  liveMatch: LiveMatch;
  liveStreamUrl: string;
  registerTeam: (teamData: Omit<Team, "id" | "status" | "wins" | "losses" | "points">) => Promise<{ success: boolean; error?: string }>;
  updateTeamStatus: (teamId: string, status: Team["status"]) => Promise<{ success: boolean; error?: string }>;
  updateTeamStats: (teamId: string, wins: number, losses: number, points: number) => Promise<{ success: boolean; error?: string }>;
  createGroup: (name: string) => Promise<{ success: boolean; error?: string; group?: Group }>;
  deleteGroup: (groupId: string) => Promise<{ success: boolean; error?: string }>;
  assignTeamToGroup: (teamId: string, groupId: string | undefined) => Promise<{ success: boolean; error?: string }>;
  updateLiveStream: (url: string) => Promise<{ success: boolean; error?: string }>;
  updateBracketMatch: (matchId: string, team1Score: number, team2Score: number, status: Match["status"]) => Promise<{ success: boolean; error?: string }>;
  setBracketSize: (size: number) => Promise<{ success: boolean; error?: string }>;
  updateLiveMatchMeta: (team1Id: string, team2Id: string, team1Side: "Blue Side" | "Red Side", team2Side: "Blue Side" | "Red Side", status: LiveMatch["status"]) => Promise<{ success: boolean; error?: string }>;
  addTimelineEvent: (gameIndex: number, time: string, type: string, description: string, side: TimelineEvent["side"]) => Promise<{ success: boolean; error?: string }>;
  clearTimeline: () => Promise<{ success: boolean; error?: string }>;
  updateLiveMatchScore: (team1Score: number, team2Score: number) => Promise<{ success: boolean; error?: string }>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [bracketSize, setBracketSizeState] = useState<number>(8);
  const [bracketMatches, setBracketMatches] = useState<Match[]>([]);
  const [liveStreamUrl, setLiveStreamUrl] = useState<string>("https://www.youtube.com/embed/d3R28hY1Dlo");

  const [liveMatch, setLiveMatch] = useState<LiveMatch>({
    team1Id: "",
    team2Id: "",
    team1Side: "Blue Side",
    team2Side: "Red Side",
    gameScores: [0, 0],
    currentGameIndex: 1,
    status: "scheduled",
    timeline: []
  });

  // Load initial data from database on mount (seeds DB if empty)
  const refreshState = async () => {
    try {
      const res = await fetch("/api/init");
      const data = await res.json();
      if (data.success) {
        setTeams(data.teams);
        setGroups(data.groups);
        setBracketSizeState(data.bracketSize);
        setBracketMatches(data.bracketMatches);
        setLiveMatch(data.liveMatch);
        setLiveStreamUrl(data.liveStreamUrl);
      }
    } catch (err) {
      console.error("Failed to load initial data from DB", err);
    }
  };

  useEffect(() => {
    refreshState();
  }, []);

  const registerTeam = async (teamData: Omit<Team, "id" | "status" | "wins" | "losses" | "points">) => {
    try {
      const res = await fetch("/api/teams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(teamData)
      });
      const data = await res.json();
      if (data.success) {
        setTeams(prev => [...prev, data.team]);
        return { success: true };
      }
      return { success: false, error: data.error };
    } catch (err: any) {
      console.error("Failed to register team in DB", err);
      return { success: false, error: err.message };
    }
  };

  const updateTeamStatus = async (teamId: string, status: Team["status"]) => {
    try {
      const res = await fetch(`/api/teams/${teamId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (data.success) {
        await refreshState();
        return { success: true };
      }
      return { success: false, error: data.error };
    } catch (err: any) {
      console.error("Failed to update team status in DB", err);
      return { success: false, error: err.message };
    }
  };

  const updateTeamStats = async (teamId: string, wins: number, losses: number, points: number) => {
    try {
      const res = await fetch(`/api/teams/${teamId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wins, losses, points })
      });
      const data = await res.json();
      if (data.success) {
        await refreshState();
        return { success: true };
      }
      return { success: false, error: data.error };
    } catch (err: any) {
      console.error("Failed to update team stats in DB", err);
      return { success: false, error: err.message };
    }
  };

  const createGroup = async (name: string) => {
    try {
      const res = await fetch("/api/groups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name })
      });
      const data = await res.json();
      if (data.success) {
        setGroups(prev => [...prev, data.group]);
        return { success: true, group: data.group };
      }
      return { success: false, error: data.error };
    } catch (err: any) {
      console.error("Failed to create group in DB", err);
      return { success: false, error: err.message };
    }
  };

  const deleteGroup = async (groupId: string) => {
    try {
      const res = await fetch(`/api/groups?id=${groupId}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (data.success) {
        await refreshState();
        return { success: true };
      }
      return { success: false, error: data.error };
    } catch (err: any) {
      console.error("Failed to delete group in DB", err);
      return { success: false, error: err.message };
    }
  };

  const assignTeamToGroup = async (teamId: string, groupId: string | undefined) => {
    try {
      const res = await fetch(`/api/teams/${teamId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ groupId: groupId || null })
      });
      const data = await res.json();
      if (data.success) {
        await refreshState();
        return { success: true };
      }
      return { success: false, error: data.error };
    } catch (err: any) {
      console.error("Failed to assign team to group in DB", err);
      return { success: false, error: err.message };
    }
  };

  const updateLiveStream = async (url: string) => {
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ liveStreamUrl: url })
      });
      const data = await res.json();
      if (data.success) {
        setLiveStreamUrl(url);
        return { success: true };
      }
      return { success: false, error: data.error };
    } catch (err: any) {
      console.error("Failed to update live stream URL in DB", err);
      return { success: false, error: err.message };
    }
  };

  const setBracketSize = async (size: number) => {
    try {
      setBracketSizeState(size);
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bracketSize: size })
      });
      const data = await res.json();
      if (data.success) {
        await refreshState();
        return { success: true };
      }
      return { success: false, error: data.error };
    } catch (err: any) {
      console.error("Failed to set bracket size in DB", err);
      return { success: false, error: err.message };
    }
  };

  const updateBracketMatch = async (
    matchId: string,
    team1Score: number,
    team2Score: number,
    status: Match["status"]
  ) => {
    try {
      const res = await fetch(`/api/bracket-matches/${matchId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ team1Score, team2Score, status })
      });
      const data = await res.json();
      if (data.success) {
        await refreshState();
        return { success: true };
      }
      return { success: false, error: data.error };
    } catch (err: any) {
      console.error("Failed to update bracket match in DB", err);
      return { success: false, error: err.message };
    }
  };

  const updateLiveMatchMeta = async (
    team1Id: string,
    team2Id: string,
    team1Side: "Blue Side" | "Red Side",
    team2Side: "Blue Side" | "Red Side",
    status: LiveMatch["status"]
  ) => {
    try {
      const res = await fetch("/api/live-match", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ team1Id, team2Id, team1Side, team2Side, status })
      });
      const data = await res.json();
      if (data.success) {
        setLiveMatch(prev => ({
          ...prev,
          team1Id,
          team2Id,
          team1Side,
          team2Side,
          status
        }));
        return { success: true };
      }
      return { success: false, error: data.error };
    } catch (err: any) {
      console.error("Failed to update live match meta in DB", err);
      return { success: false, error: err.message };
    }
  };

  const updateLiveMatchScore = async (team1Score: number, team2Score: number) => {
    try {
      const currentIdx = team1Score + team2Score + 1;
      const res = await fetch("/api/live-match", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ t1Score: team1Score, t2Score: team2Score, currentGameIndex: currentIdx })
      });
      const data = await res.json();
      if (data.success) {
        setLiveMatch(prev => ({
          ...prev,
          gameScores: [team1Score, team2Score],
          currentGameIndex: currentIdx
        }));
        return { success: true };
      }
      return { success: false, error: data.error };
    } catch (err: any) {
      console.error("Failed to update live match score in DB", err);
      return { success: false, error: err.message };
    }
  };

  const addTimelineEvent = async (
    gameIndex: number,
    time: string,
    type: string,
    description: string,
    side: TimelineEvent["side"]
  ) => {
    try {
      const res = await fetch("/api/live-match/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameIndex, time, type, description, side })
      });
      const data = await res.json();
      if (data.success) {
        setLiveMatch(prev => ({
          ...prev,
          timeline: [
            {
              id: data.event.id,
              gameIndex,
              time,
              type,
              description,
              side
            },
            ...prev.timeline
          ]
        }));
        return { success: true };
      }
      return { success: false, error: data.error };
    } catch (err: any) {
      console.error("Failed to log timeline event to DB", err);
      return { success: false, error: err.message };
    }
  };

  const clearTimeline = async () => {
    try {
      const res = await fetch("/api/live-match/events", {
        method: "DELETE"
      });
      const data = await res.json();
      if (data.success) {
        setLiveMatch(prev => ({
          ...prev,
          timeline: []
        }));
        return { success: true };
      }
      return { success: false, error: data.error };
    } catch (err: any) {
      console.error("Failed to clear timeline in DB", err);
      return { success: false, error: err.message };
    }
  };

  return (
    <AppContext.Provider
      value={{
        teams,
        groups,
        bracketSize,
        bracketMatches,
        liveMatch,
        liveStreamUrl,
        registerTeam,
        updateTeamStatus,
        updateTeamStats,
        createGroup,
        deleteGroup,
        assignTeamToGroup,
        updateLiveStream,
        updateBracketMatch,
        setBracketSize,
        updateLiveMatchMeta,
        addTimelineEvent,
        clearTimeline,
        updateLiveMatchScore
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppContextProvider");
  }
  return context;
};
