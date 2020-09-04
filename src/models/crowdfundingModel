const mongoose = require("mongoose");

const crowdfundingSchema = new mongoose.Schema({
  campaignID: {
    type: Number,
    required: true,
  },
  campaignName: {
    type: String,
    minlength: 2,
    required: true,
  },
  campaignDes: {
    type: String,
    required: true,
  },
  campaignAddress: {
    type: String,
    required: true,
  },
  campaignImage: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  targetAmount: {
    type: Number,
    required: true,
  },
  currentAmount: {
    type: Number,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
});

const Crowdfunding = mongoose.model("Crowdfunding", crowdfundingSchema);

module.exports = Crowdfunding;
