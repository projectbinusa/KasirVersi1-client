import axios from "axios";
import {
  API_CART,
  API_CATEGORY,
  API_DUMMY,
  API_HISTORY,
  API_PRODUCT,
  API_Sidebar,
} from "./baseURL";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

export const getAllDatas = (setPath) => {
  UserService.getAllDataProduct().then(
    (response) => {
      setPath(response.data);
    },
    (error) => {
      const _content =
        (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

      setPath(_content);

      if (error.response && error.response.status === 401) {
        EventBus.dispatch("logout");
      }
    }
  );
};


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
      localStorage.setItem("category", res.data[0].name);
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

export const getProductPopular = async (path, setPath) => {
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

export const getProductTimeAdded = async (path, setPath) => {
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

export const getAllHistoryOrder = async (path, setPath) => {
  await axios
    .get(`${API_HISTORY}/${path}`, {
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

export const deleteCategory = async (item, setPath) => {
  await axios
    .delete(`${API_CATEGORY}/delete/${item}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then(() => {
      getAllDataCategory("all", setPath);
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteProduct = async (item, setPath) => {
  await axios
    .delete(`${API_PRODUCT}/delete/${item}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then(() => {
      getAllDataProduct("all", setPath);
    })
    .catch((err) => {
      console.log(err);
    });
};
