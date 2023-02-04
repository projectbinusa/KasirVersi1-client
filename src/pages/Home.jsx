import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import { getAllDataSidebar } from "../utils/controller";

function Home() {
  const [dataSidebar, setDataSidebar] = useState([]);

  useEffect(() => {
    getAllDataSidebar("all", setDataSidebar);
  }, []);

  return (
    <>
      <div id="home" className="flex flex-col h-screen">
        <div className="grid md:grid-cols-10 grid-cols-9 gap-1 bg-white rounded-3xl shadow border m-3">
          <div id="all" className="p-2 hidden md:block md:col-span-1">
            <Sidebar dataSidebar={dataSidebar} />
          </div>
          <div className="flex-1 pb-20 md:pb-0 overflow-y-auto col-span-10 sm:col-span-10 md:col-span-9">
            <Outlet />
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 md:hidden">
        <Nav dataSidebar={dataSidebar} />
      </div>
    </>
  );
}

export default Home;
