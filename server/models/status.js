const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StatusSchema = new Schema(
  {
    member: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Member",
    },

    share_capital: {
      type: mongoose.Types.ObjectId,
      ref: "ShareCapital",
    },
    current_loans: [
      {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Loan",
      },
    ],

    total_balance: {
      type: mongoose.Types.Decimal128,
      required: true,
      get: getValue,
      default: 0,
    },
    total_monthly_deductions: {
      type: mongoose.Types.Decimal128,
      required: true,
      get: getValue,
      default: 0,
    },
    total_accrued_penalty: {
      type: mongoose.Types.Decimal128,
      required: true,
      get: getValue,
      default: 0,
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

module.exports = mongoose.model("Status", StatusSchema);
