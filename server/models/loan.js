const mongoose = require("mongoose");
const { DateTime } = require("luxon");
const Schema = mongoose.Schema;

const LoanSchema = new Schema(
  {
    member: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Member",
    },
    co_makers: [
      {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Member",
      },
    ],
    co_makers_files: [
      {
        type: String,
        required: true,
      },
    ],

    pay_slip_file: {
      type: String,
    },
    type: {
      type: String,
      enum: [
        "regular",
        "appliance",
        "multi-purpose",
        "balik-eskwela",
        "birthday",
        "emergency",
      ],
      required: true,
    },
    principal: {
      type: mongoose.Types.Decimal128,
      required: true,
      get: getValue,
    },
    terms: {
      type: Number,
      required: true,
    },

    amount: {
      type: mongoose.Types.Decimal128,
      required: true,
      get: getValue,
    },
    service_fee: {
      type: mongoose.Types.Decimal128,
      get: getValue,
    },
    retention_fee: {
      type: mongoose.Types.Decimal128,
      get: getValue,
      default: 0,
    },
    interest_amount: {
      type: mongoose.Types.Decimal128,
      get: getValue,
    },
    monthly_deduction: {
      type: mongoose.Types.Decimal128,
      required: true,
      get: getValue,
    },

    balance: {
      type: mongoose.Types.Decimal128,
      required: true,
      get: getValue,
    },
    remaining_terms: {
      type: Number,
      required: true,
    },
    accrued_penalty: {
      type: mongoose.Types.Decimal128,
      required: true,
      get: getValue,
      default: 0,
    },

    status: {
      type: String,
      required: true,
      enum: ["pending", "approved", "rejected"],
    },
    date_of_approval: {
      type: Date,
    },

    credit_commitee_chairman: {
      type: String,
    },
    credit_commitee_members: [
      {
        type: String,
      },
    ],

    loan_payments: [
      {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "LoanPayment",
      },
    ],
  },
  { timestamps: true, toJSON: { getters: true } }
);

LoanSchema.virtual("created_at").get(function () {
  return DateTime.fromJSDate(this.createdAt).toLocaleString(
    DateTime.DATE_MED
  );
});

function getValue(value) {
  if (typeof value !== "undefined") {
    return parseFloat(value.toString());
  }
  return value;
}

module.exports = mongoose.model("Loan", LoanSchema);
