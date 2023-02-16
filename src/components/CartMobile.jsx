import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react'
import moment from "moment";
import jsPDF from "jspdf";
import {
    faTrashCan,
    faSquareMinus,
    faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import { API_CART, API_TOKO, API_HISTORY } from '../utils/baseURL';
import { getAllDataCart } from "../utils/controller";
import ReceiptMobile from "./ReceiptMobile";
import html2canvas from "html2canvas";
import { useReactToPrint } from "react-to-print";
import { useNavigate } from 'react-router-dom';

function CartMobile({ dataCart, setDataCart }) {
    const [show, setShow] = useState(false);
    const [cash, setCash] = useState(0);
    const [modal, setModal] = useState(false);
    const [modals, setModals] = useState(false);
    const reportTemplateRef = useRef(null);
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");

    const navigate = useNavigate();

    const titik = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    });

    const pay = () => {
        setCash();
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

    useEffect(() => {
        getToko();
      }, []);      
      const refus = useRef();

      const checkout = async () => {
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
  
          // html2canvas(document.querySelector("#invoiceCapture"), {
          //   scale: 2,
          // }).then((canvas) => {
          //     const imgData = canvas.toDataURL('image/png', 1.0);
          //     const pdf = new jsPDF({
          //       orientation: 'portrait',
          //       unit: 'pt',
          //       format: [150, 3276]
          //     });
          //     pdf.internal.scaleFactor = 5;
          //     const imgProps= pdf.getImageProperties(imgData);
          //     const pdfWidth = pdf.internal.pageSize.getWidth();
          //     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          //     pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
          //     pdf.save('struk.pdf');
          //   })
          
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
  
          const handlePrint = useReactToPrint({
            content: () => refus.current,
            documentTitle: "struk",
            onAfterPrint: () => navigate("/success"),
          })
    
        const checkoutReceipt = (e) => {
          e.preventDefault();
          checkout();
          handlePrint();
          setModal(true);
          setShow(false);
        }
    return (
        <>
            <div>
                <div onClick={() => setModals(true)} className=" text-white relative">
                    <button className="bg-[#FF2A77] rounded-xl p-3 text-white text-xl">
                        <FontAwesomeIcon
                            icon="fa-cart-shopping"
                            className="w-8 h-8"
                        />
                    </button>
                    <div className="inline-flex absolute bottom-12 left-9 justify-center items-center w-8 h-8 text-xs font-bold text-white bg-[#FF2A77] rounded-full border-2 border-white">
                        {dataCart.cartItem.length}
                    </div>
                </div>
            </div>
            {modals ? (<>
                <div className="justify-center items-center flex bg-slate-100 opacity-70 fixed inset-0 z-40"></div>
                <div className="justify-center items-top flex fixed inset-0 z-50">
                    <div className="overflow-x-auto overflow-y-auto h-full pb-40 w-full max-w-2xl ">
                        <div className="relative top-0 bg-gray-50 rounded-lg shadow ">
                            {dataCart.cartItem.map((carts) => (
                                <div
                                    key={carts.id}
                                    className="grid grid-cols-6 gap-4 items-center p-2 text-md"
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
                        <div className='bottom-[80px] bg-white w-full p-3 absolute'>
                        <div className="flex justify-between space-x-2">
                            <div>
                                <button className='h-[60px] rounded-2xl w-full font-bold text-white shadow-gray-600' onClick={() => setModals(false)} >
                                    Kembali
                                </button>
                            </div>
                            {dataCart.quantity === 0 ? (
                                <button
                                    disabled
                                    className="h-[60px] w-full cursor-not-allowed font-bold rounded-2xl bg-[#FF2A77] hover:bg-[#ff488b]"
                                >
                                   Pesan Sekarang
                                </button>
                            ) : (
                                <button
                                    onClick={() =>{setShow(true), setModals(false)}}
                                    className="h-[60px] w-full rounded-2xl font-bold bg-[#FF2A77] text-white shadow-red-400 hover:bg-[#FF2A77]"
                                >
                                    Pesan Sekarang
                                </button>
                            )}
                        </div>
                        </div>
                    </div>
                </div>
            </>) : (<></>)}

            {show ? (
                <>
                    <div className="justify-center items-center flex bg-slate-100 opacity-70 overflow-x-hidden overflow-y-auto fixed inset-0 z-40"></div>
                    <div className="justify-center items-center flex overflow-x-auto overflow-y-auto fixed inset-0 z-50">
                        <div className="relative w-full h-full max-w-2xl">
                            <div className="relative top-0 pb-48 bg-gray-50 rounded-lg shadow ">
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

                                <div className="p-6 space-y-2">
                                    <div className="text-xl py-2 ">
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
                                    </form>
                                </div>
                            </div>
                            <div className='fixed bottom-20 bg-white w-full'>
                            <div className="flex justify-between p-5 space-x-2 rounded-b ">
                                <button
                                    onClick={() =>{setShow(false); setModals(true)} }
                                    data-modal-hide="defaultModal"
                                    type="button"
                                    className="text-white w-full h-[60px] bg-gray-700 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-2xl border border-gray-200 text-lg font-medium hover:text-white focus:z-10"
                                >
                                    Kembali
                                </button>
                                {cash < dataCart.totalPrice ? (
                                    <>
                                        <button
                                            data-modal-hide="defaultModal"
                                            type="submit"
                                            disabled
                                            className="text-white cursor-not-allowed w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none text-lg focus:ring-blue-300 font-medium rounded-2xl text-center"
                                        >
                                            Isi Nominal 
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        {" "}
                                        <button
                                            data-modal-hide="defaultModal"
                                            type="submit"
                                            onClick={checkoutReceipt}
                                            className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-2xl text-lg text-center"
                                        >
                                            Cetak Struk
                                        </button>
                                    </> 
                                )}
                            </div>
                            </div>
                        </div>
                    </div>
                    <div>
      {" "}
      <div className="justify-center items-center flex bg-slate-100 opacity-70 overflow-x-hidden overflow-y-auto fixed inset-0 z-40"></div>
      <div className='hidden'>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
        <div className="relative w-full top-10 h-auto max-w-lg md:h-auto">
        <div
            ref={refus}
            id="invoiceCapture"
            className="relative bg-white rounded-lg text-xs"
          >
            <div className="items-start justify-center rounded-t ">
              <p className="text-center font-semibold text-gray-900 ">
                {name}
              </p>
              <p className=" text-center text-gray-900">
                HP / WA : {phoneNumber}
              </p>
              <p className=" text-center text-gray-900">{address}</p>
            </div>
            <div className="">
              <hr className="border border-black border-dashed mx-4" />
              <table className="text-sm text-left">
                <tbody>
                  {dataCart.cartItem.map((carts) => (
                    <tr key={carts.id} className="bg-white">
                      <td className="px-2 mx-10 py-4 text-xs">{carts.quantity}x</td>
                      <th scope="row" className="font-medium text-black text-xs">
                        {carts.product.name}
                      </th>
                      <div className="">
                        <td className="px-6 py-4 text-right text-xs">
                          {titik.format(carts.product.price * carts.quantity)}
                        </td>
                      </div>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="">
              <div className="flex justify-end mr-4">
                <div className="border-t border-black border-dashed">
                  <div className="flex justify-end my-2">
                    <div className="w-[150px] flex justify-between">
                      <div>Total</div>
                      <div>:</div>
                      <div> {titik.format(dataCart.totalPrice)}</div>
                    </div>
                  </div>
                  <div className="flex justify-end my-2">
                    <div className="w-[150px] flex justify-between">
                      <div>Uang Tunai</div>
                      <div>:</div>
                      <div> {titik.format(cash)}</div>
                    </div>
                  </div>
                  <div className="flex justify-end my-2">
                    <div className="w-[150px] flex justify-between">
                      <div>Kembalian</div>
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
              TERIMA KASIH. SELAMAT BERBELANJA
            </div>
            <div className="font-bold text-center pb-2">
              == ABANG TUKANG BAKSO ==
            </div>
            <div className="text-center">Email: abangbakso@gmail.com</div>
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
                onClick={checkoutReceipt}
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
      </div>
    </div>
                </>
            ) : (
                <></>
            )}
            {modal ? (
                <></>
            ) : (
                <></>
            )}
        </>
    )
}

export default CartMobile