import React, { useState } from "react";
import {
  faTrashCan,
  faSquareMinus,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../assets/Cart.css";

function Cart() {
  const [count, setCount] = useState(1);
  const datas = {
    list: [
      {
        name: "Bakso",
        deskripsi: "Lebih enak ketika di nikmati waktu hujan",
        harga: 10000,
        image:
          "https://resepkoki.id/wp-content/uploads/2016/04/Resep-Bakso-urat.jpg",
        id: 2,
      },
      {
        name: "Cilok",
        deskripsi: "Makanan yang cocok untuk cemilan",
        harga: 5000,
        image:
          "https://img.kurio.network/4KxPizCLRIHP5sYp4ZJXKp4-ZAY=/1200x1200/filters:quality(80)/https://kurio-img.kurioapps.com/22/04/05/c0741c32-6346-4329-bd8f-7f6600b84666.png",
        id: 3,
      },
      {
        name: "Jus Alpukat",
        deskripsi: "Minuman yang menyehatkan",
        harga: 10000,
        image:
          "https://images.tokopedia.net/img/cache/500-square/product-1/2020/7/18/9149864/9149864_26c5205e-a37c-47eb-a393-0ca0d65455b6_719_719.jpg",
        id: 5,
      },
      {
        name: "Rendang",
        deskripsi: "Makanan khas Padang",
        harga: 20000,
        image:
          "https://images.tokopedia.net/img/JFrBQq/2022/8/9/bbeeca0f-bdd3-4b05-af82-8011730c932b.jpg",
        id: 6,
      },
    ],
  };

  const increment = () => {
    if (count === 0) {
      setCount(1);
    } else {
      setCount(count + 1);
    }
  };

  const decrement = () => {
    if (count === 1) {
      setCount(1);
    } else {
      setCount(count - 1);
    }
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
              {datas.list.map((dataa) => (
                <div className="grid grid-cols-9 gap-4 items-center text-md">
                  <div className="grid justify-center col-span-2">
                    <img
                      src={dataa.image}
                      alt="product"
                      className="h-[75px] w-[80px] rounded-[20px]"
                    />
                  </div>
                  <div className="gird grid-cols-1 col-span-2">
                    <div className="font-bold cut-text">{dataa.name}</div>
                    <div className="text-gray-500">Rp.{dataa.harga}</div>
                  </div>
                  <div className="grid grid-cols-3 col-span-2 text-gray-500 gap-2 font-md">
                    <div className="flex items-center justify-center rounded cursor-pointer">
                      <FontAwesomeIcon
                        onClick={decrement}
                        icon={faSquareMinus}
                        className="w-5 h-5 text-gray-400  hover:text-red-400"
                      />
                    </div>
                    <div className="">x{count}</div>
                    <div className="flex items-center justify-center rounded cursor-pointer">
                      <FontAwesomeIcon
                        onClick={increment}
                        icon={faSquarePlus}
                        className="w-5 h-5 text-gray-400 hover:text-green-400"
                      />
                    </div>
                  </div>
                  <div className="text-gray-500 font-semibold col-span-2">
                    Rp.{dataa.harga * count}
                  </div>
                  <div className="text-gray-500 flex items-center justify-center rounded cursor-pointer">
                    <FontAwesomeIcon
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
              <div className="font-bold">Rp.1.000.000</div>
            </div>
          </div>
          <div className="flex items-end mx-6">
            <button className="h-[60px] w-full rounded-2xl font-bold bg-[#FF2A77] text-white shadow-lg shadow-red-300">
              Chackout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
