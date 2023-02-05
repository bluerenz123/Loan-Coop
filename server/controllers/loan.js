const Loan = require("../models/loan");
const LoanPayment = require("../models/loan_payment");
const Status = require("../models/status");
const Member = require("../models/member");
const CashIn = require("../models/cash_in");
const CashOut = require("../models/cash_out");

exports.list = async (req, res, next) => {
  let list_loan = await Loan.find({});

  return res.json(list_loan);
};

exports.application = async (req, res, next) => {
  let comakers_email = [];
  Object.keys(req.body).forEach((key) => {
    if (key.includes("co_maker")) {
      comakers_email.push(req.body[key]);
    }
  });

  let filenames = [];
  Object.values(req.files).forEach((files) => {
    if (files[0].fieldname.includes("co_maker")) {
      let temp = files[0].filename;
      filenames.push(temp);
    }
  });

  const new_loan = new Loan({
    member: req.params.member_id,
    co_makers: [],
    co_makers_files: filenames,
    pay_slip_file: req.files.pay_slip_file[0].filename,

    type: req.body.type,
    principal: req.body.principal,
    terms: req.body.terms,

    amount: req.body.amount,
    interest_amount: req.body.interest_amount,
    retention_fee: req.body.retention_fee,
    service_fee: req.body.service_fee,
    monthly_deduction: req.body.monthly_deduction,

    balance: req.body.amount,
    remaining_terms: req.body.terms,

    status: "pending",
  });

  let member_status = await Status.findOne({
    member: req.params.member_id,
  });

  let comakers = await Member.find({ email: { $in: comakers_email } });

  member_status.current_loans.push(new_loan);
  new_loan.co_makers = comakers_email.map((email) =>
    comakers.find((c) => c.email === email)
  );
  new_loan.save();
  member_status.save();

  return res.json({ new_loan, member_status });
};

exports.status_update = async (req, res, next) => {
  let status = req.body.status;
  let loan_updated = await Loan.findByIdAndUpdate(
    req.params.id,
    {
      status: req.body.status,
    },
    { new: true }
  );
  if (status === "approved") {
    let member_status = await Status.findOneAndUpdate(
      {
        current_loans: { $in: [req.params.id] },
      },
      {
        $inc: {
          total_balance: loan_updated.balance,
          total_monthly_deductions: loan_updated.monthly_deduction,
        },
      },
      { new: true }
    );

    loan_updated.date_of_approval = new Date();
    loan_updated.credit_commitee_chairman =
      req.body.credit_commitee_chairman;

    loan_updated.save();
    member_status.save();

    let new_cash_out = new CashOut({
      member: member_status.member,
      purpose: loan_updated.type,
      amount: loan_updated.amount,
      terms: loan_updated.terms,
    });

    new_cash_out.save();

    return res.json({ loan_updated, member_status, new_cash_out });
  } else if (status === "rejected") {
    let member_status = await Status.findOneAndUpdate(
      {
        current_loans: { $in: [req.params.id] },
      },
      {
        $pull: { current_loans: req.params.id },
      },
      { new: true }
    );

    member_status.save();
    return res.json({ loan_updated, member_status });
  }
};

exports.payment = async (req, res, next) => {
  let status = await Status.findOneAndUpdate(
    { current_loans: { $in: req.params.id } },
    {
      $inc: {
        total_balance: -req.body.amount,
      },
    },
    { new: true }
  );

  let new_payment = new LoanPayment({
    member: status.member,
    loan: req.params.id,
    amount: req.body.amount,
    option: req.body.option,
  });

  let loan = await Loan.findByIdAndUpdate(
    req.params.id,
    {
      $inc: {
        balance: -req.body.amount,
        remaining_terms: -1,
      },
      $push: {
        loan_payments: new_payment,
      },
    },
    { new: true }
  );
  new_payment.balance = loan.balance;

  if (loan.balance <= 0) {
    status = await Status.findOneAndUpdate(
      { current_loans: { $in: [req.params.id] } },
      {
        $pull: {
          current_loans: loan._id,
        },
        $inc: {
          total_monthly_deductions: -loan.monthly_deduction,
        },
      },
      { new: true }
    );
  }

  new_payment.save();

  let new_cash_in = new CashIn({
    _id: new_payment._id,
    member: status.member,
    purpose: req.body.option,
    amount: req.body.amount,
  });

  new_cash_in.save();

  res.json({ status, new_payment, loan, new_cash_in });
};

exports.pending_loans = async (req, res, next) => {
  let pendings = await Loan.find({ status: "pending" })
    .populate("member")
    .populate("co_makers");

  return res.json(pendings);
};

exports.detail = async (req, res, next) => {
  let loan_detail = await Loan.findById(req.params.id)
    .populate("member")
    .populate("co_makers");

  return res.json(loan_detail);
};

exports.approved_loans = async (req, res, next) => {
  let approved_loans = await Loan.find({
    status: "approved",
    balance: { $gt: 0 },
  }).populate("member");

  let members = approved_loans.map((loan) => loan.member.id.toString());
  let unique_members = [...new Set(members)];

  let approved_members = await Member.find({
    _id: { $in: unique_members },
  });

  return res.json({
    members: approved_members,
    loans: approved_loans,
  });
};

exports.updated_loans = async (req, res, next) => {
  let status_loans = await Status.find()
    .populate("member")
    .populate("current_loans")
    .populate("share_capital");

  status_loans = status_loans.filter(
    (loan) => loan.member !== null && loan.member.status === "approved"
  );

  return res.json(status_loans);
};

exports.new_loans = async (req, res, next) => {
  let loans = await Loan.find({
    status: "approved",
  }).populate("member");

  loans = loans.filter((loan) => loan.terms === loan.remaining_terms);

  return res.json(loans);
};
