import React, { useEffect, useState } from "react";
import IsiBils from "../components/IsiBils";
import { getAllHistoryOrder } from "../utils/controller";

function Bils() {
  const [bils, setBils] = useState([]);

  useEffect(() => {
    getAllHistoryOrder("time-added", setBils);
  }, [])
  return (
    <div>
      <div
        id="menu"
        className="bg-gray-50 p-2 h-screen overflow-y-auto scroll-none"
      >
        <div className="">
          <IsiBils bils={bils} />
        </div>
      </div>
    </div>
  );
}

export default Bils;
