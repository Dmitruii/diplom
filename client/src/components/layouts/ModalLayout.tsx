'use client';

import { Modal } from "flowbite-react";

interface IModalLayout {
    children: React.ReactNode
    isModalOpen: boolean
    onClose: any
    title?: string
}

const ModalLayout = ({
    children,
    isModalOpen,
    onClose,
    title
}: IModalLayout) => {
    return <Modal show={isModalOpen} size="md" onClose={onClose} popup>
        <Modal.Header>{title}</Modal.Header>
        <Modal.Body>
            {children}
        </Modal.Body>
    </Modal>
}

export default ModalLayout