import axios from "axios";
import config from "../utils/config";

const url = "/api/user_auth/signin";
axios.defaults.baseURL = config.BASE_URL;

const verifyUser = (newObject) => {
  const request = axios.post(url, newObject);
  return request.then((res) => res.data);
};

export default verifyUser;
