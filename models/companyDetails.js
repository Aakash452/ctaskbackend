const mongoose = require('mongoose');

// Define the schema
const yourSchema = new mongoose.Schema({
  sname: {
    type: String,
    required: true,
  },
  idate: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  pnumber: {
    type: Number,
    required: true,
  },
  fname: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    required: true,
  },
  sector: {
    type: String,
    required: true,
  },
  bidea: {
    type: String,
  },
});

// Create the model
const cModel = mongoose.model('companyData', yourSchema);

module.exports = cModel;
