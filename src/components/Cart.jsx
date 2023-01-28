import React, { useEffect, useRef, useState } from "react";
import {
  faTrashCan,
  faSquareMinus,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../assets/Cart.css";
import { API_CART, API_HISTORY, API_TOKO } from "../utils/baseURL";
import axios from "axios";
import { getAllDataCart } from "../utils/controller";
import jsPDF from "jspdf";
import moment from "moment";

function Cart({ dataCart, setDataCart }) {
  const [show, setShow] = useState(false);
  const [modal, setModal] = useState(false);
  const [cash, setCash] = useState(0);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const reportTemplateRef = useRef(null);

  const titik = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  const pay = () => {
    setCash();
  };
  const increment = async (carts) => {
    if (carts.quantity === carts.product.stock) {
      await axios
        .get(`${API_CART}/list`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(() => {
          const req = {
            quantity: carts.product.stock,
          };
          axios
            .put(`${API_CART}/update/${carts.id}`, req, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            })
            .then(() => {
              getAllDataCart("list", setDataCart);
            })
            .catch((err) => {
              console.log(err);
            });
        });
    } else {
      await axios
        .get(`${API_CART}/list`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(() => {
          const req = {
            quantity: carts.quantity + 1,
          };
          axios
            .put(`${API_CART}/update/${carts.id}`, req, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            })
            .then(() => {
              getAllDataCart("list", setDataCart);
            })
            .catch((err) => {
              console.log(err);
            });
        });
    }
  };

  const decrement = async (carts) => {
    if (carts.quantity === 1) {
      await axios
        .get(`${API_CART}/list`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(() => {
          const req = {
            quantity: 1,
          };
          axios
            .put(`${API_CART}/update/${carts.id}`, req, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            })
            .then(() => {
              getAllDataCart("list", setDataCart);
            })
            .catch((err) => {
              console.log(err);
            });
        });
    } else {
      await axios
        .get(`${API_CART}/list`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(() => {
          const req = {
            quantity: carts.quantity - 1,
          };
          axios
            .put(`${API_CART}/update/${carts.id}`, req, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            })
            .then(() => {
              getAllDataCart("list", setDataCart);
            })
            .catch((err) => {
              console.log(err);
            });
        });
    }
  };

  const deleteCart = async (carts) => {
    await axios
      .get(`${API_CART}/list`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        axios
          .delete(`${API_CART}/delete/${carts.id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then(() => {
            getAllDataCart("list", setDataCart);
          })
          .catch((err) => {
            console.log(err);
          });
      });
  };

  const getToko = async () => {
    await axios
      .get(`${API_TOKO}/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setName(res.data.name);
        setPhoneNumber(res.data.phoneNumber);
        setAddress(res.data.address);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const checkout = async (e) => {
    e.preventDefault();
    const req = dataCart.cartItem.map((carts) => ({
      product: {
        id: carts.product.id,
      },
      user: {
        id: localStorage.getItem("id"),
      },
      totalPrice: carts.product.price * carts.quantity,
      totalProduct: carts.quantity,
    }));
    const doc = new jsPDF({
      format: "a4",
      unit: "px",
    });
    // Adding the fonts.
    doc.setFont("Inter-Regular", "normal");

    doc.html(reportTemplateRef.current, {
      async callback(doc) {
        await doc.save("struk");
      },
    });
    await axios
      .post(`${API_HISTORY}/add`, req, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        axios
          .delete(`${API_CART}/delete`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then(() => {
            getAllDataCart("list", setDataCart);
            setModal(false);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getToko();
  }, []);
  return (
    <div id="cart">
      <div id="nav-logo">
        <div className="container mx-auto h-screen grid grid-cols-1 justify-between p-4">
          <div>
            <h1 className="font-bold text-3xl">
              Order <span className="font-thin text-gray-500">Menu</span>
            </h1>
            <div className="grid grid-cols-1 my-6 gap-4 cut">
              {dataCart.cartItem.map((carts) => (
                <div
                  key={carts.id}
                  className="grid grid-cols-6 gap-4 items-center text-md"
                >
                  <div className="grid justify-center col-span-2">
                    <img
                      src={carts.product.image}
                      alt="product"
                      className="h-[75px] w-[80px] rounded-[20px]"
                    />
                  </div>
                  <div className="gird grid-cols-1 gap-4">
                    <div className="font-bold cut-text">
                      {carts.product.name}
                    </div>
                    <div className="grid grid-cols-3 text-gray-500 font-md">
                      <div className="flex items-center justify-center rounded cursor-pointer">
                        <FontAwesomeIcon
                          onClick={() => decrement(carts)}
                          icon={faSquareMinus}
                          className="w-5 h-5 text-gray-400  hover:text-red-400"
                        />
                      </div>
                      <div className="">
                        <input
                          type="number"
                          id="Quantity"
                          defaultValue={carts.quantity}
                          autoComplete="off"
                          className="w-[30px] ml-2"
                          readOnly
                          disabled
                        />
                      </div>
                      <div className="flex items-center justify-center rounded cursor-pointer">
                        <FontAwesomeIcon
                          onClick={() => increment(carts)}
                          icon={faSquarePlus}
                          className="w-5 h-5 ml-3 text-gray-400 hover:text-green-400"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-end text-gray-500 font-semibold col-span-2">
                    {titik.format(carts.product.price * carts.quantity)}
                  </div>
                  <div className="text-gray-500 flex items-center justify-center rounded cursor-pointer">
                    <FontAwesomeIcon
                      onClick={() => deleteCart(carts)}
                      icon={faTrashCan}
                      className="w-4 h-5 text-red-500"
                    />
                  </div>
                </div>
              ))}
            </div>
            <hr className="mx-6" />
            <div className="flex justify-between items-center mx-6 my-4">
              <div className="text-gray-400 font-semibold">Sub Total</div>
              <div className="font-bold">
                {" "}
                {titik.format(dataCart.totalPrice)}
              </div>
            </div>
          </div>
          <div className="flex items-end mx-6">
            {dataCart.quantity === 0 ? (
              <button
                disabled
                className="h-[h-35] sm:h-[h-40] md:h-[60px] w-full cursor-not-allowed rounded-2xl font-bold bg-[#FF2A77] text-white shadow-lg shadow-red-300"
              >
                ORDER NOW
              </button>
            ) : (
              <button
                onClick={() => setShow(true)}
                className="h-[60px] w-full rounded-2xl font-bold bg-[#FF2A77] text-white shadow-lg shadow-red-300"
              >
                ORDER NOW
              </button>
            )}
          </div>
        </div>
      </div>
      {show ? (
        <>
          <div className="justify-center items-center flex bg-slate-100 opacity-70 overflow-x-hidden overflow-y-auto fixed inset-0 z-40"></div>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
            <div className="relative w-full h-full max-w-2xl md:h-auto">
              <div className="relative bg-gray-50 rounded-lg shadow ">
                <div className="flex items-start justify-between p-4 border-b rounded-t ">
                  <h3 className="text-xl font-semibold text-gray-900 ">Bill</h3>
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
                  <div className="text-xl py-5 ">
                    Order List
                    {dataCart.cartItem.map((carts) => (
                      <div
                        key={carts.id}
                        className="flex justify-between text-lg mt-3"
                      >
                        <div>
                          {carts.product.name}{" "}
                          <span className="text-lg text-gray-500">
                            x{carts.quantity}
                          </span>
                        </div>
                        <div>
                          {" "}
                          {titik.format(carts.product.price * carts.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex border-t border-black justify-between text-xl py-2">
                    <div className="text-xl py-5 ">Total Pay</div>
                    <div className="text-xl py-5 ">
                      {titik.format(dataCart.totalPrice)}
                    </div>
                  </div>
                  <form onSubmit={pay}>
                    <div className="relative z-0 w-full mb-6 group">
                      <input
                        type="number"
                        className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        id="cash"
                        onChange={(e) => setCash(e.target.value)}
                        required
                      />
                      <label className="peer-focus:font-medium absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Customer Money
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
                      {cash < dataCart.totalPrice ? (
                        <>
                          <button
                            data-modal-hide="defaultModal"
                            type="submit"
                            disabled
                            className="text-white cursor-not-allowed bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            Next
                          </button>
                        </>
                      ) : (
                        <>
                          {" "}
                          <button
                            data-modal-hide="defaultModal"
                            type="submit"
                            onClick={() => {
                              setModal(true);
                              setShow(false);
                            }}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            Next
                          </button>
                        </>
                      )}
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
      {modal ? (
        <>
          <div className="justify-center items-center flex bg-slate-100 opacity-70 overflow-x-hidden overflow-y-auto fixed inset-0 z-40"></div>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
            <div className="relative w-[450px] h-full max-w-lg md:h-auto">
              <div
                ref={reportTemplateRef}
                className="relative bg-white rounded-lg shadow "
              >
                <div className="items-start justify-center p-4 rounded-t ">
                  <h3 className="text-xl text-center font-semibold text-gray-900 ">
                    {name}
                  </h3>
                  <h3 className="text-md text-center text-gray-900 ">
                    Telp (024) 3561560
                  </h3>
                  <h3 className="text-md text-center text-gray-900 ">
                    HP / WA : {phoneNumber}
                  </h3>
                  <h3 className="text-md text-center text-gray-900 ">
                    {address}
                  </h3>
                  <h3 className="text-md text-center text-gray-900 ">
                    NPWP: 03.220.355.6-508.000
                  </h3>
                  <h3 className="text-md text-center text-gray-900 ">
                    BARANG KENA PAJAK SUDAH TERMASUK PPM
                  </h3>
                  <h3 className="text-md text-center text-gray-900 ">
                    12006.58552/ADE/Tunai/UMUM/ASLI
                  </h3>
                </div>
                <div className="">
                  <hr className="border border-black border-dashed mx-4" />
                  {/* <div className="grid mx-2 my-2 grid-cols-2"> */}
                  <table className="text-sm text-left">
                    <tbody>
                      {dataCart.cartItem.map((carts) => (
                        <tr key={carts.id} className="bg-white">
                          <td className="px-6 py-4">x{carts.quantity}</td>
                          <th
                            scope="row"
                            className="font-medium text-black"
                          >
                            {carts.product.name}
                          </th>
                          <div className="">
                            <td className="px-6 py-4">
                              {titik.format(carts.product.price)}
                            </td>
                            <td className="px-6 py-4 text-right">
                              {titik.format(
                                carts.product.price * carts.quantity
                              )}
                            </td>
                          </div>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {/* </div> */}
                </div>
                <div className="">
                  {/* <hr className="border border-black border-dashed w-56 left mx-2 right-0 " /> */}
                  <div className="flex justify-end mr-4">
                    <div className="py-2 w-[210px] border-t border-black border-dashed">
                      <div className="pr-3 flex justify-end">
                        <div className="w-[200px] flex justify-between">
                          <div>Total</div>
                          <div>:</div>
                          <div> {titik.format(dataCart.totalPrice)}</div>
                        </div>
                      </div>
                      <div className="pr-3 my-4 flex justify-end">
                        <div className="w-[200px] flex justify-between">
                          <div>Cash</div>
                          <div>:</div>
                          <div> {titik.format(cash)}</div>
                        </div>
                      </div>
                      <div className="pr-3 mt-4 flex justify-end">
                        <div className="w-[200px] flex justify-between">
                          <div>Change</div>
                          <div>:</div>
                          <div> {titik.format(cash - dataCart.totalPrice)}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end"></div>
                </div>
                <hr className="mx-4 " />
                <div className="font-bold text-center pt-2">
                  THANK YOU. HAPPY SHOPPING
                </div>
                <div className="font-bold text-center pb-2">
                  ==== ABANG TUKANG BAKSO ====
                </div>
                <div className="text-center">
                  {phoneNumber} / {phoneNumber}
                </div>
                <div className="text-center">
                  Email: abangbakso@gmail.com
                </div>
                <div className="text-center">
                  Buy Your Bakso Online
                </div>
                <div className="text-center">
                  -------- {moment().format("L")}, {moment().format("LT")} --------
                </div>
              </div>
              <div className="border-b border-dashed"></div>
              <div className="mt-4">
                <div className="flex justify-between space-x-2 rounded-b">
                  <button
                    onClick={() => {
                      setModal(false);
                      setShow(true);
                    }}
                    data-modal-hide="defaultModal"
                    type="button"
                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  >
                    Back
                  </button>
                  <button
                    onClick={checkout}
                    data-modal-hide="defaultModal"
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    cetak struk
                  </button>
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

export default Cart;
