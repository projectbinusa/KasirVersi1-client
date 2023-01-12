import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Cart from "../components/Cart";
import Dashboard from "./Dashboard";
import Menu from "../components/Menu";
import Sidebar from "../components/Sidebar";
import { getAllDataSidebar } from "../utils/controller";

function Home() {
  const [dataSidebar, setDataSidebar] = useState([]);

  useEffect(() => {
    getAllDataSidebar("all", setDataSidebar);
  }, []);
  
  return (
    <div
      id="home"
      className="grid grid-cols-10 gap-1 bg-white rounded-3xl shadow border m-3 min-h-screen"
    >
      <div id="all" className="p-2 col-span-1">
        <Sidebar dataSidebar={dataSidebar} />
      </div>
      <div className="col-span-9">
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
