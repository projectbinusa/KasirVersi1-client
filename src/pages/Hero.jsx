import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../actions/auth";
import Cart from "../components/Cart";
import CartMobile from "../components/CartMobile";
import Loading from "../components/Loading";
import Menu from "../components/Menu";
import userService from "../services/user.service";
import { API_CATEGORY, API_PRODUCT } from "../utils/baseURL";
import {
  getAllDataCart,
  // getAllDataProduct,
  // getAllDataCategory,
  getProductPopular,
  getAllDatas,
} from "../utils/controller";

function Hero({ iconList }) {
  const [dataMenu, setDataMenu] = useState([]);
  const [productPopular, setProductPopular] = useState([]);
  const [productTimeAdded, setProductTimeAdded] = useState([]);
  const [dataCart, setDataCart] = useState({
    cartItem: [],
    totalPrice: 0,
    quantity: 0,
  });
  const [dataCategory, setDataCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = useCallback(() => {
    dispatch(logout());
    navigate("/login");
  }, [dispatch]);

  const getAllDataProduct = async () => {
    await axios
      .get(`${API_PRODUCT}/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setDataMenu(res.data);
        setLoading(!loading);
        setTimeout(() => {
          setLoading(!loading);
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAllDatas = (setPath) => {
    userService.getAllDataProduct().then(
      (response) => {
        setPath(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
  
        setPath(_content);
        setLoading(!loading);
        setTimeout(() => {
          setLoading(!loading);
        }, 1000);
  
        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  };


  const getAllDataCategory = async () => {
    await axios
      .get(`${API_CATEGORY}/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setDataCategory(res.data);
        setSelectedCategory(res.data[0].name);
        setLoading(!loading);
        setTimeout(() => {
          setLoading(!loading);
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        if (error.message === 'Request failed with status code 401') {
          logOut();
        }
      });
  };

  useEffect(() => {
    // getAllDataProduct();
    getAllDataCategory();
    getProductPopular("popular", setProductPopular);
    getProductPopular("time-added", setProductTimeAdded);
    getAllDataCart("list", setDataCart);
    getAllDatas(setDataMenu);
  }, []);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [loading]);

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
              loading={loading}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
        </div>
        <div id="list" className="p-2 hidden md:block md:col-span-3">
          <Cart dataCart={dataCart} setDataCart={setDataCart} />
        </div>
        <div className="fixed md:invisible bottom-20 right-0 pr-5">
          {dataCart.quantity !== 0 ? (
            <>
              <CartMobile dataCart={dataCart} setDataCart={setDataCart} />
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default Hero;
