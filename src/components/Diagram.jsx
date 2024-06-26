import axios from 'axios';
import React, { useState, useEffect } from 'react'
import Pertahun from './DiagramPertahun';
import Perbulan from './DiagramPerbulan';
import Perhari from './DiagramPerhari';
import { API_AUTH } from "../utils/baseURL";
import { getAllDataProduct } from "../utils/controller";
import Totalterjual from './DiagramTerjual';
import { getMonthName } from '../utils/format';

function Chart({ dataMenus, dataHistory, sum }) {
  const [totalPesanan, setTotalPesanan] = useState(0);
  const [itemTerjual, setItemTerjual] = useState([]);

  const getUserId = async () => {
    await axios
      .get(`${API_AUTH}/${localStorage.getItem("id")}`)
      .then((res) => {
        setTotalPesanan(res.data.totalPesanan);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const dataJumlahTerjual = {
    labels: dataMenus.map((data) => data.name),
    datasets: [
      {
        data: dataMenus.map(x => x.jumlahTerjual),
        backgroundColor: [
          "#FA0559", //bakso komplit
          "#CD4545", //bakso kosongan
          "#0A043C", //mie ayam
          "#F4F787", //es teh
          "#890596", //teh anget
          "#194769", //es jeruk
          "#FF8303", //jeruk anget
          "#4B2C34", //kerupuk terung
        ],
      },
    ],
  };

  const now = new Date();
  const hari = [];
  const valuesHari = [];
  for (let i = now.getDate() - 5; i <= now.getDate(); i++) {
    valuesHari.push(dataHistory.filter((x) => x.createdDay === i).length);
    hari.push(i);
  }

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

  const bulan = [];
  const valuesBulan = [];
  for (let i = 0; i <= now.getMonth(); i++) {
    valuesBulan.push(dataHistory.filter((x) => x.createdMonth === i).length);
    bulan.push(i);
  }
  
  const tahun = [];
  const valuesTahun = [];
  for (let i = now.getFullYear() - 3; i <= now.getFullYear(); i++) {
    valuesTahun.push(dataHistory.filter((x) => x.createdYear === i).length);
    tahun.push(i);
  }

  const result = dataHistory.map((x) => x.createdMonth);

  const perHari = {
    labels: hari,
    datasets: [
      {
        label:['product'],
        data: valuesHari,
        backgroundColor: [
          "#480032",
          "#CF0A0A",
          "#DC5F00",
          "#EEEEEE",
          "#FFDE00",
          "#1746A2"
        ],
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  const perBulan = {
    labels: monthNames,
    datasets: [
      {
        label:['product'],
        data: valuesBulan,
        backgroundColor: [
          "#CF0A0A",
          "#E8F9FD",
          "#59CE8F",
          "#000000",
          "#C70A80",
          "#D8D9CF",
          "#EF5B0C",
          "#F1DDBF",
          "#A1B57D",
          "#7900FF",
          "#B000B9",
          "#3A6351",

        ],
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  const perTahun = {
    labels: tahun,
    datasets: [
      {
        label:['product'],
        data: valuesTahun,
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    getUserId();
    getAllDataProduct("all", setItemTerjual);
  }, []);

  return (
    <div>
      <div className="m-5" >
        <div>
          <div className="font-bold text-4xl text-center md:text-left">
            <p>Dashboard</p>
          </div>
        </div>
        <div className="pt-7">
          <div className="grid grid-cols-1 w-full gap-3 md:grid-cols-3">
            <div className="rounded-lg p-5 w-full border bg-white hover:shadow-xl text-black hover:text-gray-500">
              <div className="py-5 text-center">
                <p className="pb-2.5 text-xl">Total Products Sold</p>
                <p className="font-bold text-lg text-center">{sum} Products</p>
              </div>
            </div>
            <div className="rounded-lg p-5 w-full border bg-white hover:shadow-xl text-black hover:text-gray-500">
              <div className="py-5 text-center">
                <p className="text-xl">Order Totals</p>
                <p className="font-bold text-lg text-center">{totalPesanan} Ordered</p>
              </div>
            </div>
            <div className="rounded-lg p-5 w-full border bg-white hover:shadow-xl text-black hover:text-gray-500">
              <div className="py-5 text-center">
                <p className="text-xl">Total Products</p>
                <p className="font-bold text-lg text-center">
                  {dataMenus.length} Products
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-4">
          <div>
            <Totalterjual chartData={dataJumlahTerjual} itemTerjual={itemTerjual} />
          </div>
          <div className='py-3 grid grid-cols-1 gap-2 sm:grid-cols-1 md:grid-cols-3'>
            <div>
              <Perhari chartData={perHari} />
            </div>
            <div>
              <Perbulan chartData={perBulan} />
            </div>
            <div>
              <Pertahun chartData={perTahun} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chart