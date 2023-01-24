import axios from "axios";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { API_AUTH, API_PRODUCT } from "../utils/baseURL";

function IsiDash({ dataMenu, sum }) {
  const [totalPesanan, setTotalPesanan] = useState(0);
  const [product, setProduct] = useState([]);
  const [presentase, setPresentase] = useState({
    options: {
      labels: [],
      colors: [
        "#00ff00",
        "#b50595",
        "#9c9c9c",
        "#ff1500",
        "#0015ff",
        "#fffb03",
        "#000000",
        "#F44336",
        "#FF2A77",
        "#06c931",
        "lightblue",
      ],
    },
    series: [],
  });

  const [grafik, setGrafik] = useState({
    series: [
      {
        name: "pesanan",
        data: [49, 41, 44, 51, 49, 52, 59, 71, 66],
      },
    ],
    options: {
      chart: {
        type: "line",
        zoom: {
          enabled: false,
        },
      },

      stroke: {
        curve: "straight",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
        ],
      },
    },
  });

  const [pelanggan, setPelangga] = useState({
    series: [
      {
        name: "Pelanggan",
        data: [51, 34, 44, 37, 30, 33, 40, 42, 34, 30, 36, 49],
      },
    ],
    options: {
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: "top", // top, center, bottom
          },
        },
      },
      dataLabels: {
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"],
        },
      },

      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        position: "bottom",
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
    },
  });

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

  const getAllProduct = async () => {
    const result = product.map((x) => x.name);
    const ress = product.map((x) => x.jumlahTerjual);
    await axios
      .get(`${API_PRODUCT}/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setProduct(res.data);
        setPresentase((prev) => ({
          ...prev,
          options: {
            labels: result,
          },
          series: ress
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllProduct();
    getUserId();
  }, []);

  return (
      <div className="m-5" >
        <div>
          <div className="font-bold text-4xl">
            <p>Dashboard</p>
          </div>
        </div>
        <div className="py-7">
          <div className="flex w-full justify-around gap-3">
            <div className="rounded-lg p-5 w-full border bg-white hover:shadow-xl text-black hover:text-gray-500">
              <div className="py-5 text-center">
                <p className="pb-2.5 text-lg">Total Products Sold</p>
                <p className="font-bold text-center">{sum} Products</p>
              </div>
            </div>
            <div className="rounded-lg p-5 w-full border bg-white hover:shadow-xl text-black hover:text-gray-500">
              <div className="py-5 text-center">
                <p className="text-lg  ">Order Totals</p>
                <p className="font-bold text-center">{totalPesanan} Products</p>
              </div>
            </div>
            <div className="rounded-lg p-5 w-full border bg-white hover:shadow-xl text-black hover:text-gray-500">
              <div className="py-5 text-center">
                <p className="text-lg  ">Total Products</p>
                <p className="font-bold text-center">
                  {dataMenu.length} Products
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <article className="my-5 border flex bg-white transition hover:shadow-xl">
              <div className="flex flex-1 flex-col justify-between">
                <div className="border-l border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
                  <a href="#">
                    <h3 className="font-bold uppercase text-gray-900">
                      PRESENTATION OF TOTAL PRODUCT Sold
                    </h3>
                  </a>
                  <ol className="mt-2 text-sm text-gray-700">
                    {dataMenu.map((list) => (
                      <li key={list.id}>
                        {list.name} = {list.jumlahTerjual}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
              <div className="hidden sm:block sm:basis-56">
                <div className="py-5 flex justify-center">
                  <Chart
                    options={presentase.options}
                    series={presentase.series}
                    type="pie"
                    width={400}
                  />
                </div>
              </div>
            </article>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <article className="my-5 border bg-white transition hover:shadow-xl">
                <h3 className="mt-3 ml-6 font-bold uppercase text-gray-900">
                  total orders per day
                </h3>
                <div className="">
                  <div className="py-10 flex justify-center">
                    <Chart
                      options={grafik.options}
                      series={grafik.series}
                      type="line"
                      width="547"
                    />
                  </div>
                </div>
              </article>
            </div>
            <div>
              <article className="my-5 border bg-white transition hover:shadow-xl">
                <h3 className="mt-3 ml-6 font-bold uppercase text-gray-900">
                  total customer per day
                </h3>
                <div className="py-10 flex justify-center">
                  <Chart
                    options={pelanggan.options}
                    series={pelanggan.series}
                    type="bar"
                    className="w-auto h-auto"
                    width="547"
                  />
                </div>
              </article>
            </div>
          </div>
          <div></div>
        </div>
      </div>
  );
}

export default IsiDash;
