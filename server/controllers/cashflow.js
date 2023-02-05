const CashIn = require("../models/cash_in");
const CashOut = require("../models/cash_out");

exports.cash_in_list = async (req, res, next) => {
  let list = await CashIn.find({}).populate("member");

  res.json(list);
};
exports.cash_out_list = async (req, res, next) => {
  let list = await CashOut.find({}).populate("member");

  res.json(list);
};
