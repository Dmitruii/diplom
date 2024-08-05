import FormInput from "@/components/form/FormInput";
import BottomBarButtons from "../BottomBarButtons";
import { SubmitHandler, useForm } from "react-hook-form";
import { nextStep, setGame } from "@/store/slice/GameSlice";
import { useAppDispatch } from "@/store/hooks";
import { entities, gamesOptions } from "@/lib/data";
import { useEffect, useState } from "react";
import client from "@/directus/api";
import { readItems } from "@directus/sdk";
import { IOption } from "@/lib/types";

export type Inputs = {
  gameTitle: string;
  game: string;
  yourGame: string;
};

const GameSetup = () => {
  const {
    register,
    watch,
    formState: { errors, isValid },
    getValues,
  } = useForm<Inputs>();
  const dispatch = useAppDispatch();
  const [gamesOptions, setGamesOptions] = useState([]);

  const gameSelectValue = watch("game");

  const fetchGames = async () => {
    const data = await client.request(readItems(entities.games));
    const options: any = data.map(({ name, id }: any) => ({
      label: name,
      value: id,
    }));
    options.unshift({
      label: "Chose",
      value: "",
    });
    setGamesOptions(options);
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <>
      <form className="h-full flex flex-col justify-between w-full items-center">
        <div className="w-full h-full flex justify-center items-center">
          <div className="flex flex-col gap-10 w-1/3">
            <FormInput
              rest={{ ...register("gameTitle", { required: true }) }}
              label="Game Title"
              placeholder="SuperPuperGame"
              errors={errors.gameTitle}
            />

            <FormInput
              rest={{ ...register("game", { required: true }) }}
              label="Game"
              placeholder="CS:GO"
              type="Select"
              options={gamesOptions}
            />

            {gameSelectValue === "YourGame" && (
              <FormInput
                rest={{ ...register("yourGame", { required: true }) }}
                label="Your game"
                placeholder="SuperPuperGame"
                errors={errors.yourGame}
              />
            )}
          </div>
        </div>

        <BottomBarButtons
          onClickNextStep={() =>
            dispatch(
              setGame({
                gameTitle: getValues().gameTitle,
                game: gamesOptions.find(
                  (game: IOption) => game.value == getValues().game
                ),
              })
            )
          }
          isValid={isValid}
        />
      </form>
    </>
  );
};

export default GameSetup;
