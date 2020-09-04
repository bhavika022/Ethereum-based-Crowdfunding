import axios from "axios";
import config from "../utils/config";

const url = "/api/crowdfunding/home_page";
axios.defaults.baseURL = config.BASE_URL;

const homePage = (newObject) => {
  const request = axios.post(url, newObject);
  return request.then((res) => res.data);
};

export default homePage;
