import { Button } from "flowbite-react";
import BottomBarButtons from "../BottomBarButtons";
import {
  addPlayer,
  setActivePlayersOptions,
  setGroups,
  setPlayersOptions,
} from "@/store/slice/GameSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import FormInput from "@/components/form/FormInput";
import PlayerList from "./player/TeamList";
import { entities, Groups, teamSize } from "@/lib/data";
import { useEffect, useMemo, useState } from "react";
import usePlayersOptions from "@/hooks/usePlayersOptions";
import client from "@/directus/api";
import { readItems, readUsers } from "@directus/sdk";
import { IGroup } from "@/lib/types";
import toOptions from "@/utils/toOptions";

export type Inputs = {
  group: string;
  player: string;
  team: string;
};

const AddPlayers = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const dispatch = useAppDispatch();
  const soloPlayers = useAppSelector((state) => state.game.game.soloPLayers);
  const activePlayersOptions = useAppSelector(
    (state) => state.game.game.activePlayersOptions
  );
  // const groups = useAppSelector((state) => state.game.groups);
  const teams = useAppSelector((state) => state.game.game.teams);
  const isSolo = useAppSelector((state) => state.game.isSolo);

  const teamsOptions = useMemo(
    () => toOptions(teams, "name"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const [groups, setGroups] = useState<any[]>([]);

  const chosenGroup = watch("group");
  const chosenPlayer = watch("player");
  const chosenTeam = watch("team");
  // const playersOptions = usePlayersOptions(chosenGroup);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const player: any = activePlayersOptions.find((option) => {
      return option.value === data.player;
    });

    const allPlayers: any = teams.reduce((acc, team: any) => {
      return acc.concat(team.players);
    }, []);

    // remove player form options
    dispatch(
      setActivePlayersOptions({
        options: activePlayersOptions.filter(
          (option) => option.value !== player.value
        ),
      })
    );

    if (isSolo) {
      dispatch(addPlayer({ player }));
    } else {
      if (!allPlayers.find((p: any) => p.value === player.value)) {
        dispatch(addPlayer({ team: data.team, player }));
      }
    }
  };

  const fetchUsersData = async () => {
    const users = await client.request(
      readUsers({
        fields: ["id", "first_name", "group_id"],
        filter: {
          group_id: {
            _eq: chosenGroup, // chosen group id
          },
        },
      })
    );
    const usersOptions = toOptions(users, "first_name");
    dispatch(setActivePlayersOptions({ options: usersOptions }));
    dispatch(setPlayersOptions({ options: usersOptions }));
  };

  const fetchData = async () => {
    const groups: any = await client.request(readItems(entities.groups));
    const groupsOptions = toOptions(groups, "title");
    setGroups(groupsOptions);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    chosenGroup && fetchUsersData();
  }, [chosenGroup]);

  return (
    <div className="h-full flex flex-col justify-between items-center w-full">
      <div className="gap-10 w-full h-full flex items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-1/3 gap-5 flex flex-col items-center justify-center"
        >
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-semibold ">Add Players</h1>
            {isSolo && (
              <h2 className="text-sm text-red-600">
                Only 2, 4, 8, 16, 32 etc users
              </h2>
            )}
          </div>
          <div className="w-full flex flex-col gap-5">
            <FormInput
              rest={{
                ...register("group", { required: true }),
                // onChange: fetchUsersData,
              }}
              errors={errors.group}
              type="Select"
              placeholder="NAVI"
              label="Group"
              options={groups}
            />

            <FormInput
              rest={{
                ...register("player", { required: true }),
                disabled: !chosenGroup,
              }}
              errors={errors.player}
              type="Select"
              placeholder="Lysa the Star-navigator"
              label={`Players from the ${
                chosenGroup && `${chosenGroup} class`
              }`}
              options={activePlayersOptions}
            />

            {!isSolo && (
              <FormInput
                rest={{
                  ...register("team", { required: true }),
                  disabled: !chosenPlayer,
                }}
                errors={errors.player}
                type="Select"
                placeholder="NAVI"
                label={`Team`}
                options={teamsOptions}
              />
            )}

            <Button
              type="submit"
              className="text-nowrap"
              color="blue"
              disabled={!isSolo ? !chosenTeam : !chosenPlayer}
            >
              Add Player
            </Button>
          </div>
        </form>

        <PlayerList />
      </div>

      <BottomBarButtons
        isValid={
          !isSolo
            ? teams.every((team) => team.players.length > 0)
            : teamSize.includes(soloPlayers.length)
        }
      />
    </div>
  );
};

export default AddPlayers;
