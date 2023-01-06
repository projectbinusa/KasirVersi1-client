import React from "react";
import {
  faStore,
  faChartPie,
  faComment,
  faFileInvoice,
  faGear,
  faArrowRightFromBracket
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Sidebar() {
   const datas = [
    {
      id: 1,
      title: "Home",
      icon: faStore,
    },
    {
      id: 2,
      title: "Dashboard",
      icon: faChartPie
    },
    {
      id: 3,
      title: "Message",
      icon: faComment
    },
    {
      id: 4,
      title: "Bills",
      icon: faFileInvoice
    },
    {
      id: 5,
      title: "Setting",
      icon: faGear
    },
    {
      id: 6,
      title: "Log out",
      icon: faArrowRightFromBracket
    }
  ];
  console.log(datas.length);
  const len = datas.length;

  return (
    <div id="sidebar">
      <div id="nav-logo">
        <div className="container mx-auto rounded-xl p-3 m-5">
          <div className='mx-auto text-red-600'>
            {datas.map((data, i) => {
              return (
                <div>
                  {len === i + 1 ? (
                    <>
                    <div className='rounded-2xl mt-28 py-3 text-gray-400 hover:fill-blue-500 hover:text-[#FFFFFF] hover:bg-[#FF2A77] hover:shadow-lg hover:shadow-red-300'>
                      <div className='flex justify-center'>
                      <FontAwesomeIcon
                            icon={data.icon}
                            className="w-8 h-8 text=gray-500" />
                      </div>
                      <div className='mt-4 text-center text-xs'>{data.title}</div>
                    </div>
                    </>
                  ) : (<>
                    <div className='rounded-2xl py-3 px-2 text-gray-400 hover:fill-blue-500 hover:text-[#ffffff] hover:bg-[#FF2A77] hover:shadow-lg hover:shadow-red-300'>
                      <div className='flex justify-center'>
                      <FontAwesomeIcon
                            icon={data.icon}
                            className="w-8 h-8 text=gray-500" />
                      </div>
                      <div className='mt-4 text-center text-xs'>{data.title}</div>
                    </div>
                  </>)
                  }
                </div>
              )
            })}
          </div>
          </div>
        </div>
      
    </div>
  );
}

export default Sidebar;
