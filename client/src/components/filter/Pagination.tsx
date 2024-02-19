'use client';

import { CustomFlowbiteTheme, Pagination } from 'flowbite-react';
import { useState } from 'react';

const PaginationComp = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page: number) => setCurrentPage(page);

  return (
    <div className="flex overflow-x-auto sm:justify-center">
      <Pagination
        theme={{
            pages: {selector: {
                active: "bg-blue-100 text-blue-600 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white",
              }}
        }}
        layout="pagination"
        currentPage={currentPage}
        totalPages={1000}
        onPageChange={onPageChange}
        previousLabel=""
        nextLabel=""
        showIcons
      />
    </div>
  );
}

export default PaginationComp