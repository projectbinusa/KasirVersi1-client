import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

function Nav({ dataSidebar }) {
  const activeTab = localStorage.getItem("activeTab");

  const handleTab = (tab) => {
    localStorage.setItem("activeTab", tab);
  };

  return (
    <div>
      <div className="bg-gray-50 border-gray-200 rounded">
        <div className="flex p-2 py-3 px-4 w-screen justify-between decoration-inherit">
          {dataSidebar.map((data, index) => {
            return (
              <Link to={data.name} key={index}>
                <div>
                  <div
                    className={
                      activeTab === `${data.name}`
                        ? "text-white bg-[#FF2A77] shadow-red-300 rounded-2xl bottom-0 p-3"
                        : "text-gray-400 hover:fill-blue-500 hover:text-[#FFFFFF] hover:bg-[#FF2A77] hover:shadow-lg hover:shadow-red-300 rounded-2xl bottom-0 p-3 group relative"
                    }
                    onClick={() => handleTab(data.name)}
                  >
                    <div className="flex justify-center ">
                      <FontAwesomeIcon icon={data.icon} className="w-8 h-8" />
                    </div>
                    <span className="absolute flex justify-center -translate-x-3 -top-9 rounded bg-white border border-black px-2 py-1.5 text-xs font-medium text-black opacity-0 group-hover:opacity-100">
                      {data.name}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Nav;
