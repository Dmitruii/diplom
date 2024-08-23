"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setPage } from "@/store/slice/UsersSlice";
import { Pagination } from "flowbite-react";

const PaginationComp = () => {
  const page = useAppSelector((state) => state.users.page);
  const limit = useAppSelector((state) => state.users.limit);
  const total = useAppSelector((state) => state.users.total);
  const dispatch = useAppDispatch();

  const onPageChange = (page: number) => dispatch(setPage(page));

  return (
    <div className="flex overflow-x-auto sm:justify-center">
      <Pagination
        theme={{
          pages: {
            selector: {
              active:
                "bg-blue-100 text-blue-600 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white",
            },
          },
        }}
        layout="pagination"
        currentPage={page}
        totalPages={Math.round(total / limit)}
        onPageChange={onPageChange}
        previousLabel=""
        nextLabel=""
        showIcons
      />
    </div>
  );
};

export default PaginationComp;