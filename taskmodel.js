const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  Task: { type: String, required: true },
  Date: { type: Date, required: true },
  
});

const createmodel = mongoose.model("usertaskmodel", userSchema);

module.exports = createmodel;
