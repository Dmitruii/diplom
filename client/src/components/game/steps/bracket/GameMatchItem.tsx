import client from "@/directus/api";
import { entities } from "@/lib/data";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setPacticapant } from "@/store/slice/TournamentSlice";
import { updateItem } from "@directus/sdk";
import { Select } from "flowbite-react";

interface IGameMatchItem {
  match: any;
  participants: any[];
  index: number;
}

const GameMatchItem = ({ match, participants = [], index }: IGameMatchItem) => {
  const admin = useAppSelector((state) => state.tournament.admin_id);
  const user: any = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const type = useAppSelector((state) => state.tournament.playersType);

  // Filter out empty objects from participants
  const validParticipants = participants.filter(
    (participant) => participant && Object.keys(participant).length > 0
  );

  const part = [
    {
      id: "",
      name: "Choose",
    },
    ...validParticipants,
  ];

  const setPacticapantFunc = async (particapant: any) => {
    dispatch(
      setPacticapant({
        index: index,
        matchId: match.id,
        particapant: particapant,
      })
    );
    await client.request(
      updateItem(entities.matches, match.id, {
        collection: {
          create: [
            {
              matches_id: match.id,
              collection: type,
              item: { id: particapant.id },
            },
          ],
          update: [],
          delete: [],
        },
      })
    );
  };

  return (
    <>
      {user?.id === admin ? (
        <>
          {match.participants[index]?.id ? (
            <div className="w-full flex justify-between">
              <div>{match.participants[index]?.name}</div>
              {match.tournamentRoundText !== "1" && (
                <span
                  className="cursor-pointer"
                  onClick={() => setPacticapantFunc({})}
                >
                  X
                </span>
              )}
            </div>
          ) : (
            // Only render Select if there are valid participants
            validParticipants.length > 1 && (
              <Select
                className="w-full"
                onChange={(e) =>
                  setPacticapantFunc(
                    validParticipants.find((part) => part.id === e.target.value)
                  )
                }
              >
                {part.map((participant: any) => (
                  <option key={participant.id} value={participant.id}>
                    {participant.name}
                  </option>
                ))}
              </Select>
            )
          )}
        </>
      ) : (
        <div className="w-full flex justify-between">
          <div>{match.participants[index]?.name}</div>
        </div>
      )}
    </>
  );
};

export default GameMatchItem;
