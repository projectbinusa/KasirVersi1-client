import React, { useEffect, useState } from 'react';
import IsiDash from '../components/IsiDash';
import {
    getAllDataProduct,
  } from "../utils/controller";

function Dashboard() {
    const [dataMenu, setDataMenu] = useState([]);

    useEffect(() => {
        getAllDataProduct("all", setDataMenu);
      }, []);
    return (
        <div>
             <div
        id="menu"
        className="bg-gray-50 p-2 h-screen overflow-y-auto scroll-none"
      >
        <div className="">
          <IsiDash dataMenu={dataMenu} />
        </div>
      </div>
        </div>
    )
}

export default Dashboard
