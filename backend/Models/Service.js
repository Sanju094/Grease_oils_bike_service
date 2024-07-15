//Service Schema
const mongoose = require("mongoose");

const Service = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneno: {
    type: Number,
    required: true,
  },
  serv: {
    type: String,
    required: true,
  },
  vnum: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return today;
    },
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["received", "ready", "completed"],
    default: "received",
  },
  stna: {
    type: String,
  },
});
module.exports = mongoose.model("Services", Service);
