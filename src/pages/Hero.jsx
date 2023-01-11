import React, { useEffect, useState } from 'react'
import Cart from '../components/Cart';
import Menu from '../components/Menu';
import { getAllData } from '../utils/controller';

function Hero() {
    const [dataMenu, setDataMenu] = useState([]);
    const [dataCart, setDataCart] = useState([]);
    const [dataCategory, setDataCategory] = useState([]);

    useEffect(() => {
        getAllData("list", setDataMenu);
        getAllData("category", setDataCategory);
        getAllData("cart", setDataCart);
      }, []);
  return (
    <div>
    <div
          id="menu"
          className="bg-gray-50 p-2 grid grid-cols-9 h-screen overflow-y-auto scroll-none"
        >
          <div className="col-span-6">
            <Menu dataCategory={dataCategory} dataMenu={dataMenu} />
          </div>
          <div id="cart" className="p-2 col-span-3">
            <Cart dataCart={dataCart}/>
          </div>
        </div>
    </div>
  )
}

export default Hero