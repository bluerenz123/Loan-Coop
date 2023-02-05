const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

// Member Schema
const MemberSchema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: String,

    department: String,
    contact_number: String,

    email: { type: String, required: true },
    password: { type: String, required: true },

    pay_slip_file: String,
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      required: true,
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

MemberSchema.virtual("name").get(function () {
  return this.last_name
    ? `${this.first_name} ${this.last_name}`
    : this.first_name;
});

MemberSchema.virtual("url").get(function () {
  return `/member/${this._id}`;
});

MemberSchema.virtual("created_at").get(function () {
  return DateTime.fromJSDate(this.createdAt).toLocaleString(
    DateTime.DATE_MED
  );
});

module.exports = mongoose.model("Member", MemberSchema);
