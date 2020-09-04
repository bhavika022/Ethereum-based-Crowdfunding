import axios from "axios";
import config from "../utils/config";

const url = "/api/crowdfunding/create_campaign";
axios.defaults.baseURL = config.BASE_URL;

const createCampaign = (newObject) => {
  const request = axios.post(url, newObject, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return request.then((res) => res.data);
};

export default createCampaign;
