import { SubmitHandler, useForm } from "react-hook-form";
import BottomBarButtons from "../BottomBarButtons";
import FormInput from "@/components/form/FormInput";
import { useEffect, useState } from "react";
import client from "@/directus/api";
import { readItems } from "@directus/sdk";
import { entities } from "@/lib/data";
import { IOption } from "@/lib/types";
import toOptions from "@/utils/toOptions";
import { watch } from "fs";
import { useAppDispatch } from "@/store/hooks";
import { setLocation } from "@/store/slice/GameSlice";

type Inputs = {
  location: string;
};

const LocationStep = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>();
  const [locationOptions, setLocationOptions] = useState<IOption[]>([]);

  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<Inputs> = (data) => {};

  const fetch = async () => {
    const data = await client.request(readItems(entities.locations));
    setLocationOptions(toOptions(data, "title", "id"));
  };

  useEffect(() => {
    fetch();
  }, []);

  const loc = watch("location");

  return (
    <div className="h-full flex flex-col justify-between items-center w-full">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold mb-5">Location</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-1/3 gap-5 flex flex-col items-center justify-center"
        >
          <div className="w-full flex flex-col gap-5">
            <FormInput
              rest={{ ...register("location", { required: true }) }}
              errors={errors.location}
              placeholder="cabinet 1"
              label="Cabinet"
              type="Select"
              options={locationOptions}
            />
          </div>
        </form>
      </div>

      <BottomBarButtons
        onClickNextStep={() => {
          dispatch(
            setLocation(locationOptions.find((option) => option.value == loc))
          );
        }}
        isValid={!!loc?.length}
      />
    </div>
  );
};

export default LocationStep;
