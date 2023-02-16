import React from "react";
import { Link } from "react-router-dom";

function AlertCheckout() {
  return (
    <div>
      <div className="flex mt-11 relative ">
        <div className=" w-96 m-auto text-center">
          <p className="text-3xl font-bold ">Checkout Berhasil</p>
          <img
            src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDk1NTZhYjc2NDA4YjA1ZWQ2NzM2NTRkZGMxYjFmYzNkYmQzNGExMyZjdD1n/FAEEL82CUc1JPBas1V/giphy.gif"
            alt=""
          />
          <p className="text-2xl text-gray-500 font-bold">
            Pesanan Anda Siap Diantar
          </p>
          <p className="text-xl text-gray-500 font-bold">Silahkan Ditunggu</p>
          <Link to="/home">
          <button className="px-6 py-3 mt-5 text-lg text-white  bg-[#FF2A77] hover:bg-[#db145d] focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-center">
            Kembali Ke Home
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AlertCheckout;
