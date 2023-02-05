const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const LoanPaymentSchema = new Schema(
  {
    member: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Member",
    },
    loan: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Loan",
    },
    option: {
      type: String,
      enum: ["otc", "pay-slip"],
    },
    receipt_id: {
      type: String,
    },
    amount: {
      type: mongoose.Types.Decimal128,
      required: true,
      get: getValue,
    },

    balance: {
      type: mongoose.Types.Decimal128,
      required: true,
      get: getValue,
    },
  },
  { timestamps: true, toJSON: { getters: true } }
);

function getValue(value) {
  if (typeof value !== "undefined") {
    return parseFloat(value.toString());
  }
  return value;
}

LoanPaymentSchema.virtual("created_at").get(function () {
  return DateTime.fromJSDate(this.createdAt).toLocaleString(
    DateTime.DATE_MED
  );
});

module.exports = mongoose.model("LoanPayment", LoanPaymentSchema);
