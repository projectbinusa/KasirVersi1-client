import axios from "axios";
import { API_PRODUCT, API_URL } from "../utils/baseURL";
import authHeader from "./auth-header";

const getAllDataProduct = () => {
  return axios.get(API_PRODUCT + "/all", { headers: authHeader() });
};

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  getAllDataProduct
};