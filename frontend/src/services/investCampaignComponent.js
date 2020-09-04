import axios from "axios";
import config from "../utils/config";

const url = "/api/crowdfunding/invest_campaign";
axios.defaults.baseURL = config.BASE_URL;

const investCampaign = (newObject) => {
  const request = axios.post(url, newObject);
  return request.then((res) => res.data);
};

export default investCampaign;
