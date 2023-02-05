const mongoose = require("mongoose");
const { DateTime } = require("luxon");
const Schema = mongoose.Schema;

const ShareCapitalPaymentSchema = new Schema(
  {
    member: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Member",
    },
    option: {
      type: String,
      enum: ["otc", "pay-slip", "membership"],
    },
    receipt_id: {
      type: String,
    },
    amount: {
      type: mongoose.Types.Decimal128,
      get: getValue,
    },
    balance: {
      type: mongoose.Types.Decimal128,
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

ShareCapitalPaymentSchema.virtual("created_at").get(function () {
  return DateTime.fromJSDate(this.createdAt).toLocaleString(
    DateTime.DATE_MED
  );
});

module.exports = mongoose.model(
  "ShareCapitalPayment",
  ShareCapitalPaymentSchema
);
