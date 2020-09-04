import axios from "axios";
import config from "../utils/config";

const url = "/api/user_auth/signup";
axios.defaults.baseURL = config.BASE_URL;

const createAll = (newObject) => {
  const request = axios.post(url, newObject);
  return request.then((res) => res.data);
};

export default createAll;
