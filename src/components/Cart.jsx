import React, { useState } from "react";
import {
  faTrashCan,
  faSquareMinus,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../assets/Cart.css";
import { API_CART, API_HISTORY } from "../utils/baseURL";
import axios from "axios";
import { titik } from "../utils/NumberWithComa";
import { getAllDataCart } from "../utils/controller";

function Cart({ dataCart, setDataCart }) {
  const [show, setShow] = useState(false)
  const [modal, setModal] = useState(false)

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
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
                          value={carts.quantity}
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
                    {titik(carts.product.price * carts.quantity)}
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
              <div className="font-bold">{titik(dataCart.totalPrice)}</div>
            </div>
          </div>
          <div className="flex items-end mx-6">
            <button
              onClick={() => setShow(true)}
              className="h-[60px] w-full rounded-2xl font-bold bg-[#FF2A77] text-white shadow-lg shadow-red-300"
            >
              ORDER NOW
            </button>
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
                  <h3 className="text-xl font-semibold text-gray-900 ">
                    Total Bayar
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
                  <div className="text-xl py-5 ">
                    Daftar Pesanan
                    <div className="flex justify-between text-lg">
                      <div>
                        bakso
                      </div>
                      <div>
                        :
                      </div>
                      <div>
                        Rp. 20.000
                      </div>
                    </div>
                  </div>
                  <div className="flex border-t border-black justify-between text-xl py-2">
                    <div className="text-xl py-5 ">
                      Jumlah Pesanan
                    </div>
                    <div className="text-xl py-5 ">
                      Rp. 20.000
                    </div>
                  </div>
                  <form>
                    <div className="relative z-0 w-full mb-6 group">
                      <input
                        type="number"
                        className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        id="name"
                        required
                      />
                      <label className="peer-focus:font-medium absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Uang Pelanggan
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
                        onClick={() => setModal(true)(setShow(false))}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Next
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>) : (<></>)}
      {modal ? (<>
        <div className="justify-center items-center flex bg-slate-100 opacity-70 overflow-x-hidden overflow-y-auto fixed inset-0 z-40"></div>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
          <div className="relative w-full h-full max-w-lg md:h-auto">
            <div className="relative bg-white rounded-lg border border-black shadow ">
              <div className="items-start justify-center p-4 border-b border-black border-dashed rounded-t ">
                <h3 className="text-xl text-center font-semibold text-gray-900 ">
                  NAMA_TOKO
                </h3>
                <h3 className="text-xl text-center font-semibold text-gray-900 ">
                  ALAMAT_TOKO
                </h3>
              </div>
              <div className="p-6 space-y-6">
                <table className="w-full text-sm text-left">
                  <tbody>
                    <tr className="bg-white border-b">
                      <th scope="row" className="px-6 py-4 text-sm text-black">
                        NAMA_PRODUK
                      </th>
                      <td className="px-6 py-4">
                        QTT
                      </td>
                      <td className="px-6 py-4">
                        HARGA
                      </td>
                      <td className="px-6 py-4 text-right">
                        TOTAL_HARGA
                      </td>
                    </tr>
                    <tr className="bg-white border-b">
                      <th scope="row" className="px-6 py-4 font-medium text-black">
                        NAMA_PRODUK
                      </th>
                      <td className="px-6 py-4">
                        QTT
                      </td>
                      <td className="px-6 py-4">
                        HARGA
                      </td>
                      <td className="px-6 py-4 text-right">
                        TOTAL_HARGA
                      </td>
                    </tr>
                    <tr className="bg-white border-b">
                      <th scope="row" className="px-6 py-4 font-medium text-black">
                        NAMA_PRODUK
                      </th>
                      <td className="px-6 py-4">
                        QTT
                      </td>
                      <td className="px-6 py-4">
                        HARGA
                      </td>
                      <td className="px-6 py-4 text-right">
                        TOTAL_HARGA
                      </td>
                    </tr>
                    <tr className="bg-white border-b">
                      <th scope="row" className="px-6 py-4 font-medium text-black">
                        NAMA_PRODUK
                      </th>
                      <td className="px-6 py-4">
                        QTT
                      </td>
                      <td className="px-6 py-4">
                        HARGA
                      </td>
                      <td className="px-6 py-4 text-right">
                        TOTAL_HARGA
                      </td>
                    </tr>
                    <tr className="bg-white border-b">
                      <th scope="row" className="px-6 py-4 font-medium text-black">
                        NAMA_PRODUK
                      </th>
                      <td className="px-6 py-4">
                        QTT
                      </td>
                      <td className="px-6 py-4">
                        HARGA
                      </td>
                      <td className="px-6 py-4 text-right">
                        TOTAL_HARGA
                      </td>
                    </tr>
                    <tr className="bg-white border-b">
                      <th scope="row" className="px-6 py-4 font-medium text-black">
                        NAMA_PRODUK
                      </th>
                      <td className="px-6 py-4">
                        QTT
                      </td>
                      <td className="px-6 py-4">
                        HARGA
                      </td>
                      <td className="px-6 py-4 text-right">
                        TOTAL_HARGA
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="pr-3 flex justify-end">
                  <div className="grid grid-cols-3">
                    <div>Total</div>
                    <div>:</div>
                    <div>Rp. 60.000</div>
                  </div>
                </div>
                <div className="pr-3 flex  justify-end">
                  <div className="grid border-b border-black grid-cols-3">
                    <div>Tunai</div>
                    <div>:</div>
                    <div>Rp. 60.000</div>
                  </div>
                </div>
                <div className="pr-3 flex justify-end">
                  <div className="grid grid-cols-3">
                    <div>Kembali</div>
                    <div>:</div>
                    <div>Rp. 60.000</div>
                  </div>
                </div>
              </div>
              <div className="font-bold text-center">
               TERIMA KASIH
              </div>
            </div>
            <div className="border-b border-dashed"></div>
            <div>
              <div className="flex justify-between space-x-2 rounded-b">
                <button
                  onClick={() => setModal(false)(setShow(true))}
                  data-modal-hide="defaultModal"
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  Back
                </button>
                <button
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
      </>) : (<></>)}
    </div>
  );
}

export default Cart;
