const Admin = require("../models/admin");

exports.list = async (req, res, next) => {
  let list = await Admin.find({});

  return res.json(list);
};

exports.create = async (req, res, next) => {
  let new_admin = new Admin({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    position: req.body.position,
    email: req.body.email,
    password: req.body.password,
  });

  new_admin.save();
  console.log(new_admin);

  return res.json(new_admin);
};

exports.loan_officer_login = async (req, res, next) => {
  let LF_user = await Admin.findOne({
    position: "loan-officer",
    email: req.body.email,
    password: req.body.password,
  });

  if (LF_user === null) {
    return res.json({ error: "Wrong input email or password!" });
  }

  return res.json(LF_user);
};
exports.treasurer_login = async (req, res, next) => {
  let Trs_user = await Admin.findOne({
    position: "treasurer",
    email: req.body.email,
    password: req.body.password,
  });

  if (Trs_user === null) {
    return res.json({ error: "Wrong input email or password!" });
  }

  return res.json(Trs_user);
};

exports.bod_login = async (req, res, next) => {
  let Trs_user = await Admin.findOne({
    position: "board-of-director",
    email: req.body.email,
    password: req.body.password,
  });

  if (Trs_user === null) {
    return res.json({ error: "Wrong input email or password!" });
  }

  return res.json(Trs_user);
};
