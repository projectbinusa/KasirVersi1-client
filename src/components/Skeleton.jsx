import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const SkeletonCategory = () => {
  return (
    <div
      id="category"
      className="flex text-center space-x-3 mx-auto overflow-x-auto text-gray-400"
    >
      {[1, 2].map((data, index) => (
        <div className="rounded-2xl mb-5" key={index}>
          <div className="rounded-2xl  py-5 sm:py-4 lg:py-3 md:py-3 px-5 sm:px-4 md:px-3 lg:px-3 w-24 sm:w-36 md:w-56 fill-blue-500 bg-[#E5E4E2] ">
            <div className="bg-white p-1 lg:p-3 md:p-3 rounded-2xl border">
              <FontAwesomeIcon
                icon="fa-circle"
                className="w-3 sm:w-5 md:w-8 h-3 sm:h-5 md:h-8 "
              />
            </div>
            <div className="mt-3 lg:mt-5 md:mt-5 text-sm sm:text-sm font-semibold">
              <div className="h-2 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const SkeletonProduct = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 md:grid-cols-3 gap-4 mx-auto justify-center text-center">
      {[1, 2, 3].map((index) => (
        <section key={index}>
          <div id="card">
            <div className="max-w-sm max-h-sm rounded overflow-hidden shadow-lg cursor-pointer">
              <div id="card-image">
                <div className="w-16 sm:w-24 lg:w-40 md:w-40 h-16 sm:h-24 lg:h-40 md:h-40 mb-3 rounded-full shadow-lg mx-auto bg-gray-300"></div>
              </div>
              <div className="px-6 py-4 text-center">
                <div className="h-2.5 bg-gray-300 rounded-full max-w-[640px] mb-2.5 mx-auto "></div>
                <p className="h-2 bg-gray-300 rounded-full w-48 mx-auto"></p>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};
