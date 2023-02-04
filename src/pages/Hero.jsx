import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Cart from "../components/Cart";
import CartMobile from "../components/CartMobile";
import Menu from "../components/Menu";
import {
  getAllDataCart,
  getAllDataProduct,
  getAllDataCategory,
  getProductPopular,
} from "../utils/controller";

function Hero({iconList}) {
  const [dataMenu, setDataMenu] = useState([]);
  const [productPopular, setProductPopular] = useState([]);
  const [productTimeAdded, setProductTimeAdded] = useState([]);
  const [dataCart, setDataCart] = useState({
    cartItem: [],
    totalPrice: 0,
    quantity: 0,
  });
  const [dataCategory, setDataCategory] = useState([]);


  useEffect(() => {
    getAllDataProduct("all", setDataMenu);
    getAllDataCategory("all", setDataCategory);
    getProductPopular("popular", setProductPopular);
    getProductPopular("time-added", setProductTimeAdded);
    getAllDataCart("list", setDataCart);
  }, []);
  return (
    <div>
      <div
        id="menu"
        className="bg-gray-50 p-2 grid grid-cols-9 h-screen overflow-y-auto scroll-none"
      >
        <div className="col-span-9 md:col-span-6">
          <Menu
            dataCategory={dataCategory}
            dataMenu={dataMenu}
            productPopular={productPopular}
            productTimeAdded={productTimeAdded}
            setDataCart={setDataCart}
            iconList={iconList}
          />
        </div>
        <div id="list" className="p-2 hidden md:block md:col-span-3">
          <Cart dataCart={dataCart} setDataCart={setDataCart} />
        </div>
        <div className="fixed md:invisible bottom-20 right-0 pr-5">
        {dataCart.quantity !== 0 ? (<>
       <CartMobile dataCart={dataCart} setDataCart={setDataCart} />
        </>) :(<>
        </>) }
        </div>
      </div>
    </div>
  );
}

export default Hero;
