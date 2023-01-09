import React from "react";

function Menu() {
  return (
    <div id="menu">
      <div id="nav-logo">
        <div className="px-2">
          <div className="container flex flex-wrap items-center justify-between mx-auto">
            <div className="border">
              <h1 className="font-bold text-4xl">
                Order <span className="font-thin text-gray-500">Menu</span>
              </h1>
            </div>
            <div className="border">
            <input
                className="p-2 w-96 rounded-xl border"
                type="text"
                id="search"
                placeholder="Search for food, coffe, etc..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
