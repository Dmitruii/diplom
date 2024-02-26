'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { closeModal, resetState } from '@/store/slice/GameSlice';
import { Button } from 'flowbite-react';
import { useRouter } from 'next/navigation'
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import ModalLayout from '../layouts/ModalLayout';

const GameCancelModal = () => {
    const router = useRouter()
    const dispatch = useAppDispatch();
    const isModalOpen = useAppSelector((state) => state.game.isModalOpen);

    return (
        <ModalLayout
            isModalOpen={isModalOpen}
            onClose={() => dispatch(closeModal())}        
        >
            <div className="text-center">
                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Cancel game?
                </h3>
                <div className="flex justify-center gap-4">
                <Button color="failure" onClick={() => {
                    dispatch(resetState())
                    router.push('/dashboard')
                }}>
                    Yes, I&apos;m sure
                </Button>
                <Button color="gray" onClick={() => dispatch(closeModal())}>
                    No, cancel
                </Button>
                </div>
            </div>
        </ModalLayout>
  );
}

export default GameCancelModal