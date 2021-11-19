import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/wallet/";

const addNewWalletDetail = (walletDetail) => {
    return axios.post(API_URL + "addNewWallet", { walletDetail }, { headers: authHeader() });
};

const getWalletDetail = (emailid) => {
    return axios.get(API_URL + `getWalletDetail/${emailid}`, { headers: authHeader() });
}

const userTransaction=(transDetail)=> {
    return axios.post(API_URL + "userTransaction", { transDetail }, { headers: authHeader() });
}

const getTransactiondetails=(walletId)=> {
    return axios.get(API_URL +`getTransactiondetails/${walletId}`, { headers: authHeader() });
}

export default {
    addNewWalletDetail,
    getWalletDetail,
    userTransaction,
    getTransactiondetails
}