"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Spinner } from "flowbite-react";

const Loader = () => {
  const isLoading = useAppSelector((state) => state.globalModals.isLoading);

  return (
    isLoading && (
      <div className="z-50 absolute bg-black bg-opacity-20 top-0 bottom-0 right-0 left-0 flex items-center justify-center">
        <Spinner size="xl" />
      </div>
    )
  );
};

export default Loader;
