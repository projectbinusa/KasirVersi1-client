import React from "react";
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
  const increment = async (carts) => {
    if (dataCart.quantity === carts.product.stock) {
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
    if (dataCart.quantity === 1) {
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
              onClick={checkout}
              className="h-[60px] w-full rounded-2xl font-bold bg-[#FF2A77] text-white shadow-lg shadow-red-300"
            >
              ORDER NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
