var express = require("express");
var router = express.Router();
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      uniqueSuffix +
        "-" +
        file.originalname.replace(/\s+/g, "-").toLowerCase()
    );
  },
});

const upload = multer({
  storage: storage,
});

const co_makers_file = [
  { name: "co_maker_file_1", maxCount: 1 },
  { name: "co_maker_file_2", maxCount: 1 },
  { name: "co_maker_file_3", maxCount: 1 },
  { name: "co_maker_file_4", maxCount: 1 },
  { name: "co_maker_file_5", maxCount: 1 },
];

const admin_controller = require("../controllers/admin");
const member_controller = require("../controllers/member");
const loan_controller = require("../controllers/loan");
const share_capital_controller = require("../controllers/share_capital");

/// ADMIN ROUTES
router.post("/loan-officer/login", admin_controller.loan_officer_login);
router.post("/admin/create", admin_controller.create);
router.get("/admins", admin_controller.list);

/// MEMBER ROUTES
router.post("/member/register", member_controller.register);
router.post("/member/login", member_controller.login);
router.post("/member/:id/status-update", member_controller.status_update);
router.post(
  "/loan/:member_id/application",
  upload.fields(co_makers_file),
  loan_controller.application
);
router.get("/members", member_controller.list);

router.get(
  "/pending-member/:member_id",
  member_controller.pending_member_detail
);
router.get("/pending-members", member_controller.pending_members);
router.get("/comakers/:member_id", member_controller.comakers);
router.get("/current-status/:member_id", member_controller.current_status);

/// LOAN ROUTES
router.post("/loan/:id/status-update", loan_controller.status_update);
router.post("/loan/:id/payment", loan_controller.payment);
router.get("/loans/updated", loan_controller.updated_loans);
router.get("/loans/approved", loan_controller.approved_loans);
router.get("/loans", loan_controller.list);
router.get("/pending-loans", loan_controller.pending_loans);
router.get("/loan/:id", loan_controller.detail);

/// SHARE CAPITAL ROUTES
router.post(
  "/share-capital/:member_id/payment",
  share_capital_controller.payment
);
router.get("/share-capital/:member_id", share_capital_controller.detail);

router.get(
  "/share-capitals/approved",
  share_capital_controller.approved_list
);

module.exports = router;
