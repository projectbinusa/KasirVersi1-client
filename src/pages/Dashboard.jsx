import React, { useEffect, useState } from "react";
import Diagram from "../components/Diagram";
import { getAllDataProduct, getAllHistoryOrder } from "../utils/controller";

function Dashboard() {
  const [dataMenus, setDataMenus] = useState([]);
  const [dataHistory, setDataHistory] = useState([]);

  const result = dataMenus.map((x) => x.jumlahTerjual);

  const sum = result.reduce((a, b) => a + b, 0);

  useEffect(() => {
    getAllDataProduct("all", setDataMenus);
    getAllHistoryOrder("list", setDataHistory);
  }, []);
  return (
    <div>
      <div
        id="menu"
        className="bg-gray-50 p-2 h-screen overflow-y-auto scroll-none">
      <div>
        <Diagram dataMenus={dataMenus} setDataMenus={setDataMenus} 
        dataHistory={dataHistory} sum={sum} />
      </div>
      </div>
    </div>
  );
}

export default Dashboard;
