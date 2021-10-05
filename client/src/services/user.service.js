import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/userdetails/";

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

const deleteUser =(userId)=>{
  return axios.delete(API_URL+`deleteUser/${userId}`,{ headers: authHeader()})
}

export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  deleteUser
};