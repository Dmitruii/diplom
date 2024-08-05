"use client";
import { IOption } from "@/lib/types";
import { useAppDispatch } from "@/store/hooks";
import {
  addParticipantToBrackets,
  removeOptionsSoloPlayers,
} from "@/store/slice/GameSlice";

interface IMatchSelectProps {
  options: IOption[];
  matchId: string | number;
}

const MatchSelect = ({ options, matchId }: IMatchSelectProps) => {
  const dispatch = useAppDispatch();

  return (
    <select
      className="w-full"
      onChange={(e) => {
        dispatch(
          addParticipantToBrackets({ participantId: e.target.value, matchId })
        );
        dispatch(removeOptionsSoloPlayers({ participantId: e.target.value }));
      }}
    >
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default MatchSelect;
