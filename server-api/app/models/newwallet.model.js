const mongoose = require("mongoose");
const momentTimeZone = require('moment-timezone');
const getCurrentUTCTime = () => { return momentTimeZone.tz('UTC') };

const NewWallet = mongoose.model(
  "NewWallet",
  new mongoose.Schema({
    walletid:{type: String,require:true},
    name: {type: String,require:true},
    email: {type: String,require:true,unique: true},
    balance: {type: String,require:true},
    createdAt: { type: Date, default: getCurrentUTCTime() },
  })
);

module.exports = NewWallet;
