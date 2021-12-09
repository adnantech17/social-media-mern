import { Form, Formik } from "formik";
import React, { useContext } from "react";
import { postData } from "../../utils/crudUtils";
import { TextArea } from "../TextField/TextArea";
import * as Yup from "yup";
import "./postform.scss";
import { LoginContext } from "../../Context/LoginContext";

const PostForm = () => {
  const [, , user] = useContext(LoginContext);
  const validate = Yup.object({
    text: Yup.string()
      .min(10, "Post must be at least 10 characters")
      .max(300, "Post can be at max 300 characters")
      .required("Text is Required"),
  });
  return (
    <Formik
      initialValues={{
        text: "",
      }}
      validationSchema={validate}
      onSubmit={async (values) => {
        const res = await postData("/posts", {
          text: values.text,
          name: user.name,
          avatar: user.avatar,
        });
        console.log(res);
      }}
    >
      {(formik) => (
        <div class="form-group container">
          <div className="post-form">
            <Form className="login-form">
              <TextArea
                type="text"
                placeholder="Write Something Here*"
                name="text"
              />
              <div className="d-flex">
                <button class="btn btn-info ms-auto">Submit</button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default PostForm;
