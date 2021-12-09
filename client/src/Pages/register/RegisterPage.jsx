import "./register.scss";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { Form, Formik } from "formik";
import { TextField } from "../../Components/TextField/TextField";
import * as Yup from "yup";
import { postData } from "../../utils/crudUtils";
import setAuthToken from "../../utils/setAuthToken";

const RegisterPage = () => {
  const [err, setErr] = useState("");
  const history = useHistory();
  const validate = Yup.object({
    name: Yup.string()
      .min(4, "Name must be at least 4 character")
      .required("Name is Required"),
    email: Yup.string()
      .min(6, "Email must be at least 6 character")
      .required("Email is Required")
      .email("Email is invalid"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .required("Password is Required."),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .required("Confirm Password is Required."),
  });
  return (
    <Formik
      initialValues={{
        email: "",
        name: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={validate}
      onSubmit={async (values) => {
        const res = await postData("/users/login", {
          name: values.name,
          email: values.email,
          password: values.password,
          password2: values.confirmPassword,
        });

        if (res !== null) {
          history.push("/login");
          setErr("");
        } else {
          setErr("Error signup");
        }
      }}
    >
      {(formik) => (
        <div className="login-page">
          <div className="form">
            {err !== "" && <h6 className="error-top">* {err}</h6>}
            <Form className="register-form">
              <TextField type="text" placeholder="Email Address" name="email" />
              <TextField type="text" placeholder="Name" name="name" />
              <TextField
                type="password"
                placeholder="Password"
                name="password"
              />
              <TextField
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
              />
              <button>create</button>
              <p className="message">
                Already registered? <Link to="/login">Sign In</Link>
              </p>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default RegisterPage;
