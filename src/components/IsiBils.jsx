import moment from "moment";
import React, { useState } from "react";
import Pagination from "./Padination";
import TableBills from "./TableBills";
function IsiBils({ bils }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = bils.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(bils.length / recordsPerPage);

  const titik = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  const dateEvent = (list) => {
    moment.locale("en");
    return moment(list).format("DD-MM-YYYY");
  };
  return (
    <div className="m-5">
      <h1 className="font-bold text-xl text-center sm:text-center sm:text-2xl md:text-left md:text-4xl">Purchase History</h1>
      <div className='md:p-5 bg-gray-50 col-span-9 h-auto overflow-y-auto scroll-none"'>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-xs text-center text-gray-700 uppercase bg-gray-200 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Product Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Product Total
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
              </tr>
            </thead>
            <TableBills
              dateEvent={dateEvent}
              bils={currentRecords}
              titik={titik}
            />
          </table>
        </div>
        <div className="py-6">
          <Pagination
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}

export default IsiBils;
