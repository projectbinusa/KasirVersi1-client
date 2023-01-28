import React from "react";


function TableLibrary({dataMenu, dateEvent, setShow, getProductId, deleteProduct}) {
    const titik = new Intl.NumberFormat("id-ID", {style:"currency", currency:"IDR"});

  return (
    <tbody>
      {dataMenu.map((item) => {
        return (
          <tr className="bg-white border-b text-center" key={item.id}>
            <th
              scope="row"
              className="py-2 sm:py-3 md:py-5 px-2 font-medium text-gray-900 whitespace-nowrap "
            >
              {item.name}
            </th>
            <td className="">{item.category.name}</td>
            <td className="">{item.description}</td>
            <td className="">{item.stock}</td>
            <td className="">{item.jumlahTerjual}</td>
            <td className=""> {titik.format(item.price)}</td>
            <td className="">{dateEvent(item.createdAt)}</td>
            <td className="flex justify-center">
              <div className="p-1">
              <button
                onClick={() => {
                  setShow(true);
                  getProductId(item.id);
                }}
                type="button"
                className="w-16 md:w-20 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-xs md:text-sm py-2 text-center"
              >
                Edit
              </button>
              </div>
              <div className="p-1">
              <button
                onClick={() => deleteProduct(item)}
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

export default TableLibrary;
