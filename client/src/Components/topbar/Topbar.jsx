import "./topbar.css";
import { Link } from "react-router-dom";
import { useEffect, useContext } from "react";
import { LoginContext } from "../../Context/LoginContext";
import { removeToken } from "../../utils/localStorageUtils";
import { isLogin } from "../../utils/localStorageUtils";

const Topbar = () => {
  const [login, setLogin] = useContext(LoginContext);
  useEffect(() => {
    localStorage.getItem("token") ? setLogin(true) : setLogin(false);
  }, []);
  return (
    <div className="top">
      <div className="topCenter">
        <ul className="topList">
          {isLogin(login, setLogin) ? (
            <>
              <li>
                <Link className="topListItem" to="/">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link className="topListItem" to="/users">
                  Users
                </Link>
              </li>
              <li>
                <Link className="topListItem" to="/profile">
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  className="topListItem"
                  to="/login"
                  onClick={() => {
                    setLogin(false);
                    removeToken();
                  }}
                >
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <ul className="topList">
              <li>
                <Link className="topListItem" to="/login">
                  Login
                </Link>
              </li>
              <li>
                <Link className="topListItem" to="/register">
                  Register
                </Link>
              </li>
            </ul>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Topbar;
