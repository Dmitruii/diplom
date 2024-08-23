import BottomBarButtons from "../BottomBarButtons";
import FormInput from "@/components/form/FormInput";
import { Button } from "flowbite-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { addTeam } from "@/store/slice/GameSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import TeamList from "./team/TeamList";
import { useEffect } from "react";
import { teamSize } from "@/lib/data";

type Inputs = {
  gameName: string;
};

const CreateTeam = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Inputs>();
  const dispatch = useAppDispatch();
  const teams = useAppSelector((state) => state.game.game.teams);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    let errorSet = false;

    for (let i = 0; i < teams.length; i++) {
      if (teams[i].name === data.gameName) {
        setError("gameName", { type: "repeat" });
        errorSet = true;
        break;
      }
    }

    if (!errorSet) {
      dispatch(addTeam({ name: data.gameName, players: [] } as any));
    }
  };

  // only 2,4,8,16 etc. team size
  const isValid = teamSize.includes(teams.length);

  return (
    <div className="h-full flex flex-col justify-between items-center w-full">
      <div className="gap-10 w-full h-full flex items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-1/3 gap-5 flex flex-col items-center justify-center"
        >
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-semibold ">Create Teams</h1>
            <h2 className="text-sm text-red-600">
              Only 2, 4, 8, 16, 32 etc teams
            </h2>
          </div>
          <div className="w-full flex flex-col gap-5">
            <FormInput
              rest={{ ...register("gameName", { required: true }) }}
              errors={errors.gameName}
              placeholder="NAVI"
              label="Command name"
            />
            <Button type="submit" className="text-nowrap" color="blue">
              Add Team
            </Button>
          </div>
        </form>

        <TeamList />
      </div>

      <BottomBarButtons isTeam isValid={isValid} />
    </div>
  );
};

export default CreateTeam;
