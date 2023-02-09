import axios from "axios";
import React from "react";
import { API_CART } from "../utils/baseURL";
import { getAllDataCart } from "../utils/controller";

function Card({ data, setDataCart }) {
  const titik = new Intl.NumberFormat("id-ID", {style:"currency", currency:"IDR"});

  const addToCart = async (id) => {
    await axios
      .get(
        `${API_CART}/search?product=${id}&user=${localStorage.getItem("id")}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        if (res.data.length === 0) {
          const req = {
            productId: id,
            quantity: 1,
          };
          axios
            .post(`${API_CART}/add`, req, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .then(() => {
              getAllDataCart("list", setDataCart);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          const req = {
            quantity: res.data[0].quantity + 1,
          };
          axios
            .put(`${API_CART}/update/${res.data[0].id}`, req, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .then(() => {
              getAllDataCart("list", setDataCart);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div id="card">
      <div
        onClick={() => addToCart(data.id)}
        className="max-w-sm max-h-sm rounded overflow-hidden shadow-lg cursor-pointer"
      >
        <div id="card-image">
          <img
            className="w-16 sm:w-24 lg:w-40 md:w-40 h-16 sm:h-24 lg:h-40 md:h-40 mb-3 rounded-full shadow-lg mx-auto"
            src={data.image}
            alt={data.image}
          />
        </div>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{data.name}</div>
          <p className="text-gray-700 text-base"> {titik.format(data.price)}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
