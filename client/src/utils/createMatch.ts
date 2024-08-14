interface ICreateMatch {
  id: number;
  nextMatchId: number;
  contestant1_user_id: any;
  contestant2_user_id: any;
  round_num: number;
}

const createMatch = ({
  id,
  nextMatchId,
  contestant1_user_id,
  contestant2_user_id,
  round_num,
}: ICreateMatch) => {
  const match: any = {
    id: id,
    nextMatchId: nextMatchId, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
    tournamentRoundText: round_num,
    participants: [],
  };
  if (contestant1_user_id) {
    match.participants.push({
      id: contestant1_user_id.item.id,
      resultText: "Won",
      isWinner: true,
      name:
        contestant1_user_id.item.first_name || contestant1_user_id.item.title,
    });
  } else {
    match.participants.push({});
  }

  if (contestant2_user_id) {
    match.participants.push({
      id: contestant2_user_id.item.id,
      resultText: "Won",
      isWinner: true,
      name:
        contestant2_user_id.item.first_name || contestant2_user_id.item.title,
    });
  } else {
    match.participants.push({});
  }
  return match;
};

export default createMatch;
