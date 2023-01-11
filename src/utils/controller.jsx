import axios from "axios";
import {
  API_CART,
  API_CATEGORY,
  API_DUMMY,
  API_PRODUCT,
  API_Sidebar,
} from "./baseURL";

export const getAllData = async (path, setPath) => {
  try {
    const response = await fetch(`${API_DUMMY}/${path}`, {
      method: "GET",
    });
    if (response.ok) {
      const data = await response.json();
      setPath(data);
    }
  } catch (err) {
    console.log(err);
  }
};

export const getAllDataSidebar = async (path, setPath) => {
  await axios
    .get(`${API_Sidebar}/${path}`)
    .then((res) => {
      setPath(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getAllDataCategory = async (path, setPath) => {
  await axios
    .get(`${API_CATEGORY}/${path}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      setPath(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getAllDataProduct = async (path, setPath) => {
  await axios
    .get(`${API_PRODUCT}/${path}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      setPath(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getAllDataCart = async (path, setPath) => {
  await axios
    .get(`${API_CART}/${path}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      setPath(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
