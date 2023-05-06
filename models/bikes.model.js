const mongoose = require("mongoose");

const bikeSchema = new mongoose.Schema({
  type: String,
  make: String,
  model: String,
});

const Bike = mongoose.model("Bike", bikeSchema);

module.exports = { Bike };
