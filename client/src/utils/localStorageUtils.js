import jwtDecode from "jwt-decode";

export const getToken = () => {
  return localStorage.getItem("TOKEN-SOCIAL");
};

export const removeToken = () => {
  return localStorage.removeItem("TOKEN-SOCIAL");
};

export const setToken = (token) => {
  return localStorage.setItem("TOKEN-SOCIAL", token);
};

export const tokenExpired = () => {
  let token = getToken();
  const { exp } = jwtDecode(token);

  const expirationTime = exp * 1000;
  if (Date.now() >= expirationTime) {
    return true;
  }

  return false;
};

export const isLogin = (login, setLogin) => {
  if (login && !tokenExpired()) return true;
  setLogin(false);
  return false;
};
