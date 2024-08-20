"use client";

import Image from "next/image";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import EditProfileModal from "@/components/modal/EditProfileModal";
import {
  closeUploadModal,
  openProfileModal,
  openUploadModal,
  resetState,
} from "@/store/slice/EditProfileSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import FormInput from "@/components/form/FormInput";
import { Avatar, Button } from "flowbite-react";
import UpdateEditProfileModal from "@/components/modal/UpdateEditProfileModal";
import { useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import { IOption } from "@/lib/types";
import { entities } from "@/lib/data";
import { readItems, updateUser } from "@directus/sdk";
import client from "@/directus/api";
import toOptions from "@/utils/toOptions";
import { useRouter } from "next/navigation";
import { setUser } from "@/store/slice/UserSlice";
import { setIsLoading, setToast } from "@/store/slice/GlobalModalsSlice";

export type Inputs = {
  firstName: string;
  lastName: string;
  group: string;
};

const Edit = () => {
  const router = useRouter();
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const open = () => dispatch(openProfileModal());
  const [options, setOptions] = useState<IOption[]>([]);

  const { register, getValues, handleSubmit } = useForm<Inputs>();

  const fetchOptions = async () => {
    const groups: any = await client.request(readItems(entities.groups));
    setOptions(toOptions(groups, "title"));
  };

  const update = async () => {
    dispatch(setIsLoading(true));
    const updatedUser: any = await client.request(
      updateUser(user.id, getSetValues(getValues()))
    );
    dispatch(setUser(updatedUser));
    dispatch(closeUploadModal());
    dispatch(resetState());
    dispatch(
      setToast({ type: "success", label: "Profile updated successfully" })
    );
    router.push("/dashboard");
  };

  const handle = () => {
    dispatch(openUploadModal());
  };

  useEffect(() => {
    fetchOptions();
  }, []);

  return (
    <DashboardLayout>
      <form
        onSubmit={handleSubmit(handle)}
        className="w-[900px] mx-auto flex flex-col justify-between h-full"
      >
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-semibold">Edit Profile</h1>
            <ProfileImage onClick={open} />
          </div>

          <div className="flex flex-col gap-5">
            <FormInput
              rest={{ ...register("firstName") }}
              fieldType="text"
              label="First Name"
              placeholder="First Name"
            />
            <FormInput
              rest={{ ...register("lastName") }}
              fieldType="text"
              label="Last Name"
              placeholder="Last Name"
            />
            <FormInput
              rest={{
                ...register("group"),
              }}
              type="Select"
              options={options}
              label="Group"
              fieldType="text"
              placeholder="21OKC2"
            />
          </div>
        </div>

        <Button
          //   onClick={() => dispatch(openUploadModal())}
          color="success"
          className="ml-auto"
          type="submit"
        >
          Update
        </Button>

        <EditProfileModal />
        <UpdateEditProfileModal update={update} />
      </form>
    </DashboardLayout>
  );
};

export default Edit;

interface IProfileImage {
  onClick: any;
}

const ProfileImage = ({ onClick }: IProfileImage) => {
  const user = useAppSelector((state) => state.user.user);
  return (
    <div
      onClick={onClick}
      className="cursor-pointer relative group duration-300 rounded-full overflow-hidden"
    >
      <div className="duration-100 group-hover:bg-slate-700/40 absolute top-0 bottom-0 right-0 left-0" />
      <Avatar
        alt="profile"
        img={
          user?.avatar
            ? `${process.env.NEXT_PUBLIC_API_URL}/assets/${user?.avatar}`
            : "/profile.svg"
        }
        size="lg"
        statusPosition="top-center"
      />
      <Image
        alt="profile"
        src="/edit.svg"
        width={34}
        height={34}
        className="fill-white duration-100 opacity-0 group-hover:opacity-100 absolute top-6 left-6"
      />
    </div>
  );
};

function getSetValues(obj: any) {
  let result = {};

  for (let key in obj) {
    if (obj[key] !== undefined && obj[key] !== "") {
      result[key] = obj[key];
    }
  }

  return result;
}
