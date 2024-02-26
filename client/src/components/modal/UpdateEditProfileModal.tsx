'use client'

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import ModalLayout from "../layouts/ModalLayout"
import { closeUploadModal } from "@/store/slice/EditProfileSlice";
import { useRouter } from 'next/navigation'
import { Button } from "flowbite-react";
import { resetState } from "@/store/slice/EditProfileSlice";

const UpdateEditProfileModal = () => {
    const router = useRouter()
    const dispatch = useAppDispatch();
    const isModalOpen = useAppSelector((state) => state.edit.isUploadModalOpen);
    const close = () => dispatch(closeUploadModal())
    
    return <ModalLayout
        isModalOpen={isModalOpen}
        onClose={close}
        title="You sure you wanna update profile?"        
    >
        <div className="flex gap-3 justify-end mt-1">
            <Button color="failure" onClick={() => {
                dispatch(resetState())
                router.push('/dashboard')
            }}>
                Yes, I&apos;m sure
            </Button>
            <Button color="gray" onClick={() => dispatch(closeUploadModal())}>
                No, cancel
            </Button>
        </div>
    </ModalLayout>
}

export default UpdateEditProfileModal