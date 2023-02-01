import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import moment from "moment";
import React from "react";
import { API_CART, API_HISTORY } from "../utils/baseURL";
import { getAllDataCart } from "../utils/controller";

function Receipt({name, phoneNumber, address, dataCart, cash, setModal, setShow, setDataCart }) {

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

        html2canvas(document.querySelector("#invoiceCapture")).then((canvas) => {
            const imgData = canvas.toDataURL('image/png', 1.0);
            const pdf = new jsPDF({
              orientation: 'portrait',
              unit: 'pt',
              format: [58, 3276]
            });
            pdf.internal.scaleFactor = 1;
            const imgProps= pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('invoice-001.pdf');
          })
        
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

      const titik = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      });
    
  return (
    <div>
      {" "}
      <div className="justify-center items-center flex bg-slate-100 opacity-70 overflow-x-hidden overflow-y-auto fixed inset-0 z-40"></div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
        <div className="relative w-[450px] h-full max-w-lg md:h-auto">
        <div
            id="invoiceCapture"
            className="relative bg-white rounded-lg"
          >
            <div className="items-start justify-center p-4 rounded-t ">
              <p className="text-center font-semibold text-gray-900 ">
                {name}
              </p>
              <p className=" text-center text-gray-900 ">
                Telp (024) 3561560
              </p>
              <p className=" text-center text-gray-900 ">
                HP / WA : {phoneNumber}
              </p>
              <p className=" text-center text-gray-900 ">{address}</p>
              <p className=" text-center text-gray-900 ">
                NPWP: 03.220.355.6-508.000
              </p>
              <p className=" text-center text-gray-900 ">
                BARANG KENA PAJAK SUDAH TERMASUK PPM
              </p>
              <p className=" text-center text-gray-900 ">
                12006.58552/ADE/Tunai/UMUM/ASLI
              </p>
            </div>
            <div className="">
              <hr className="border border-black border-dashed mx-4" />
              {/* <div className="grid mx-2 my-2 grid-cols-2"> */}
              <table className="text-sm text-left">
                <tbody>
                  {dataCart.cartItem.map((carts) => (
                    <tr key={carts.id} className="bg-white">
                      <td className="px-6 py-4">x{carts.quantity}</td>
                      <th scope="row" className="font-medium text-black">
                        {carts.product.name}
                      </th>
                      <div className="">
                        <td className="px-6 py-4">
                          {titik.format(carts.product.price)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          {titik.format(carts.product.price * carts.quantity)}
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
                      <div>Uang Tunai</div>
                      <div>:</div>
                      <div> {titik.format(cash)}</div>
                    </div>
                  </div>
                  <div className="pr-3 mt-4 flex justify-end">
                    <div className="w-[200px] flex justify-between">
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
              ==== ABANG TUKANG BAKSO ====
            </div>
            <div className="text-center">
              {phoneNumber} / {phoneNumber}
            </div>
            <div className="text-center">Email: abangbakso@gmail.com</div>
            <div className="text-center">Beli Bakso Anda Online</div>
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
    </div>
  );
}

export default Receipt;
