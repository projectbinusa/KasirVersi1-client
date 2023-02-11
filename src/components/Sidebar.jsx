import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function Sidebar({ dataSidebar, logOut }) {
  const [activeTab, setActiveTab] = useState("Home");

  const handleTab = (tab) => {
    setActiveTab(tab);
  };


  return (
    <div id="sidebar">
      <div id="nav-logo">
        <div className="container mx-auto rounded-xl p-3 m-5">
          <div role="list" className="mx-auto text-red-600">
            {dataSidebar.map((data, i) => {
              return (
                <Link to={data.name} key={i}>
                  <div className="mt-3">
                    <div
                      className={
                        activeTab === `${data.name}`
                          ? "text-[#FFFFFF] bg-[#FF2A77] shadow-red-300 rounded-2xl bottom-0 py-3"
                          : "text-gray-400 hover:fill-blue-500 hover:text-[#FFFFFF] hover:bg-[#FF2A77] hover:shadow-lg hover:shadow-red-300 rounded-2xl bottom-0 py-3"
                      }
                      onClick={() => handleTab(data.name)}
                    >
                      <div className="flex justify-center">
                        <FontAwesomeIcon
                          icon={data.icon}
                          className="w-8 h-8 text=gray-500"
                        />
                      </div>
                      <div className="mt-4 text-center text-xs">
                        {data.name}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
            <div onClick={logOut} className="mt-24">
              <div className="text-gray-400 hover:fill-blue-500  hover:text-[#FFFFFF] hover:bg-[#FF2A77] hover:shadow-lg hover:shadow-red-300 rounded-2xl bottom-0 py-3">
                <div className="flex justify-center">
                  <FontAwesomeIcon
                    icon="fa-arrow-right-from-bracket"
                    className="w-8 h-8 text=gray-500"
                  />
                </div>
                <div className="mt-4 text-center text-xs">Log Out</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
