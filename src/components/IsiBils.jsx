import moment from "moment";
import React from "react";
import { titik } from "../utils/NumberWithComa";
function IsiBils({ bils }) {
  const dateEvent = (list) => {
    moment.locale("en");
    return moment(list).format("DD-MM-YYYY");
  };
  return (
    <div className="m-5">
      <h1 className="font-bold text-4xl">Purchase History</h1>
      <div className=' p-5 bg-gray-50 col-span-9 h-screen overflow-y-auto scroll-none"'>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500 ">
            <thead class="text-xs text-gray-700 uppercase bg-gray-200 ">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Product Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Product Total
                </th>
                <th scope="col" class="px-6 py-3">
                  Category
                </th>
                <th scope="col" class="px-6 py-3">
                  Price
                </th>
                <th scope="col" class="px-6 py-3">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {bils.map((list) => (
                <tr class="bg-white border-b ">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    {list.product.name}
                  </th>
                  <td class="px-6 py-4">{list.totalProduct}</td>
                  <td class="px-6 py-4">{list.product.category.name}</td>
                  <td class="px-6 py-4">{titik(list.totalPrice)}</td>
                  <td class="px-6 py-4">{dateEvent(list.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default IsiBils;
