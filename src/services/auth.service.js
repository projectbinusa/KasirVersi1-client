import axios from "axios";
import { logOut } from "../context/AuthContext";
import { API_AUTH } from "../utils/baseURL";

const register = (username, email, password) => {
  return axios.post(API_AUTH + "/register", {
    username,
    email,
    password,
  });
};

const login = (email, password) => {
  return axios
    .post(API_AUTH + "/login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("id", response.data.data.userId);
        localStorage.setItem("activeTab", "Home"); 
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("id");
  localStorage.removeItem("category");
  localStorage.removeItem("activeTab");
  logOut();
};

export default {
  register,
  login,
  logout,
};
