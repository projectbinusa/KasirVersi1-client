import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Sidebar({dataSidebar}) {
  return (
    <div id="sidebar">
      <div id="nav-logo">
        <div className="container mx-auto rounded-xl p-3 m-5">
          <div role="list" className="mx-auto text-red-600">
            {dataSidebar.map((data, i) => {
              return (
                <div key={i} className="rounded-2xl last:mt-56 bottom-0  py-3 text-gray-400 hover:fill-blue-500 hover:text-[#FFFFFF] hover:bg-[#FF2A77] hover:shadow-lg hover:shadow-red-300">
                  <div className="flex justify-center">
                    <FontAwesomeIcon
                      icon={data.icon}
                      className="w-8 h-8 text=gray-500"
                    />
                  </div>
                  <div className="mt-4 text-center text-xs">{data.title}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
