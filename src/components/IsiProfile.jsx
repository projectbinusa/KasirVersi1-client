import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_AUTH, API_TOKO } from "../utils/baseURL";
import { getAllDataProduct } from "../utils/controller";

function IsiSetting() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [tokoId, setTokoId] = useState(0);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const [dataMenu, setDataMenu] = useState([]);
  const [totalPesanan, setTotalPesanan] = useState(0);

  const result = dataMenu.map((x) => x.jumlahTerjual);

  const sum = result.reduce((a, b) => a + b, 0);

  
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const getToko = async () => {
    await axios
      .get(`${API_TOKO}/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setTokoId(res.data.id);
        setName(res.data.name);
        setPhoneNumber(res.data.phoneNumber);
        setAddress(res.data.address);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addToko = async (e) => {
    e.preventDefault();
    const req = {
      name: name,
      phoneNumber: phoneNumber,
      address: address,
    };

    await axios
      .post(`${API_TOKO}/add`, req, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        getToko();
        setShowAdd(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateToko = async (e) => {
    e.preventDefault();
    const req = {
      name: name,
      phoneNumber: phoneNumber,
      address: address,
    };

    await axios
      .put(`${API_TOKO}/${tokoId}`, req, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        getToko();
        setShow(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUserId = async () => {
    await axios
      .get(`${API_AUTH}/${localStorage.getItem("id")}`)
      .then((res) => {
        setTotalPesanan(res.data.totalPesanan);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getToko();
    getAllDataProduct("all", setDataMenu);
    getUserId();
    // getIcon();
  }, []);

  return (
    <div className="m-5">
      {/* <h1 className="font-bold text-4xl">Setting App</h1> */}
      <div>
        {name === undefined ? (
          <>
            <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
              <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
                <div className="relative">
                  <div className="absolute">
                    <div className="">
                      <h1 className="my-2 text-gray-800 font-bold text-2xl">
                        There is no store description yet
                      </h1>
                      <p className="my-2 text-gray-800">
                        Sorry about that! Please create a new store
                      </p>
                    </div>
                    <div className="flex w-full gap-5 justify-between">

                    <button
                      className="w-full lg:w-auto my-2 border rounded md py-4 px-4 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50"
                      onClick={() => setShowAdd(true)}
                      >
                      Create Store
                    </button>
                    <button
                      className="w-full lg:w-auto my-2 border md:hidden block rounded md py-4 px-4 text-center bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50"
                      onClick={logout}
                      >
                      Logout
                    </button>
                      </div>
                  </div>
                  <div>
                    <img src="https://i.ibb.co/G9DC8S0/404-2.png" />
                  </div>
                </div>
              </div>
              <div>
                <img src="https://i.ibb.co/ck1SGFJ/Group.png" />
              </div>
            </div>
          </>
        ) : (
          <>
            <main className="profile-page">
              <section className="relative py-14 ">
                <div className="container mx-auto px-1">
                  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg ">
                    <div className="px-6">
                      <div className="flex flex-wrap justify-center">
                        <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                          <div className="relative">
                            <img
                              alt="..."
                              src="https://t3.ftcdn.net/jpg/02/40/93/66/360_F_240936643_lbL2jWTNXDuL3qB3IP6DdrrxAErjgn4I.jpg"
                              className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                              style={{ maxWidth: "150px" }}
                            />
                          </div>
                        </div>
                        
                          <div className="w-full relative lg:w-4/12 px-4 lg:order-3 ">
                          <div className="py-6 px-3 mt-32 sm:mt-0 md:mt-0 flex justify-center">
                            <button
                              className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                              type="button"
                              style={{ transition: "all .15s ease" }}
                              onClick={() => setShow(true)}
                            >
                              Edit
                            </button>
                            </div>
                          
                        </div>
                        <div className="w-full lg:w-4/12 px-4 lg:order-1">
                          <div className="flex justify-center py-4 lg:pt-4 pt-8">
                            <div className="mr-4 p-3 text-center">
                              <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                                {sum}
                              </span>
                              <span className="text-sm text-gray-500">
                                Total Products Sold
                              </span>
                            </div>
                            <div className="mr-4 p-3 text-center">
                              <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                                {totalPesanan}
                              </span>
                              <span className="text-sm text-gray-500">
                                Order Totals
                              </span>
                            </div>
                            <div className="lg:mr-4 p-3 text-center">
                              <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                                {dataMenu.length}
                              </span>
                              <span className="text-sm text-gray-500">
                                Total Products
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-center mt-5">
                        <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-800">
                          {name}
                        </h3>
                        <div className="text-lg leading-normal mt-0 mb-2 text-gray-500 font-semibold uppercase">
                          {address}
                        </div>
                        <div className="mb-2 font-bold text-base text-gray-700 mt-10">
                          {phoneNumber}
                        </div>
                      </div>
                      <div className="mt-10 py-6 border-t border-gray-300 text-center">
                        <div className="flex justify-center">
                          <div className="w-full px-4">
                            <div onClick={logout} className="mb-2 block md:hidden">
                             <button className="w-full bg-gray-200 text-lg">
                              Log Out
                             </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </main>
          </>
        )}
      </div>

      {/* MODAL ADD TOKO */}
      {showAdd ? (
        <>
          <div className="justify-center items-center flex bg-slate-100 opacity-70 overflow-x-hidden overflow-y-auto fixed inset-0 z-40"></div>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
            <div className="relative w-full h-full max-w-2xl md:h-auto">
              <div className="relative bg-gray-50 rounded-lg shadow ">
                <div className="flex items-start justify-between p-4 border-b rounded-t ">
                  <h3 className="text-xl font-semibold text-gray-900 ">
                    Add Shop App
                  </h3>
                  <button
                    onClick={() => setShowAdd(false)}
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                    data-modal-hide="defaultModal"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <div className="p-6 space-y-6">
                  <form onSubmit={addToko}>
                    <div className="relative z-0 w-full mb-6 group">
                      <input
                        type="text"
                        className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        id="name"
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                      <label className="peer-focus:font-medium absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Shop Name
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                      <input
                        type="text"
                        className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        id="phoneNumber"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                      />
                      <label className="peer-focus:font-medium absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Phone Number
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                      <textarea
                        className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        id="address"
                        onChange={(e) => setAddress(e.target.value)}
                        required
                      />
                      <label className="peer-focus:font-medium absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Address
                      </label>
                    </div>
                    <div className="flex justify-between space-x-2 rounded-b">
                      <button
                        onClick={() => setShowAdd(false)}
                        data-modal-hide="defaultModal"
                        type="button"
                        className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                      >
                        Cancel
                      </button>
                      <button
                        data-modal-hide="defaultModal"
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      {/* MODAL EDIT */}
      {show ? (
        <>
          <div className="justify-center items-center flex bg-slate-100 opacity-70 overflow-x-hidden overflow-y-auto fixed inset-0 z-40"></div>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
            <div className="relative w-full h-full max-w-2xl md:h-auto">
              <div className="relative bg-gray-50 rounded-lg shadow ">
                <div className="flex items-start justify-between p-4 border-b rounded-t ">
                  <h3 className="text-xl font-semibold text-gray-900 ">
                    Edit Shop App
                  </h3>
                  <button
                    onClick={() => setShow(false)}
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                    data-modal-hide="defaultModal"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <div className="p-6 space-y-6">
                  <form onSubmit={updateToko}>
                    <div className="relative z-0 w-full mb-6 group">
                      <input
                        type="text"
                        className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        id="name"
                        defaultValue={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                      <label className="peer-focus:font-medium absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Shop Name
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                      <input
                        type="text"
                        className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        id="phoneNumber"
                        defaultValue={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                      />
                      <label className="peer-focus:font-medium absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Phone Number
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                      <textarea
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        id="address"
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                        required
                      />
                      <label className="peer-focus:font-medium absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Address
                      </label>
                    </div>
                    <div className="flex justify-between space-x-2 rounded-b">
                      <button
                        onClick={() => setShow(false)}
                        data-modal-hide="defaultModal"
                        type="button"
                        className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                      >
                        Cancel
                      </button>
                      <button
                        data-modal-hide="defaultModal"
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default IsiSetting;
