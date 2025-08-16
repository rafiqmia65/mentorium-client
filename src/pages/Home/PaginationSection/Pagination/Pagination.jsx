import React from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";

const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const maxPageButtons = 5; // Maximum number of page buttons to display at once

  // Function to generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= maxPageButtons) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
      let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

      if (endPage - startPage + 1 < maxPageButtons) {
        startPage = Math.max(1, endPage - maxPageButtons + 1);
      }

      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) {
          pages.push("...");
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push("...");
        }
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center bg-base-100 p-4 rounded-xl shadow-md mt-6">
      {/* Displaying current range */}
      <div className="text-sm text-text mb-4 sm:mb-0">
        Showing {Math.min(totalItems, (currentPage - 1) * itemsPerPage + 1)}-
        {Math.min(totalItems, currentPage * itemsPerPage)} of {totalItems}
      </div>

      {/* Pagination Controls */}
      <nav className="flex items-center space-x-1" aria-label="Pagination">
        {/* First Page Button */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg text-primary hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          <FaAngleDoubleLeft className="w-4 h-4" />
        </button>

        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg text-primary hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          <FaChevronLeft className="w-4 h-4" />
        </button>

        {/* Page Numbers */}
        {pageNumbers.map((page, index) => (
          <React.Fragment key={index}>
            {page === "..." ? (
              <span className="px-3 py-2 text-primary">...</span>
            ) : (
              <button
                onClick={() => onPageChange(page)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                  ${
                    currentPage === page
                      ? "bg-primary text-white shadow-sm"
                      : "text-primary hover:bg-gray-200"
                  }`}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg text-primary hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          <FaChevronRight className="w-4 h-4" />
        </button>

        {/* Last Page Button */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg text-primary hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          <FaAngleDoubleRight className="w-4 h-4" />
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
