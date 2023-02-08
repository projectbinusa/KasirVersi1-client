import React from "react";

function Pagination2({ cPages, currentPages, setCurrentPages }) {
  const pageNumbers = [...Array(cPages + 1).keys()].slice(1);

  const nextPages = () => {
    if (currentPages !== cPages) setCurrentPages(currentPages + 1);
  };
  const prevPages = () => {
    if (currentPages !== 1) setCurrentPages(currentPages - 1);
  };
  return (
    <div className="container flex justify-center mx-auto">
      <ul className="flex gap-2">
        <li>
          <button
            onClick={prevPages}
            className="h-10 px-5 text-gray-600 bg-white border border-gray-600 hover:bg-gray-100"
          >
            Prev
          </button>
        </li>
        {pageNumbers.map((pgNumber) => (
          <li key={pgNumber}>
            <button
              onClick={() => setCurrentPages(pgNumber)}
              className="h-10 px-5 text-gray-600 bg-white border border-gray-600 "
            >
              {pgNumber}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={nextPages}
            className="h-10 px-5 text-gray-600 bg-white border border-gray-600 hover:bg-gray-100"
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Pagination2;
