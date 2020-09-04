import axios from "axios";
import config from "../utils/config";

const url = "/api/crowdfunding/get_one_campaign";
axios.defaults.baseURL = config.BASE_URL;

const getAllCampaigns = (param) => {
  const request = axios.get(url + "/" + param);
  return request.then((res) => res.data);
};

export default getAllCampaigns;
