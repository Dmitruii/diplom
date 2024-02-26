'use client'

import Image from 'next/image'
import DashboardLayout from "@/components/layouts/DashboardLayout"
import EditProfileModal from '@/components/modal/EditProfileModal'
import { openProfileModal, openUploadModal } from '@/store/slice/EditProfileSlice'
import { useAppDispatch } from '@/store/hooks'
import FormInput from '@/components/form/FormInput'
import { Button } from 'flowbite-react'
import UpdateEditProfileModal from '@/components/modal/UpdateEditProfileModal'

const Edit = () => {
    const dispatch = useAppDispatch()
    const open = () => dispatch(openProfileModal())

    return <DashboardLayout>
        <div className='w-[900px] mx-auto flex flex-col justify-between h-full'>
            <div className='flex flex-col'>
                <div className='flex justify-between items-center'>
                    <h1 className="text-3xl font-semibold">Edit Profile</h1>
                    <ProfileImage onClick={open} />
                </div>
            
                <FormInput 
                    label="Nick Name"
                    placeholder="SuperPuperNickName"
                    required
                />
            </div>

            <Button
                onClick={() => dispatch(openUploadModal())} 
                color="success" 
                className='ml-auto'
            >Update</Button>

            <EditProfileModal />
            <UpdateEditProfileModal />
        </div>
    </DashboardLayout>
}

export default Edit

interface IProfileImage {
    onClick: any
}

const ProfileImage = ({onClick}: IProfileImage) => {
    return <div 
        onClick={onClick}
        className='cursor-pointer relative group duration-300 rounded-full overflow-hidden'
    >
        <div className='duration-100 group-hover:bg-slate-700/40 absolute top-0 bottom-0 right-0 left-0' />
        <Image 
            alt="profile"
            src="/profile.svg"
            width={80}
            height={80}
        />
        <Image 
            alt="profile"
            src="/edit.svg"
            width={34}
            height={34}
            className='fill-white duration-100 opacity-0 group-hover:opacity-100 absolute top-6 left-6'
        />
    </div>
}