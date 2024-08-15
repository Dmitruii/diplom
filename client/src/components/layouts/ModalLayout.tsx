"use client";

import { Modal } from "flowbite-react";

interface IModalLayout {
  children: React.ReactNode;
  isModalOpen: boolean;
  onClose: any;
  title?: string;
  rest?: any;
}

const ModalLayout = ({
  children,
  isModalOpen,
  onClose,
  title,
  rest,
}: IModalLayout) => {
  return (
    <Modal show={isModalOpen} size="md" onClose={onClose} {...rest}>
      {title && <Modal.Header>{title}</Modal.Header>}
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default ModalLayout;
