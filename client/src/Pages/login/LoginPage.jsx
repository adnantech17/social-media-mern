import "./login.scss";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { LoginContext } from "../../Context/LoginContext";
import { Form, Formik } from "formik";
import { TextField } from "../../Components/TextField/TextField";
import * as Yup from "yup";
import { postData } from "../../utils/crudUtils";
import setAuthToken from "../../utils/setAuthToken";

const LoginPage = () => {
  const [err, setErr] = useState("");
  const validate = Yup.object({
    email: Yup.string()
      .min(6, "Email must be at least 6 character")
      .required("Email is Required")
      .email("Email is invalid"),
    password: Yup.string().required("Password is Required."),
  });
  const [, setLogin] = useContext(LoginContext);

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validate}
      onSubmit={async (values) => {
        const res = await postData("/users/login", {
          email: values.email,
          password: values.password,
        });

        if (res !== null) {
          const { token } = res.data;
          setAuthToken(token);
          setLogin(true);
          setErr("");
        } else {
          console.log("Error Login!!");
        }
      }}
    >
      {(formik) => (
        <div className="login-page">
          <div className="form">
            {err !== "" && <h6 className="error-top">* {err}</h6>}
            <Form className="login-form">
              <TextField type="text" placeholder="Email*" name="email" />
              <TextField
                type="password"
                placeholder="Password*"
                name="password"
              />
              <button>login</button>
              <p className="message">
                Not registered? <Link to="/register">Create an account</Link>
              </p>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default LoginPage;
