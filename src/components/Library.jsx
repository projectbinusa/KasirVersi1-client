import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { API_CATEGORY, API_PRODUCT } from "../utils/baseURL";
import { getAllDataCategory, getAllDataProduct } from "../utils/controller";
import moment from "moment";
import Pagination from "./Padination";
import Pagination2 from "./Padination2";
import TableLibrary from "./TableLibrary";
import TableCategory from "./TableCategory";
import { Alert, AlertConfirm, AlertConfirm2 } from "./Alert";
import { Link } from "react-router-dom";

function Library({
  dataCategory,
  dataMenu,
  setDataMenu,
  setDataCategory,
  iconList,
}) {
  const titik = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  const ikon = [
    {
      id: 1,
      prefix: "fas",
      iconName: "fa-glass-water",
      title: "Minuman",
    },
    {
      id: 2,
      prefix: "fas",
      iconName: "fa-mug-hot",
      title: "Minuman Panas",
    },
    {
      id: 3,
      prefix: "fas",
      iconName: "fa-bottle-water",
      title: "Minuman Botol",
    },
    {
      id: 4,
      prefix: "fas",
      iconName: "fa-beer-mug-empty",
      title: "Minuman Jumbo  ",
    },
    {
      id: 5,
      prefix: "fas",
      iconName: "fa-martini-glass-citrus",
      title: " Minuman Penutup",
    },
    {
      id: 6,
      prefix: "fas",
      iconName: "fa-ice-cream",
      title: "Makanan Penutup",
    },
    {
      id: 7,
      prefix: "fas",
      iconName: "fa-bowl-food",
      title: "Makanan",
    },

    {
      id: 8,
      prefix: "fas",
      iconName: "fa-cookie",
      title: "Snack",
    },
    {
      id: 9,
      prefix: "fas",
      iconName: "fa-bowl-rice",
      title: "Nasi",
    },
    {
      id: 10,
      prefix: "fas",
      iconName: "fa-pizza-slice",
      title: "Makanan Berat",
    },
    {
      id: 11,
      prefix: "fas",
      iconName: "fa-bread-slice",
      title: "Roti",
    },
    {
      id: 12,
      prefix: "fas",
      iconName: "fa-burger",
      title: "Burger",
    },
    {
      id: 13,
      prefix: "fas",
      iconName: "fa-pepper-hot",
      title: "Sambal",
    },
    {
      id: 14,
      prefix: "fas",
      iconName: "fa-cheese",
      title: "Keju",
    },
    {
      id: 15,
      prefix: "fas",
      iconName: "fa-apple-whole",
      title: "Buah",
    },
    {
      id: 16,
      prefix: "fas",
      iconName: "fa-ellipsis",
      title: "Lainnya",
    },
  ];

  const [modal, setModal] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [nameCategory, setNameCategory] = useState("");

  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentPages, setCurrentPages] = useState(1);
  const [recordsPerPage] = useState(5);
  const [recordsPerPages] = useState(5);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfLastRecords = currentPages * recordsPerPages;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const indexOfFirstRecords = indexOfLastRecords - recordsPerPages;
  const currentRecords = dataMenu.slice(indexOfFirstRecord, indexOfLastRecord);
  const currentCategory = dataCategory.slice(
    indexOfFirstRecords,
    indexOfLastRecords
  );
  const nPages = Math.ceil(dataMenu.length / recordsPerPage);
  const cPages = Math.ceil(dataCategory.length / recordsPerPages);

  const addCategory = async (e) => {
    e.preventDefault();
    const req = {
      name: nameCategory,
      icon: selectedItem,
    };

    await axios
      .post(`${API_CATEGORY}/add`, req, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        getAllDataCategory("all", setDataCategory);
        setShowModal(false);
        setSelectedItem(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // function Alert() {
  //   alert("tambahkan kategori dulu")
  // }

  const addProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("file", image);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("description", description);
    formData.append("categoryId", categoryId);
    await axios
      .post(`${API_PRODUCT}/add`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        getAllDataProduct("all", setDataMenu);
        setModal(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const dateEvent = (item) => {
    moment.locale("en");
    return moment(item).format("DD-MM-YYYY hh:mm:ss");
  };

  useEffect(() => {
    getAllDataProduct("all", setDataMenu);
    getAllDataCategory("all", setDataCategory);
  }, []);

  const [isOpen, setOpen] = useState(false);
  const [items, setItem] = useState(ikon);
  const [selectedItem, setSelectedItem] = useState(null);

  const [showAlert, setShowAlert] = useState(false);
  const [showAlertConfirm, setShowAlertConfirm] = useState(false);
  const [showAlertConfirm2, setShowAlertConfirm2] = useState(false);

  const toggleDropdown = () => setOpen(!isOpen);

  const handleItemClick = (name) => {
    setSelectedItem(name);
    setOpen(false);
  };

  const [id, setId] = useState(0);

  return (
    <div>
      {showAlertConfirm && (
        <AlertConfirm
          setIsOpen={setShowAlertConfirm}
          id={id}
          setDataCategory={setDataCategory}
        />
      )}
      {showAlertConfirm2 && (
        <AlertConfirm2
          setIsOpen={setShowAlertConfirm2}
          id={id}
          setDataMenu={setDataMenu}
        />
      )}
      <div className="p-5 bg-gray-50 col-span-9 h-screen overflow-y-auto scroll-none">
        <h1 className="font-bold text-2xl text-center md:text-left md:text-4xl">
          Library
        </h1>
        <div className="my-5">
          <div className="flex justify-between py-5">
            <p className="grid grid-cols-1 content-center text-sm md:text-xl text-slate-700 uppercase">
              add to category
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-white w-16 sm:w-24 md:w-36 rounded-xl border-gray-200 hover:bg-green-50 focus:outline-none hover:text-blue-700"
            >
              <FontAwesomeIcon
                icon="fa-plus"
                className="w-5 md:w-7 h-5 md:h-7"
              />
            </button>
          </div>
          <div className=" overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-gray-500 ">
              <thead className="text-xs text-gray-700 bg-gray-200 ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              {dataCategory.length == 0 ? (
                  <tbody className="mx-auto text-center">
                  <tr>
                    <td>
                      <p className="my-2 text-gray-800 font-bold text-xl">
                        Belum Ada Daftar Kategori
                      </p>
                    </td>
                  </tr>
                </tbody>
              ) : (
                <TableCategory
                  dataCategory={currentCategory}
                  setDataCategory={setDataCategory}
                  setShowAlertConfirm={setShowAlertConfirm}
                  setId={setId}
                  />
              )}
            </table>
          </div>
        </div>
        <Pagination2
          cPages={cPages}
          currentPages={currentPages}
          setCurrentPages={setCurrentPages}
        />
        <div>
          <div className="my-5">
            <div className="flex justify-between py-5">
              <p className="grid grid-cols-1 content-center text-sm md:text-xl text-slate-700 uppercase">
                add to product
              </p>
              <div>
                {dataCategory.length !== 0 ? (
                  <>
                    <button
                      onClick={() => setModal(true)}
                      className="bg-white w-16 sm:w-24 md:w-36 rounded-xl border-gray-200 hover:bg-green-50 focus:outline-none hover:text-blue-700"
                    >
                      <FontAwesomeIcon
                        icon="fa-plus"
                        className="w-5 md:w-7 h-5 md:h-7"
                      />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setShowAlert(true)}
                      className="bg-white cursor-not-allowed w-16 sm:w-24 md:w-36 rounded-xl border-gray-200 hover:bg-green-50 focus:outline-none hover:text-blue-700"
                    >
                      <FontAwesomeIcon
                        icon="fa-plus"
                        className="w-5 md:w-7 h-5 md:h-7"
                      />
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="mx-auto justify-center text-center">
              {showAlert && (
                <Alert
                  setIsOpen={setShowAlert}
                  message={"Silahkan Tambahkan Kategori Dahulu!"}
                />
              )}
              <section>
                <div className=" overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full bg-white text-sm text-left text-gray-500 ">
                    <thead className="text-xs text-center text-gray-700 bg-gray-200  ">
                      <tr>
                        <th scope="col" className="px-2 md:px-6 py-3">
                          Product Name
                        </th>
                        <th scope="col" className="px-2 md:px-6 py-3">
                          Category
                        </th>
                        <th scope="col" className="px-2 md:px-6 py-3">
                          Description
                        </th>
                        <th scope="col" className="px-2 md:px-6 py-3">
                          Stock
                        </th>
                        <th scope="col" className="px-2 md:px-6 py-3">
                          Total Sold
                        </th>
                        <th scope="col" className="px-2 md:px-6 py-3">
                          Price
                        </th>
                        <th scope="col" className="px-2 md:px-6 py-3">
                          Date Added
                        </th>
                        <th scope="col" className="px-2 md:px-6 py-3">
                          Action
                        </th>
                      </tr>
                    </thead>
                    {dataMenu.length === 0 ? (
                      <tbody className="mx-auto text-center">
                      <tr>
                        <td>
                          <h1 className="my-2 text-gray-800 font-bold text-xl">
                            Belum Ada Daftar Menu
                          </h1>
                        </td>
                      </tr>
                    </tbody>
                    ) : (
                      <TableLibrary
                        dataMenu={currentRecords}
                        dateEvent={dateEvent}
                        setDataMenu={setDataMenu}
                        setShowAlertConfirm={setShowAlertConfirm2}
                        setId={setId}
                      />
                    )}
                  </table>
                </div>
              </section>
              <div className="py-4">
                <Pagination
                  nPages={nPages}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
            <div className="relative w-full h-full max-w-2xl md:h-auto">
              <div className="relative bg-gray-50 rounded-lg shadow ">
                <div className="flex items-start justify-between p-4 border-b rounded-t ">
                  <h3 className="text-xl font-semibold text-gray-900 ">
                    Add Category
                  </h3>
                  <button
                    onClick={() => setShowModal(false)}
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
                  <form onSubmit={addCategory}>
                    <div className="relative z-0 w-full mb-6 group">
                      <input
                        type="text"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        id="nameCategory"
                        onChange={(e) => setNameCategory(e.target.value)}
                        placeholder=" "
                        required
                      />
                      <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Category Name
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                      <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <div
                          className="dropdown-header cursor-pointer flex"
                          onClick={toggleDropdown}
                        >
                          {selectedItem
                            ? items.find(
                                (item) => item.iconName == selectedItem
                              ).title
                            : "Select Icon"}
                          <i
                            className={`fa fa-chevron-right icon ${
                              isOpen && "open"
                            }`}
                          ></i>
                        </div>
                        <div className={`dropdown-body ${isOpen && "open"}`}>
                          <ul className=" absolute grid grid-cols-4 gap-2 bg-white ">
                            {items.map((item, i) => (
                              <li
                                className="dropdown-item hover:bg-blue-500 hover:text-white text-center"
                                onClick={(e) => handleItemClick(item.iconName)}
                                id={item.id}
                                key={i}
                              >
                                <FontAwesomeIcon
                                  icon={item.iconName}
                                  size="2x"
                                />
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="flex justify-center"></div>
                    </div>
                    <div className="flex items-center justify-between space-x-2 rounded-b">
                      <button
                        data-modal-hide="defaultModal"
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Add Category
                      </button>
                      <button
                        onClick={() => setShowModal(false)}
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
        </>
      ) : (
        <></>
      )}
      {modal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
            <div className="relative w-full h-full max-w-2xl md:h-auto">
              <div className="relative bg-gray-100 rounded-lg shadow ">
                <div className="flex items-start justify-between p-4 border-b rounded-t ">
                  <h3 className="text-xl font-semibold text-gray-900 ">
                    Add Product
                  </h3>
                  <button
                    onClick={() => setModal(false)}
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
                  <form onSubmit={addProduct}>
                    <div className="relative z-0 w-full mb-6 group">
                      <input
                        type="file"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        id="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        required
                      />
                      <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Image
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                      <input
                        type="text"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        id="name"
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
                        onChange={(e) => setPrice(e.target.value)}
                        required
                      />
                      <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Price
                      </label>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                      <div className="relative z-0 w-full mb-6 group">
                        <input
                          type="number"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          id="stock"
                          onChange={(e) => setStock(e.target.value)}
                          required
                        />
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                          Stock
                        </label>
                      </div>
                      <div className="relative z-0 w-full mb-6 group">
                        <select
                          id="category"
                          name="category"
                          autoComplete="category-name"
                          onChange={(e) => setCategoryId(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   "
                        >
                          <option>Select Category</option>
                          {dataCategory.map((data) => (
                            <option key={data.id} value={data.id}>
                              {data.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="grid md:gap-6">
                      <div className="relative z-0 w-full mb-6 group">
                        <textarea
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          id="description"
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
                        Add Product
                      </button>
                      <button
                        onClick={() => setModal(false)}
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
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Library;
