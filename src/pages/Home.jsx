import React from "react";
import Cart from "../components/Cart";
import Dashboard from "../components/Dashboard";
import Menu from "../components/Menu";
import Sidebar from "../components/Sidebar";


function Home() {
  return (
    <div
      id="home"
      className="grid grid-cols-10 gap-1 bg-white rounded-3xl shadow border m-3 min-h-screen"
    >
      <div id="home" className="p-2 col-span-1">
        <Sidebar />
      </div>
      <div id="home" className="bg-gray-50 p-2 col-span-9 h-screen overflow-y-auto scroll-none">
        {/* <Menu /> */}
        <Dashboard />
      </div>
      {/* <div id="home" className="p-2 col-span-3">
        <Cart />
      </div> */}
    </div>
  );
}

export default Home;
