import React from "react";

function TableBills({ bils, dateEvent, titik }) {
  return (
    <tbody>
      {bils.map((list, i) => (
        <tr className="bg-white border-b text-center" key={i}>
          <th
            scope="row"
            className="px-2 md:py-2 font-medium text-gray-900 whitespace-nowrap "
          >
            {list.product.name}
          </th>
          <td className="px-2 md:py-4 py-2">{list.totalProduct}</td>
          <td className="px-2 md:py-4 py-2">{list.product.category.name}</td>
          <td className="px-2 md:py-4 py-2">{titik.format(list.totalPrice)}</td>
          <td scope="row" className="px-2 md:py-4 py-2 ">{dateEvent(list.createdAt)}</td>
        </tr>
      ))}
    </tbody>
  );
}

export default TableBills;
