const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShareCapitalSchema = new Schema(
  {
    member: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Member",
    },
    initial_investment: {
      type: mongoose.Types.Decimal128,
      required: true,
      get: getValue,
    },
    monthly_investment: {
      type: mongoose.Types.Decimal128,
      required: true,
      get: getValue,
      default: 100,
    },
    total_amount: {
      type: mongoose.Types.Decimal128,
      required: true,
      get: getValue,
      default: 0,
    },
    payments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "ShareCapitalPayment",
      },
    ],
  },
  { timestamps: true, toJSON: { getters: true } }
);

function getValue(value) {
  if (typeof value !== "undefined") {
    return parseFloat(value.toString());
  }
  return value;
}

module.exports = mongoose.model("ShareCapital", ShareCapitalSchema);
