import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { TextField } from "../../Components/TextField/TextField";
import { postData } from "../../utils/crudUtils";
import { useHistory } from "react-router-dom";

const CreateProfile = ({ profile }) => {
  const history = useHistory();
  const validate = Yup.object({
    handle: Yup.string().required("Handle is Required"),
    skills: Yup.string().required("Skills are Required"),
    status: Yup.string().required("Status is Required"),
    bio: Yup.string(),
  });
  return (
    <Formik
      initialValues={{
        handle: "",
        skills: "",
        status: "",
        bio: "",
      }}
      validationSchema={validate}
      onSubmit={async (values) => {
        console.log(values);
        const res = await postData("/profile", {
          handle: values.handle,
          skills: values.skills,
          status: values.status,
          bio: values.bio,
        });

        history.push("/profile");
        console.log(res);
      }}
    >
      {(formik) => (
        <div className="tab-content pt-3">
          <div className="tab-pane active">
            <h3>Complete Your Profile First</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                formik.handleSubmit();
              }}
            >
              <div className="edit-profile-container">
                <div className="row">
                  <div className="form-group"></div>
                  <div className="form-group">
                    <label>Handle</label>
                    <TextField
                      type="text"
                      placeholder="Handle*"
                      name="handle"
                    />
                    <div className="form-group">
                      <label>Status</label>
                      <TextField
                        type="text"
                        placeholder="Status*"
                        name="status"
                      />
                    </div>
                    <div className="form-group">
                      <label>Skills* (Separated By Comma(,) )</label>
                      <TextField
                        type="text"
                        placeholder="Skills*"
                        name="skills"
                      />
                    </div>
                    <div className="form-group">
                      <label>About</label>
                      <TextField type="text" placeholder="Bio" name="bio" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col d-flex justify-content-end">
                    <button className="btn btn-primary" type="submit">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default CreateProfile;
