const mongoose = require("mongoose");
mongoose.pluralize(null);

// Modifiez les champs latitude et longitude pour utiliser le type Number
const ip_schema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  addressIp: String,
  browser: String,
  os: String,
  device: String,
  date: String,
  latitude: Number, // Utiliser Number pour latitude et longitude
  longitude: Number, // Utiliser Number pour latitude et longitude
});

module.exports = mongoose.model("IPData", ip_schema);
