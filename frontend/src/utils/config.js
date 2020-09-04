require("dotenv").config();

const BASE_URL = process.env.BASE_URL || "http://localhost:3450";
const RPC_URL = process.env.RPC_URL || "http://localhost:7545";
const CONTRACT_ADDRESS =
  process.env.CONTRACT_ADDRESS || "0xE0F5A1c7C6f5492d6cC8bF2f4357FBFcD24Bbd6e";

module.exports = {
  BASE_URL,
  RPC_URL,
  CONTRACT_ADDRESS,
};
