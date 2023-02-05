const ShareCapital = require("../models/share_capital");
const ShareCapitalPayment = require("../models/share_capital_payment");
const CashIn = require("../models/cash_in");

exports.detail = async (req, res, next) => {
  let sc_status = await ShareCapital.findOne({
    member: req.params.member_id,
  }).populate("payments");
  return res.json(sc_status);
};

exports.payment = async (req, res, next) => {
  let sc_payment = new ShareCapitalPayment({
    member: req.params.member_id,
    option: req.body.option,
    amount: req.body.amount,
  });

  let sc_status = await ShareCapital.findOneAndUpdate(
    { member: req.params.member_id },
    {
      $inc: {
        total_amount: sc_payment.amount,
      },
      $push: {
        payments: sc_payment,
      },
    },
    { new: true }
  );
  sc_payment.balance = sc_status.total_amount;
  sc_payment.save();

  let new_cash_in = new CashIn({
    _id: sc_payment._id,
    member: req.params.member_id,
    purpose: "share-capital",
    amount: sc_payment.amount,
  });

  new_cash_in.save();

  res.json({ sc_status, sc_payment, new_cash_in });
};

exports.withdraw = async (req, res, next) => {};

exports.approved_list = async (req, res, next) => {
  let approved_members = await ShareCapital.find().populate({
    path: "member",
    match: { status: "approved" },
  });

  res.json(approved_members);
};
