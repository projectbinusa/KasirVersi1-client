import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { API_PRODUCT } from "../utils/baseURL";
import { getAllDataProduct } from "../utils/controller";


function TableLibrary({ dataMenu, setDataMenu, dateEvent, setShowAlertConfirm, setId }) {
  const titik = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" });

  const [show, setShow] = useState(false);

  const [productId, setProductId] = useState(0);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState(0);

  const getProductId = async (id) => {
    await axios
      .get(`${API_PRODUCT}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setName(res.data.name);
        setDescription(res.data.description);
        setStock(res.data.stock);
        setPrice(res.data.price);
        setProductId(id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    const req = {
      name: name,
      description: description,
      price: price,
      stock: stock,
      categoryId: categoryId,
    };

    await axios
      .put(`${API_PRODUCT}/${productId}`, req, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        getAllDataProduct("all", setDataMenu);
        setShow(false);

      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteProduct = (id) => {
    setShowAlertConfirm(true);
    setId(id);
   }

  return (
    <>
      <tbody>
        {dataMenu.map((item) => {
          return (
            <tr className="bg-white border-b text-center" key={item.id}>
              <th
                scope="row"
                className="py-2 sm:py-3 md:py-5 px-2 font-medium text-gray-900 whitespace-nowrap "
              >
                {item.name}
              </th>
              <td className="">{item.category.name}</td>
              <td className="">{item.description}</td>
              <td className="">{item.stock}</td>
              <td className="">{item.jumlahTerjual}</td>
              <td className=""> {titik.format(item.price)}</td>
              <td className="">{dateEvent(item.createdAt)}</td>
              <td className="flex justify-center">
                <div className="p-1">
                  <button
                    onClick={() => {
                      setShow(true);
                      getProductId(item.id);
                    }}
                    type="button"
                    className="w-16 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-xs md:text-sm py-2"
                  >
                    <FontAwesomeIcon icon="fa-solid fa-pen-to-square" /> 
                  </button>
                </div>
                <div className="p-1">
                  <button
                    onClick={() => deleteProduct(item.id)}
                    type="button"
                    className="w-16 text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-xs md:text-sm py-2"
                  >
                    <FontAwesomeIcon icon="fa-solid fa-trash" />
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
      {show ? (
        <tbody>
          <tr>
          <td>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
            <div className="relative w-full h-full max-w-2xl md:h-auto">
              <div className="relative bg-gray-100 rounded-lg shadow ">
                <div className="flex items-start justify-between p-4 border-b rounded-t ">
                  <h3 className="text-xl font-semibold text-gray-900 ">
                    Edit Product
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
                  <form onSubmit={updateProduct}>
                    <div className="relative z-0 w-full mb-6 group">
                      <input
                        type="text"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                      <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Product Name
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                      <input
                        type="number"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                      />
                      <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Price
                      </label>
                    </div>
                    <div className="grid md:grid-cols-1 md:gap-6">
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          type="number"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          id="stock"
                          value={stock}
                          onChange={(e) => setStock(e.target.value)}
                          required
                        />
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                          Stock
                        </label>
                      </div>
                    </div>
                    <div className="grid md:gap-6">
                      <div className="relative z-0 w-full mb-6 group">
                        <textarea
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          id="description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          required
                        />
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                          Description
                        </label>
                      </div>
                    </div>
                    <div className="flex justify-between space-x-2 rounded-b">
                      <button
                        data-modal-hide="defaultModal"
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Edit Product
                      </button>
                      <button
                        onClick={() => setShow(false)}
                        data-modal-hide="defaultModal"
                        type="button"
                        className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          </td>
          </tr>
        </tbody>
      ) : (
        <></>
      )}
    </>
  );
}

export default TableLibrary;
