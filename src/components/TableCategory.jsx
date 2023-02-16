import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { getAllDataCategory } from "../utils/controller";
import { API_CATEGORY } from "../utils/baseURL";
import { Alert, AlertConfirm } from "./Alert";

function TableCategory({ dataCategory, setDataCategory, setShowAlertConfirm, setId }) {
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

  const [showModals, setShowModals] = useState(false);
  const [nameCategory, setNameCategory] = useState("");
  const [categoryId, setCategoryId] = useState(0);

  const [isOpen, setOpen] = useState(false);
  const [items, setItem] = useState(ikon);
  const [selectedItem, setSelectedItem] = useState(null);

  const getCategoryId = async (id) => {
    await axios
      .get(`${API_CATEGORY}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setNameCategory(res.data.name);
        setSelectedItem(res.data.icon);
        setCategoryId(id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateCategory = async (e) => {
    e.preventDefault();
    const reqs = {
      name: nameCategory,
      icon: selectedItem,
    };

    await axios
      .put(`${API_CATEGORY}/${categoryId}`, reqs, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        getAllDataCategory("all", setDataCategory);
        setShowModals(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleDropdown = () => setOpen(!isOpen);

  const handleItemClick = (name) => {
    setSelectedItem(name);
    setOpen(false);
  };

  const deleteCategory = (id) => {
    setShowAlertConfirm(true);
    setId(id);
   }

  return (
    <React.Fragment>
      <tbody>
        {dataCategory.map((item) => {
          return (
            <tr className="bg-white border-b text-center" key={item.id}>
              <th
                scope="row"
                className="py-2 sm:py-3 md:py-5 px-2 font-medium text-gray-900 whitespace-nowrap"
              >
                {item.name}
              </th>

              <td className="bg-white text-center p-2 rounded-lg md:rounded-2xl">
                <FontAwesomeIcon
                  icon={item.icon}
                  className="w-4 md:w-8 h-4 md:h-8 "
                />
              </td>
              <td className="flex justify-center">
                <div className="p-1">
                  <button
                    onClick={() => {
                      getCategoryId(item.id);
                      setShowModals(true);
                    }}
                    type="button"
                    className="w-16 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-xs md:text-sm py-2"
                  >
                    <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                  </button>
                </div>
                <div className="p-2">
                  <button
                    onClick={() => deleteCategory(item.id)}
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
      {showModals ? (
        <tfoot>
          <tr>
            <td>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
                <div className="relative w-full h-full max-w-2xl md:h-auto">
                  <div className="relative bg-gray-50 rounded-lg shadow ">
                    <div className="flex items-start justify-between p-4 border-b rounded-t ">
                      <h3 className="text-xl font-semibold text-gray-900 ">
                        Update Category
                      </h3>
                      <button
                        onClick={() => setShowModals(false)}
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
                      <form onSubmit={updateCategory}>
                        <div className="relative z-0 w-full mb-6 group">
                          <input
                            type="text"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            value={nameCategory || ""}
                            onChange={(e) => setNameCategory(e.target.value)}
                            placeholder=""
                            required
                          />
                          <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Name Category
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
                            <div
                              className={`dropdown-body ${isOpen && "open"}`}
                            >
                              <ul className=" absolute grid grid-cols-4 gap-2 bg-white ">
                                {items.map((item, i) => (
                                  <li
                                    className="dropdown-item hover:bg-blue-500 hover:text-white text-center"
                                    onClick={(e) =>
                                      handleItemClick(item.iconName)
                                    }
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
                            Edit
                          </button>
                          <button
                            onClick={() => setShowModals(false)}
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
        </tfoot>
      ) : (
        <></>
      )}
    </React.Fragment>
  );
}

export default TableCategory;
