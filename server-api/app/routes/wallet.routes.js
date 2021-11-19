const express = require("express");
const router = express.Router();
const { authJwt } = require("../middlewares");
const controller = require("../controllers/wallet.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/wallet/addNewWallet", [authJwt.verifyToken], controller.createNewWallet);

    app.get("/api/wallet/getWalletDetail/:emailid", [authJwt.verifyToken], controller.getWalletDetail);

    app.get("/api/wallet/getTransactiondetails/:walletid", [authJwt.verifyToken], controller.getTransactiondetails);

    app.post("/api/wallet/userTransaction", [authJwt.verifyToken], controller.userTransactions);
};