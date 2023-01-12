import React, { useEffect, useState } from "react";
import Library from "../components/Library";
import {
  getAllDataProduct,
  getAllDataCategory,
} from "../utils/controller";



function Libraryy() {
    const [dataMenu, setDataMenu] = useState([]);
    const [dataCategory, setDataCategory] = useState([]);

  useEffect(() => {
    getAllDataProduct("all", setDataMenu);
    getAllDataCategory("all", setDataCategory);
  }, []);
  return (
    <div>
        <div
        id="menu"
        className="bg-gray-50 p-2 h-screen overflow-y-auto scroll-none"
      >
        <div className="">
          <Library dataCategory={dataCategory} dataMenu={dataMenu} />
        </div>
      </div>
    </div>
  )
}

export default Libraryy