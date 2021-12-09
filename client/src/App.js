import "./App.css";
import RegisterPage from "./Pages/register/RegisterPage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Topbar from "./Components/topbar/Topbar";
import Footer from "./Components/footer/Footer";
import Profile from "./Pages/profile/Profile";
import EditProfile from "./Pages/profile/EditProfile";
import { useContext, useEffect } from "react";
import { LoginContext } from "./Context/LoginContext";
import LoginPage from "./Pages/login/LoginPage";
import setAuthToken from "./utils/setAuthToken";
import { getToken } from "./utils/localStorageUtils";
import Dashboard from "./Pages/dashboard/Dashboard";
import { getData } from "./utils/crudUtils";
import { isLogin } from "./utils/localStorageUtils";
import Users from "./Pages/users/Users";

function App() {
  const [login, setLogin, user, setUser] = useContext(LoginContext);

  useEffect(() => {
    const getUser = async () => {
      const res = await getData("/users/current");
      if (res) setUser(res.data);
    };
    setLogin(true);
    setAuthToken(getToken());
    getUser();
  }, []);
  return (
    <Router>
      <Topbar />

      <div className="App">
        <div className="page">
          <Switch>
            <Route path="/users">
              {isLogin(login, setLogin) ? <Users /> : <Redirect to="/login" />}
            </Route>
            <Route path="/profile">
              {isLogin(login, setLogin) ? (
                <Profile />
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
            <Route path="/update-profile">
              {isLogin(login, setLogin) ? (
                <EditProfile />
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
            <Route path="/login">
              {isLogin(login, setLogin) ? <Redirect to="/" /> : <LoginPage />}
            </Route>
            <Route path="/register">
              <RegisterPage />
            </Route>
            <Route exact path="/">
              {isLogin(login, setLogin) ? (
                <Dashboard />
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
          </Switch>
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
