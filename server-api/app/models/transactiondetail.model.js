const mongoose = require("mongoose");
const momentTimeZone = require('moment-timezone');
const getCurrentUTCTime = () => { return momentTimeZone.tz('UTC') };

const TransactionDetail = mongoose.model(
  "TransactionDetail",
  new mongoose.Schema({
    walletid:{type: String,require:true},
    amount: {type: String,require:true},
    balance: {type: String,require:true},
    description: {type: String,require:true},
    createdAt: { type: Date, default: getCurrentUTCTime() },
    type:{type: String,require:true}
  })
);

module.exports = TransactionDetail;
