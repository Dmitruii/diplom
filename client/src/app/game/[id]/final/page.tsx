"use client";
import FinalModal from "@/components/modal/FinalModal";
import client from "@/directus/api";
import { entities } from "@/lib/data";
import { IOption } from "@/lib/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setIsModalOpen, setWiner } from "@/store/slice/TournamentSlice";
import toOptions from "@/utils/toOptions";
import { readItem, updateItem } from "@directus/sdk";
import { Button, Select } from "flowbite-react";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

const Final = ({ params }: { params: { id: string } }) => {
  const dispatch = useAppDispatch();
  const matches = useAppSelector((state) => state.tournament.matches);
  const type = useAppSelector((state) => state.tournament.playersType);
  const winner = useAppSelector((state) => state.tournament.winner);
  const final = matches.find((match) => match.nextMatchId === null);
  const [options, setOptions] = useState<IOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<any>(null);

  const updateWinner = async () => {
    const tour = await client.request(
      readItem(entities.tournaments, params.id)
    );
    const data = await client.request(
      updateItem(entities.tournaments, params.id, {
        winner_id: {
          create: [
            {
              tournaments_id: params.id,
              collection: type,
              item: { id: selectedOption.value },
            },
          ],
          delete: tour.winner_id,
        },
      })
    );
    dispatch(setWiner(data));
    dispatch(setIsModalOpen());
  };

  useEffect(() => {
    setOptions(toOptions(final.participants, "name", "id"));
  }, []);

  return (
    <>
      <FinalModal isModalOpen={winner} />
      <Confetti
        numberOfPieces={winner ? 200 : 0}
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={true}
      />
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold mr-5">The winner is:</h1>
          {selectedOption ? (
            <div>
              <span>{selectedOption.label}</span>
              <span
                className="ml-5 cursor-pointer"
                onClick={() => setSelectedOption(null)}
              >
                X
              </span>
            </div>
          ) : (
            <Select
              onChange={(e) =>
                setSelectedOption(
                  options.find((option) => option.value == e.target.value)
                )
              }
            >
              {options.map(({ value, label }: IOption) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
          )}
        </div>

        <Button
          className="mt-6"
          disabled={!selectedOption}
          onClick={() => updateWinner()}
        >
          Set winner
        </Button>
      </div>
    </>
  );
};

export default Final;
