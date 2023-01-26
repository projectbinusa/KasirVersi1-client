import React from "react";
import { Doughnut } from "react-chartjs-2";


function Totalterjual({ chartData, itemTerjual }) {

  return (
    <div>
      <div className='md:flex row-auto border p-3 md:p-5 justify-between rounded-lg w-full bg-white hover:shadow-xl text-black hover:text-gray-500'>
            <div className=''>
              <p className='text-sm md:text-lg font-gray-900 border-b-2 border-gray-700 uppercase'>
                percentage of products sold
              </p>
              <ol className="pt-10 text-sm text-gray-700">
                {itemTerjual.map((list) => (
                  <li className='text-sm md:text-lg' key={list.id}>
                    {list.name} = {list.jumlahTerjual}
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <Doughnut style={{width: "50vh"}} data={chartData} />
            </div>
          </div>
    </div>
  );
}

export default Totalterjual;