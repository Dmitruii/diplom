import { IGame } from "@/lib/types";

export function createTournamentBracketsTeam(game: IGame) {
  // Combine teams and solo players into a single array of participants
  let participants = [];

  // Add team names as participants
  game.teams.forEach((team) => {
    participants.push({ name: team.name, type: "team" });
  });

  // Add solo players as participants
  game.soloPLayers.forEach((player) => {
    participants.push({ name: player.label, type: "solo" });
  });

  // Check if the number of participants is even
  if (participants.length % 2 !== 0) {
    console.error("Number of participants must be even");
    return [];
  }

  let matches: any[] = [];
  let roundNumber = 1;
  let matchId = 1;

  // Create the first round of matches
  for (let i = 0; i < participants.length; i += 2) {
    matches.push({
      id: matchId++,
      nextMatchId: null, // This will be updated in subsequent rounds
      tournamentRoundText: `Round ${roundNumber}`,
      tournamentRound: roundNumber,
      participants: [],
    });
  }

  function createNextRound(currentRoundMatches: any[], roundNumber: number) {
    if (currentRoundMatches.length === 1) {
      return;
    }

    let nextRoundMatches = [];
    for (let i = 0; i < currentRoundMatches.length; i += 2) {
      const nextMatchId = matchId++;
      nextRoundMatches.push({
        id: nextMatchId,
        nextMatchId: null,
        tournamentRoundText: `Round ${roundNumber}`,
        tournamentRound: roundNumber,
        participants: [],
      });

      currentRoundMatches[i].nextMatchId = nextMatchId;
      currentRoundMatches[i + 1].nextMatchId = nextMatchId;
    }

    matches = matches.concat(nextRoundMatches);
    createNextRound(nextRoundMatches, roundNumber + 1);
  }

  createNextRound(matches, roundNumber + 1);

  return matches;
}

export function createTournamentBracketsSolo(participants: any) {
  if (participants.length % 2 !== 0) {
    console.error("Number of participants must be even");
  }

  let matches: any = [];
  let roundNumber = 1;
  let matchId = 1;

  // Create the first round of matches
  for (let i = 0; i < participants.length; i += 2) {
    matches.push({
      id: matchId++,
      nextMatchId: null, // This will be updated in subsequent rounds
      tournamentRoundText: `Round ${roundNumber}`,
      tournamentRound: roundNumber,
      participants: [],
    });
  }

  function createNextRound(currentRoundMatches: any, roundNumber: any) {
    if (currentRoundMatches.length === 1) {
      return;
    }

    let nextRoundMatches = [];
    for (let i = 0; i < currentRoundMatches.length; i += 2) {
      const nextMatchId = matchId++;
      nextRoundMatches.push({
        id: nextMatchId,
        nextMatchId: null,
        tournamentRoundText: `Round ${roundNumber}`,
        tournamentRound: roundNumber,
        participants: [],
      });

      currentRoundMatches[i].nextMatchId = nextMatchId;
      currentRoundMatches[i + 1].nextMatchId = nextMatchId;
    }

    matches = matches.concat(nextRoundMatches);
    createNextRound(nextRoundMatches, roundNumber + 1);
  }

  createNextRound(matches, roundNumber + 1);

  return matches;
}
