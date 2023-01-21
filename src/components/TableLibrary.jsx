import React from "react";
import { titik } from "../utils/NumberWithComa";

export default function TableLibrary({dataMenu, dateEvent, setShow, getProductId, deleteProduct}) {
  return (
    <tbody>
      {dataMenu.map((item) => {
        return (
          <tr className="bg-white border-b text-center" key={item.id}>
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
            >
              {item.name}
            </th>
            <td className="px-6 py-4">{item.category.name}</td>
            <td className="px-6 py-4">{item.description}</td>
            <td className="px-6 py-4">{item.stock}</td>
            <td className="px-6 py-4">{item.jumlahTerjual}</td>
            <td className="px-6 py-4">{titik(item.price)}</td>
            <td className="px-6 py-4">{dateEvent(item.createdAt)}</td>

            <td className="px-6 py-4">
              <button
                onClick={() => {
                  setShow(true);
                  getProductId(item.id);
                }}
                type="button"
                className="w-20 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm py-2.5 text-center mr-2 mb-2 "
              >
                Edit
              </button>
              <button
                onClick={() => deleteProduct(item)}
                type="button"
                className="w-20 text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm  py-2.5 text-center mr-2 mb-2 "
              >
                Delete
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}
