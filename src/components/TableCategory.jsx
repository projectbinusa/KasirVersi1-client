import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



function TableCategory({dataCategory}) {
  return (
    <tbody>
      {dataCategory.map((item) => {
        return (
          <tr className="bg-white border-b text-center" key={item.id}>
            <th
              scope="row"
              className="py-2 sm:py-3 md:py-5 px-2 font-medium text-gray-900 whitespace-nowrap"
            >
              {item.name}
            </th>
            <td className="">{item.icon}</td>
            <td className="bg-white text-center p-2 rounded-lg md:rounded-2xl">
                      <FontAwesomeIcon icon={item.icon} className="w-4 md:w-8 h-4 md:h-8 " />
                    </td>
            <td className="flex justify-center">
              <div className="p-2">

              <button
                onClick={() => {
                }}
                type="button"
                className="w-16 md:w-20 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-xs md:text-sm py-2 text-center"
              >
                Edit
              </button>
              </div>
              <div className="p-2">
              <button
                type="button"
                className="w-16 md:w-20 text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-xs md:text-sm py-2 text-center"
              >
                Delete
              </button>
              </div>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}

export default TableCategory;
