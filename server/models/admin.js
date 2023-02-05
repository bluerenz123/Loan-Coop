const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },

    position: {
      type: String,
      enum: ["loan-officer", "treasurer", "board-of-director"],
      required: true,
    },

    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true, toJSON: { getters: true } }
);

AdminSchema.virtual("name").get(function () {
  return this.last_name
    ? `${this.first_name} ${this.last_name}`
    : this.first_name;
});

module.exports = mongoose.model("Admin", AdminSchema);
