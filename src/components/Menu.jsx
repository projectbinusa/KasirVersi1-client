import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "./Card";
import AutoComplete from "./AutoComplete";

function Menu({
  dataCategory,
  dataMenu,
  setDataCart,
  productPopular,
  productTimeAdded,
}) {
  const [selectedCategory, setSelectedCategory] = useState("Food");
  const [selectedOption, setSelectedOption] = useState("All Product");

  const changeCategory = (category) => setSelectedCategory(category);

  const options = [
    {
      id: 0,
      title: "All Product",
    },
    {
      id: 1,
      title: "Popular",
    },
    {
      id: 2,
      title: "Time Added",
    },
    {
      id: 4,
      title: "Alphabet",
    },
  ];

  return (
    <div id="menu" className="px-3 space-y-10">
      <div id="header-page">
        <div className="container md:flex flex-wrap items-center justify-between mx-auto">
          <div className="header-text">
            <h1 className="font-bold text-xl sm:text-2xl md:text-4xl">
              Order <span className="font-thin text-gray-500">Menu</span>
            </h1>
          </div>
          <div className="header-search md:mt-0 mt-3">
            <AutoComplete data={dataMenu} setDataCart={setDataCart}/>
          </div>
        </div>
      </div>
      <div
        id="category"
        className="flex text-center space-x-3 mx-auto overflow-x-auto"
      >
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
                  <FontAwesomeIcon icon={data.icon} className="w-3 sm:w-5 md:w-8 h-3 sm:h-5 md:h-8 " />
                </div>
                <div className="mt-3 lg:mt-5 md:mt-5 text-sm sm:text-sm font-semibold">{data.name}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div id="header-menu">
        <div className="container flex flex-wrap items-center justify-between mt-5">
          <div className="header-text">
            <h1 className="font-bold text-xl sm:text-2xl md:text-4xl">
              Order <span className="font-thin text-gray-500">Menu</span>
            </h1>
          </div>
          <div className="header-search">
            <label htmlFor="language" className="font-thin text-gray-500 mr-2">
              Sort by
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
        {selectedOption === "Popular" ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:grid-cols-3 gap-4 mx-auto justify-center text-center"
            hidden={selectedOption !== "Popular"}
          >
            {productPopular.map((data, index) => (
              <section hidden={selectedCategory !== data.category.name} key={index}>
                <Card data={data} setDataCart={setDataCart} />
              </section>
            ))}
          </div>
        ) : selectedOption === "Time Added" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:grid-cols-3 gap-4 mx-auto justify-center text-center" hidden={selectedOption !== "Time Added"}>
            {productTimeAdded.map((data, index) => (
              <section hidden={selectedCategory !== data.category.name}  key={index}>
                <Card data={data} setDataCart={setDataCart} />
              </section>
            ))}
          </div>
        ) : selectedOption === "Alphabet" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:grid-cols-3 gap-4 mx-auto justify-center text-center" hidden={selectedOption !== "Alphabet"}>
            <h1>Alphabet</h1>
          </div>
        ) : (
          <div
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 md:grid-cols-3 gap-4 mx-auto justify-center text-center"
            hidden={selectedOption !== "All Product"}
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
        )}
      </div>
    </div>
  );
}

export default Menu;
