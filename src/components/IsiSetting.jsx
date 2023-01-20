import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_TOKO } from "../utils/baseURL";

function IsiSetting() {
  const [show, setShow] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [tokoId, setTokoId] = useState(0);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

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
    e.preventDefault()
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
  }

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

  useEffect(() => {
    getToko();
  }, []);
  return (
    <div className="m-5">
      <h1 className="font-bold text-4xl">Setting App</h1>
      <div>
        {name === undefined ? (
          <>
            <div className="py-10">
              <div className="grid grid-cols-6">
                <div className="cols col-span-3">
                  <img src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-626.jpg?w=2000" alt="angjay" />
                </div>
                <div className="cols col-span-3">
                  There is no store description yet
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button className="w-72" onClick={() => setShowAdd(true)}>CREATE</button>
            </div>
          </>
        ) : (
          <>
            <div className="py-10">
              <div className="relative block bg-slate-100 justify-center overflow-hidden rounded-lg border border-gray-100 p-8">
                <span
                  className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-red-300 via-pink-500 to-red-300"
                ></span>
                <div>
                  <div className="justify-center pb-5 sm:flex">
                    <h3 className="text-center text-gray-900">
                    <div className="text-2xl font-bold">Name Shop</div>
                    <div className="text-xl">{name}</div>
                    <hr />
                    </h3>
                  </div>
                  <div className="justify-center pb-5 sm:flex">
                    <h3 className="text-center text-gray-900">
                    <div className="text-2xl font-bold">Number Phone</div>
                    <div className="text-xl">{phoneNumber}</div>
                    <hr />
                    </h3>
                  </div>
                  <div className="justify-center pb-5 sm:flex">
                    <h3 className="text-center text-gray-900">
                    <div className="text-2xl font-bold">Addres</div>
                    <div className="text-xl">{address}</div>
                    <hr />
                    </h3>
                  </div>
                </div>
              <div className="flex justify-center">
                  <button
                    onClick={() => setShow(true)}
                    className="w-48 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-lg py-2.5 text-center "
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
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
