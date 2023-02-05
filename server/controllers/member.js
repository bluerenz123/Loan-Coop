const Decimal = require("decimal.js");
const { DateTime } = require("luxon");

const Member = require("../models/member");
const ShareCapital = require("../models/share_capital");
const ShareCapitalPayment = require("../models/share_capital_payment");
const Status = require("../models/status");

exports.list = (req, res, next) => {
  Member.find().exec((err, result) => {
    if (err) return next(err);

    return res.json(result);
  });
};

exports.pending_members = async (req, res, next) => {
  let members = await Member.find({ status: "pending" });

  let share_capitals = await ShareCapital.find({
    member: { $in: members },
  }).populate("member");

  return res.json(share_capitals);
};

exports.pending_member_detail = async (req, res, next) => {
  let member = await ShareCapital.findOne({
    member: req.params.member_id,
  }).populate("member");

  return res.json(member);
};

exports.comakers = (req, res, next) => {
  Member.find({
    _id: { $ne: req.params.member_id },
    status: "approved",
  }).exec((err, result) => {
    if (err) {
      return next(err);
    }

    return res.json(result);
  });
};

exports.register = (req, res, next) => {
  console.log(req.file);

  const new_member = new Member({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    department: req.body.department,
    contact_number: req.body.contact_number,
    email: req.body.email,
    password: req.body.password,
    pay_slip_file: req.file.filename,
    status: "pending",
  });

  const new_share_capital = new ShareCapital({
    member: new_member,
    monthly_investment: req.body.monthly_investment,
    initial_investment: req.body.initial_investment,
    total_amount: req.body.initial_investment,
  });

  const new_status = new Status({
    member: new_member,
    share_capital: new_share_capital,
  });

  new_member.save();
  new_share_capital.save();
  new_status.save();

  return res.json({ new_member, new_status, new_share_capital });
};

exports.status_update = async (req, res, next) => {
  let status = req.body.status;

  if (status === "approved") {
    let member = await Member.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { returnDocument: "after" }
    );

    let sc_status = await ShareCapital.findOne({ member: req.params.id });

    let new_sc_payment = new ShareCapitalPayment({
      member: req.params.id,
      receipt_id: this._id,
      amount: sc_status.initial_investment,
      option: "membership",
      balance: sc_status.initial_investment,
    });

    let sc_update = await ShareCapital.findByIdAndUpdate(
      sc_status._id,
      {
        payments: [new_sc_payment],
        total_amount: sc_status.initial_investment,
      },
      { new: true }
    );

    new_sc_payment.save();

    res.json({ member, new_sc_payment, sc_update });
  } else {
    let member = await Member.findByIdAndDelete(req.params.id);
    let status = await Status.findOneAndDelete({ member: req.params.id });
    let share_capital = await ShareCapital.findOneAndDelete({
      member: req.params.id,
    });

    res.json({ member, status, share_capital });
  }
};

exports.login = async (req, res, next) => {
  let member = await Member.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (member === null) {
    return res.json({ error: "Wrong input email or password!" });
  }

  return res.json(member);
};

exports.current_status = async (req, res, next) => {
  let result = await Status.findOne({
    member: req.params.member_id,
  })
    .populate("share_capital")
    .populate({
      path: "current_loans",
      populate: "loan_payments",
    });

  res.json(result);
};
