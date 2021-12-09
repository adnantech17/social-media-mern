import axios from "axios";

export const getData = async (url) => {
  try {
    var data = await axios.get(url);
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const postData = async (url, data) => {
  try {
    var res = await axios.post(url, data);
    return res;
  } catch (err) {
    console.log(err);
    return null;
  }
};
