import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/userdetails/";

const addUserDetails = (userObj) => {
    return axios.post(API_URL + "adduser",{userObj} , {headers: authHeader() });
};

const getUsers = () => {
    return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
    return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
    return axios.get(API_URL + "admin", { headers: authHeader() });
};

const deleteUser = (userId) => {
    return axios.post(API_URL + `deleteUser/${userId}`)
}

const getRoleList = () => {
    return axios.get(API_URL + 'getRoleList', { headers: authHeader() })
}

export default {
    addUserDetails,
    getUsers,
    getModeratorBoard,
    getAdminBoard,
    deleteUser,
    getRoleList
};