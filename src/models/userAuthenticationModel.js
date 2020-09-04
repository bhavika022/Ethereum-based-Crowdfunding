const mongoose = require("mongoose");

const userAuthSchema = new mongoose.Schema({
  userName: {
    type: String,
    minlength: 2,
    required: true,
  },
  email: {
    type: String,
    minlength: 2,
  },
  password: {
    type: String,
    minlength: 2,
  },
});

const UserAuth = mongoose.model("UserAuth", userAuthSchema);

module.exports = UserAuth;
