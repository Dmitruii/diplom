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
}: any) => {
  return {
    id: id,
    nextMatchId: nextMatchId, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
    tournamentRoundText: round_num,
    participants: [
      {
        id: contestant1_user_id?.id,
        resultText: "Won",
        isWinner: true,
        name: contestant1_user_id?.first_name,
      },
      {
        id: contestant2_user_id?.id,
        resultText: "Lose",
        isWinner: false,
        name: contestant2_user_id?.first_name,
      },
    ],
  };
};

export default createMatch;
