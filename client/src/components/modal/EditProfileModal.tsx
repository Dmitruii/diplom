"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { closeProfileModal } from "@/store/slice/EditProfileSlice";
import ModalLayout from "../layouts/ModalLayout";
import { Button } from "flowbite-react";
import client from "@/directus/api";
import { deleteFile, updateUser, uploadFiles } from "@directus/sdk";
import { setAvatar } from "@/store/slice/UserSlice";
import UploadImage from "../profile/UploadImage";
import { setToast } from "@/store/slice/GlobalModalsSlice";
import { IUser } from "@/lib/types";

const EditProfileModal = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const file = useAppSelector((state) => state.user.file);
  const isModalOpen = useAppSelector((state) => state.edit.isProfileModalOpen);
  const close = () => dispatch(closeProfileModal());

  const update = async () => {
    const formData = new FormData();
    formData.append("file_1_property", "Value");
    formData.append("file", file as any);
    const result = await client.request(uploadFiles(formData));
    const { avatar } = await client.request(
      updateUser((user as IUser).id, { avatar: result.id })
    );
    dispatch(setAvatar({ avatar }));
    close();
    dispatch(
      setToast({ type: "success", label: "Avatar updated successfully" })
    );
  };

  const remove = async () => {
    const avatar = client.request(
      updateUser((user as IUser).id, { avatar: null })
    );
    const file = await client.request(
      deleteFile((user as IUser).avatar as string)
    );
    dispatch(setAvatar({ avatar: null }));
    dispatch(
      setToast({ type: "success", label: "Avatar removed successfully" })
    );
    close();
  };

  return (
    <ModalLayout
      isModalOpen={isModalOpen}
      onClose={close}
      title="Update avatar?"
    >
      <div className="flex flex-col items-center gap-5">
        <UploadImage />

        <div className="gap-2 flex self-end">
          <Button color="gray" onClick={remove}>
            Remove
          </Button>
          <Button color="blue" onClick={update}>
            Update
          </Button>
        </div>
      </div>
    </ModalLayout>
  );
};

export default EditProfileModal;
