const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.wallet=require("./newwallet.model");
db.transactiondetails=require("./transactiondetail.model");

db.ROLES = ["user", "admin", "chart"];

module.exports = db;