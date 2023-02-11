import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "./Card";
import AutoComplete from "./AutoComplete";
import NotFound from "../pages/NotFound";
import { Link } from "react-router-dom";

function Menu({
  dataCategory,
  dataMenu,
  setDataCart,
  productPopular,
  productTimeAdded,
}) {
  const [selectedCategory, setSelectedCategory] = useState("Food");
  const [selectedOption, setSelectedOption] = useState("Semua");

  const changeCategory = (category) => setSelectedCategory(category);

  const options = [
    {
      id: 0,
      title: "Semua",
    },
    {
      id: 1,
      title: "Populer",
    },
    {
      id: 2,
      title: "Terbaru",
    },
  ];

  return (
    <div id="menu" className="px-3 space-y-3">
      <div id="header-page">
        <div className="container md:flex flex-wrap items-center justify-between mx-auto">
          <div className="header-text">
            <h1 className="font-bold text-xl sm:text-2xl md:text-4xl">
              Aplikasi <span className="font-thin text-gray-500">Kasir </span>
            </h1>
          </div>
          <div className="header-search md:mt-0 mt-3">
            <AutoComplete data={dataMenu} setDataCart={setDataCart} />
          </div>
        </div>
      </div>
      <div
        id="category"
        className="flex text-center space-x-3 mx-auto overflow-x-auto"
      >
        {dataCategory.length !== 0 ? (
          <>
            {dataCategory.map((data, index) => {
              return (
                <div
                  className="rounded-2xl mb-5 hover:shadow-lg hover:shadow-red-300"
                  key={index}
                >
                  <div
                    className={
                      selectedCategory === `${data.name}`
                        ? "rounded-2xl  py-5 sm:py-4 lg:py-3 md:py-3 px-5 sm:px-4 md:px-3 lg:px-3 w-24 sm:w-36 md:w-56 fill-blue-500 bg-[#ffe54f] "
                        : "rounded-2xl py-5 sm:py-4 lg:py-3 md:py-3 px-5 sm:px-4 md:px-3 lg:px-3 w-24 sm:w-36 md:w-56 bg-white border hover:fill-blue-500 hover:bg-[#ffe54f]"
                    }
                    key={`tab-${index}`}
                    onClick={() => changeCategory(data.name)}
                  >
                    <div className="bg-white p-1 lg:p-3 md:p-3 rounded-2xl border">
                      <FontAwesomeIcon
                        icon={data.icon}
                        className="w-3 sm:w-5 md:w-8 h-3 sm:h-5 md:h-8 "
                      />
                    </div>
                    <div className="mt-3 lg:mt-5 md:mt-5 text-sm sm:text-sm font-semibold">
                      {data.name}
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <>
            <div className="lg:px-2 lg:py-2 md:py-20 md:px-44 px-1 py-1 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
              <div className=" xl:w-1/2 relative pb-1 h-full lg:pb-0">
                <div className="relative">
                  <div className="absolute">
                    <div className="">
                      <h1 className="my-2 text-gray-800 font-bold text-xl">
                      Belum Ada Daftar Kategori
                      </h1>
                    </div>
                    <Link to="/library" >
                    <button
                      className="sm:w-full lg:w-auto my-1 border rounded md py-3 px-6 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50"
                    >
                      Buat Kategori                    
                    </button>
                    </Link> 
                  </div>
                  <div>
                    <img src="https://i.ibb.co/G9DC8S0/404-2.png" />
                  </div>
                </div>
              </div>
             
            </div>
          </>
        )}
      </div>
      <div id="header-menu">
        <div className="container flex flex-wrap items-center justify-between mt-5">
          <div className="header-text">
            <h1 className="font-bold text-xl sm:text-2xl md:text-4xl">
              Menu <span className="font-thin text-gray-500">Pesanan</span>
            </h1>
          </div>
          <div className="header-search">
            <label htmlFor="language" className="font-thin text-gray-500 mr-2">
              Sortir dengan
            </label>
            <select
              className="font-bold border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              {options.map((o, index) => (
                <option key={index} value={o.value} className="px-10 m-10">
                  {o.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div id="menu">
        <div>
          {
            dataMenu.length !== 0 ?
            (<>
             {selectedOption === "Populer" ? (
          <div
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 md:grid-cols-3 gap-4 mx-auto justify-center text-center"
            hidden={selectedOption !== "Popular"}
          >
            {productPopular.map((data, index) => (
              <section
                hidden={selectedCategory !== data.category.name}
                key={index}
              >
                <Card data={data} setDataCart={setDataCart} />
              </section>
            ))}
          </div>
        ) : selectedOption === "Terbaru" ? (
          <div
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 md:grid-cols-3 gap-4 mx-auto justify-center text-center"
            hidden={selectedOption !== "Time Added"}
          >
            {productTimeAdded.map((data, index) => (
              <section
                hidden={selectedCategory !== data.category.name}
                key={index}
              >
                <Card data={data} setDataCart={setDataCart} />
              </section>
            ))}
          </div>
        ) : (
          <div
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 md:grid-cols-3 gap-4 mx-auto justify-center text-center"
            hidden={selectedOption !== "Semua"}
          >
            {dataMenu.map((data, index) => (
              <section
                key={`tabpanel-${index}`}
                hidden={selectedCategory !== data.category.name}
              >
                <Card data={data} setDataCart={setDataCart} />
              </section>
            ))}
          </div>
        )}</>):(<>
         <div className="lg:px-2 lg:py-2 md:py-20 md:px-44 px-1 py-1 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
              <div className="w-full h-full xl:w-1/2 relative pb-1 lg:pb-0">
                <div className="relative">
                  <div className="absolute">
                    <div className="">
                      <h1 className="my-2 text-gray-800 font-bold text-2xl">
                       Belum Ada Daftar Menu
                      </h1>
                    </div>
                    <Link to="/library" >
                    <button
                      className="sm:w-full lg:w-auto my-1 border rounded md py-3 px-6 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50"
                    >
                      Buat Menu                   
                    </button>
                    </Link> 
                  </div>
                  <div>
                    <img src="https://i.ibb.co/G9DC8S0/404-2.png" />
                  </div>
                </div>
              </div>
            </div></>)
          }
       
         </div>
      </div>
    </div>
  );
}

export default Menu;
