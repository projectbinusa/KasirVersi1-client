import React, { useEffect, useState } from "react";
import Cart from "../components/Cart";
import Menu from "../components/Menu";
import Sidebar from "../components/Sidebar";
import { getAllData } from "../utils/controller";

function Home() {
  const [dataSidebar, setDataSidebar] = useState([]);
  const [dataMenu, setDataMenu] = useState([]);
  const [dataCart, setDataCart] = useState([]);
  const [dataCategory, setDataCategory] = useState([]);

  useEffect(() => {
    getAllData("sidebar", setDataSidebar);
    getAllData("list", setDataMenu);
    getAllData("category", setDataCategory);
    getAllData("cart", setDataCart);
  }, []);

  return (
    <div
      id="home"
      className="grid grid-cols-10 gap-1 bg-white rounded-3xl shadow border m-3 min-h-screen"
    >
      <div id="sidebar" className="p-2 col-span-1">
        <Sidebar dataSidebar={dataSidebar}/>
      </div>
      <div
        id="menu"
        className="bg-gray-50 p-2 col-span-6 h-screen overflow-y-auto scroll-none"
      >
        <Menu dataCategory={dataCategory} dataMenu={dataMenu} />
      </div>
      <div id="cart" className="p-2 col-span-3">
        <Cart dataCart={dataCart}/>
      </div>
    </div>
  );
}

export default Home;
