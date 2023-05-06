const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  wheels: { type: Number, required: true },
  vehicle: { type: String, required: true },
  model: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
})

const bookingModel = mongoose.model("booking", bookingSchema);

module.exports = {
  bookingModel,
};
