import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "./Card";

function Menu({ dataCategory, dataMenu, setDataCart }) {
  const [selectedCategory, setSelectedCategory] = useState("Food");

  const changeCategory = (category) => setSelectedCategory(category);


  return (
    <div id="menu" className="px-3 space-y-10">
      <div id="header-page">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <div className="header-text">
            <h1 className="font-bold text-4xl">
              Order <span className="font-thin text-gray-500">Menu</span>
            </h1>
          </div>
          <div className="header-search">
            <input
              className="p-2 w-96 rounded-xl border"
              type="text"
              id="search"
              placeholder="Search for food, coffe, etc..."
            />
          </div>
        </div>
      </div>
      <div
        id="category"
        className="flex flex-wrap text-center space-x-3 justify-center mx-auto"
      >
        {dataCategory.map((data, index) => {
          return (
            <div
              className="rounded-2xl py-3 px-3 w-56 bg-white border hover:fill-blue-500 hover:bg-[#ffe54f] hover:shadow-lg hover:shadow-red-300 active:bg-yellow-500"
              key={`tab-${index}`}
              onClick={() => changeCategory(data.name)}
            >
              <div className="bg-white p-3 rounded-2xl border">
                <FontAwesomeIcon icon={data.icon} className="w-8 h-8 " />
              </div>
              <div className="mt-5 text-xs">{data.name}</div>
            </div>
          );
        })}
      </div>
      <div id="header-menu">
        <div className="container flex flex-wrap items-center justify-between mt-5">
          <div className="header-text">
            <h1 className="font-bold text-4xl">
              Order <span className="font-thin text-gray-500">Menu</span>
            </h1>
          </div>
          <div className="header-search">
            <label htmlFor="language" className="font-thin text-gray-500 mr-2">
              Sort by
            </label>
            <select
              name="language"
              id="language"
              className="font-bold border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1"
            >
              <option value="popular" className="px-10 m-10">
                Popular
              </option>
              <option value="timeAdded">Time Added</option>
              <option value="alphabet">Alphabet</option>
            </select>
          </div>
        </div>
      </div>
      <div id="menu">
        <div className="grid grid-cols-3 gap-4 mx-auto justify-center text-center">
          {dataMenu.map((data, index) => (
            <section
              key={`tabpanel-${index}`}
              hidden={selectedCategory !== data.category.name}
            >
              <Card key={index} data={data} setDataCart={setDataCart} />
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Menu;
