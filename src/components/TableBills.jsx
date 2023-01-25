import React from "react";

function TableBills({ bils, dateEvent, titik }) {
  return (
    <tbody>
      {bils.map((list, i) => (
        <tr className="bg-white border-b " key={i}>
          <th
            scope="row"
            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
          >
            {list.product.name}
          </th>
          <td className="px-6 py-4">{list.totalProduct}</td>
          <td className="px-6 py-4">{list.product.category.name}</td>
          <td className="px-6 py-4">{titik.format(list.totalPrice)}</td>
          <td className="px-6 py-4">{dateEvent(list.createdAt)}</td>
        </tr>
      ))}
    </tbody>
  );
}

export default TableBills;
