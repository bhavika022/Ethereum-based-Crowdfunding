import axios from "axios";
import config from "../utils/config";

const url = "/api/crowdfunding/get_all_campaigns";
axios.defaults.baseURL = config.BASE_URL;

const getAllCampaigns = () => {
  const request = axios.get(url);
  return request.then((res) => res.data);
};

export default getAllCampaigns;
