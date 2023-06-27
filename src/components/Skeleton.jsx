import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
  faTrashCan,
  faSquareMinus,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";

export const SkeletonCategory = () => {
  return (
    <div
      id="category"
      className="flex text-center space-x-3 mx-auto overflow-x-auto text-gray-400 animate-pulse"
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
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 md:grid-cols-3 gap-4 mx-auto justify-center text-center animate-pulse">
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

export const SkeletonCart = () => {
  return (
    <div>
      <h1 className="font-bold text-3xl">
        Keranjang <span className="font-thin text-gray-500">Pesanan</span>
      </h1>
      <div className="grid grid-cols-1 my-6 gap-4 cut animate-pulse">
        {[1].map((index) => (
          <div
            key={index}
            className="grid grid-cols-6 gap-4 items-center text-md"
          >
            <div className="grid justify-center col-span-2">
              <div className="h-[75px] w-[80px] rounded-[20px] mb-1 shadow-lg mx-auto bg-gray-300"></div>
            </div>
            <div className="gird grid-cols-1 gap-4">
              <div className="font-bold cut-text">
                <p className="h-4 bg-gray-300 rounded-full w-16 mb-1"></p>
              </div>
              <div className="grid grid-cols-3 text-gray-500 font-md">
                <div className="flex items-center justify-center rounded cursor-pointer">
                  <FontAwesomeIcon
                    icon={faSquareMinus}
                    className="w-5 h-5 text-gray-400  hover:text-red-400"
                  />
                </div>
                <div className="px-1">
                  <input
                    type="number"
                    id="Quantity"
                    value="0"
                    autoComplete="off"
                    className=""
                    readOnly
                    disabled
                  />
                </div>
                <div className="flex items-center justify-center rounded cursor-pointer">
                  <FontAwesomeIcon
                    icon={faSquarePlus}
                    className="w-5 h-5 ml-3 text-gray-400 hover:text-green-400"
                  />
                </div>
              </div>
            </div>
            <div className="text-end text-gray-500 font-semibold col-span-2">
              <p className="h-2 bg-gray-300 rounded-full w-32 ml-3"></p>
            </div>
            <div className="text-gray-500 flex items-center justify-center rounded cursor-pointer">
              <FontAwesomeIcon
                icon={faTrashCan}
                className="w-4 h-5 text-red-500"
              />
            </div>
          </div>
        ))}
      </div>
      <hr className="mx-6" />
      <div className="flex justify-between items-center mx-6 my-4">
        <div className="text-gray-400 font-semibold">Sub Total</div>
        <div className="font-bold animate-pulse">
          <p className="h-2 bg-gray-300 rounded-full w-36"></p>
        </div>
      </div>
    </div>
  );
};
