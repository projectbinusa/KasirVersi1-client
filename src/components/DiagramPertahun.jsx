import React from "react";
import { Bar } from "react-chartjs-2";

function Pertahun({ chartData }) {
  return (
    <div className='border p-4 md:p-10 justify-between rounded-lg bg-white hover:shadow-xl text-black hover:text-gray-500'>
    <div className=''>
      <p className='text-sm text-center font-gray-900 border-b-2 border-gray-700 uppercase'>
        Grafik of products sold Of Year
      </p>
    </div>
    <div className='border p-2 rounded-lg'>
      <Bar style={{width: "50vh", height:"1200px"}} data={chartData} />
    </div>
  </div>);
}

export default Pertahun;
