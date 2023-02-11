import React, { useEffect } from "react";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../actions/auth";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import { clearMessage } from "../actions/message";

function Home() {
  const dispatch = useDispatch();

  let location = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
    if (["/login", "/register"].includes(location.pathname)) {
      dispatch(clearMessage());
    }
  }, [dispatch, location]);

  const logOut = useCallback(() => {
    dispatch(logout());
    navigate("/login");
  }, [dispatch]);

  const dataSidebar = [
    {
      id: 1,
      name: "Home",
      icon: "fa-store"
    },
    {
      id: 2,
      name: "Dashboard",
      icon: "fa-chart-pie"
    },
    {
      id: 3,
      name: "Library",
      icon: "fa-book"
    },
    {
      id: 4,
      name: "Bills",
      icon: "fa-file-invoice"
    },
    {
      id: 5,
      name: "Profile",
      icon: "fa-user"
    }
  ]

  return (
    <>
      <div id="home" className="flex flex-col h-screen">
        <div className="grid md:grid-cols-10 grid-cols-9 gap-1 bg-white rounded-3xl shadow border m-3">
          <div id="all" className="p-2 hidden md:block md:col-span-1">
            <Sidebar dataSidebar={dataSidebar} logOut={logOut}/>
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
