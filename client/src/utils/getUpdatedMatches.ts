export function getUpdatedMatches(matches: any) {
  // Copy the matches array to avoid modifying the original
  let updatedMatches = JSON.parse(JSON.stringify(matches));

  // Sort matches by round_num and id
  updatedMatches.sort(
    (a: any, b: any) => a.round_num - b.round_num || a.id - b.id
  );

  let roundMatches = {};

  // Group matches by round_num
  updatedMatches.forEach((match: any) => {
    if (!roundMatches[match.round_num]) {
      roundMatches[match.round_num] = [];
    }
    roundMatches[match.round_num].push(match);
  });

  // Iterate over rounds
  let rounds = Object.keys(roundMatches).sort((a, b) => a - b);
  for (let i = 0; i < rounds.length - 1; i++) {
    let currentRound = roundMatches[rounds[i]];
    let nextRound = roundMatches[rounds[i + 1]];

    // Set next_match_id for matches in the current round
    for (let j = 0; j < currentRound.length; j++) {
      currentRound[j].next_match_id = nextRound[Math.floor(j / 2)]?.id || null;
    }
  }

  return updatedMatches;
}
