import axios from "axios";
import { setToken, removeToken } from "./localStorageUtils";

const setAuthToken = (token) => {
  if (token) {
    setToken(token);
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    removeToken(token);
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
