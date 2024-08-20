"use client";
import FinalModal from "@/components/modal/FinalModal";
import client from "@/directus/api";
import { entities } from "@/lib/data";
import { IOption } from "@/lib/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setIsModalOpen,
  setMatches,
  setWiner,
} from "@/store/slice/TournamentSlice";
import toOptions from "@/utils/toOptions";
import tournaments from "@/utils/tournaments";
import { readItem, readItems, updateItem } from "@directus/sdk";
import { Button, Select } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

const Final = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const matches = useAppSelector((state) => state.tournament.matches);
  const user = useAppSelector((state) => state.user.user);
  const type = useAppSelector((state) => state.tournament.playersType);
  const winner = useAppSelector((state) => state.tournament.winner);
  const [options, setOptions] = useState<IOption[]>([]);
  const [tour, setTour] = useState<any>();
  const [selectedOption, setSelectedOption] = useState<any>(null);

  const updateWinner = async () => {
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

  const fetchTour = async () => {
    const data = await client.request(
      readItem(entities.tournaments, params.id, {
        fields: ["*", "winner_id.*.*"],
      })
    );
    setTour(data);
  };

  const fetchMatches = async () => {
    if (matches.length) {
      const final = matches.find((match) => match.nextMatchId === null);
      setOptions(toOptions(final.participants, "name", "id"));
    } else {
      const data = await client.request(
        readItems(entities.matches, {
          filter: {
            _and: [
              {
                tournament_id: {
                  _eq: params.id,
                },
              },
            ],
          },
          fields: ["*", "collection.*.*", "winner_id.*"],
        })
      );
      const newMatches = tournaments(data);
      dispatch(setMatches(newMatches));
      const final = newMatches.find((match) => match.nextMatchId === null);
      setOptions(toOptions(final.participants, "name", "id"));
    }
  };

  useEffect(() => {
    fetchTour();
    fetchMatches();
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
      <div className="mx-10 my-5 flex gap-5">
        <Button onClick={() => router.back()}>Back</Button>
        <Button onClick={() => router.push("/dashboard")}>To Dashboard</Button>
      </div>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold mr-5">The winner is:</h1>
          {user?.id === tour?.admin_id ? (
            <>
              {" "}
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
            </>
          ) : (
            <span>
              {tour?.winner_id[0].item.first_name ||
                tour?.winner_id[0].item.name}
            </span>
          )}
        </div>

        {user?.id === tour?.admin_id && (
          <Button
            className="mt-6"
            disabled={!selectedOption}
            onClick={() => updateWinner()}
          >
            Set winner
          </Button>
        )}
      </div>
    </>
  );
};

export default Final;
