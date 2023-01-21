import React from "react";

function Pagination({ nPages, currentPage, setCurrentPage }) {
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };
  return (
    <div className="container flex justify-center mx-auto">
      <ul className="flex gap-2">
        <li>
          <button
            onClick={prevPage}
            className="h-10 px-5 text-gray-600 bg-white border border-gray-600 hover:bg-gray-100"
          >
            Prev
          </button>
        </li>
        {pageNumbers.map((pgNumber) => (
          <li key={pgNumber}>
            <button
              onClick={() => setCurrentPage(pgNumber)}
              className="h-10 px-5 text-gray-600 bg-white border border-gray-600 "
            >
              {pgNumber}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={nextPage}
            className="h-10 px-5 text-gray-600 bg-white border border-gray-600 hover:bg-gray-100"
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
