const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const CashOutSchema = new Schema(
  {
    member: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Member",
    },
    receipt_id: {
      type: String,
    },
    purpose: {
      type: String,
    },
    amount: {
      type: mongoose.Types.Decimal128,
      required: true,
      get: getValue,
    },
    terms: {
      type: Number,
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

CashOutSchema.virtual("date").get(function () {
  return DateTime.fromJSDate(this.createdAt).toLocaleString(
    DateTime.DATE_MED
  );
});

module.exports = mongoose.model("CashOut", CashOutSchema);
