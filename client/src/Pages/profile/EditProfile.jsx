import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { TextField } from "../../Components/TextField/TextField";
import { postData } from "../../utils/crudUtils";
import { useLocation, useHistory } from "react-router-dom";

const EditProfile = ({ profile }) => {
  const URL =
    /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;

  const location = useLocation();
  const history = useHistory();
  const validate = Yup.object({
    handle: Yup.string().required("Handle is Required"),
    skills: Yup.string(),
    status: Yup.string().required("Status is Required"),

    company: Yup.string(),
    bio: Yup.string(),
    website: Yup.string().matches(URL, "Enter a valid url"),
    location: Yup.string(),
    githubusername: Yup.string(),

    youtube: Yup.string().matches(URL, "Enter a valid url"),
    linkedin: Yup.string().matches(URL, "Enter a valid url"),
    facebook: Yup.string().matches(URL, "Enter a valid url"),
    instagram: Yup.string().matches(URL, "Enter a valid url"),
    twitter: Yup.string().matches(URL, "Enter a valid url"),
  });
  return (
    <Formik
      initialValues={{
        handle: location.state.profile.handle,
        skills: location.state.profile?.skills?.join(", "),
        status: location.state.profile.status,

        company: location.state.profile.company,
        bio: location.state.profile.bio,
        website: location.state.profile.website,
        location: location.state.profile.location,
        githubusername: location.state.profile.githubusername,

        youtube: location.state.profile.youtube,
        linkedin: location.state.profile.linkedin,
        facebook: location.state.profile.facebook,
        instagram: location.state.profile.instagram,
        twitter: location.state.profile.twitter,
      }}
      validationSchema={validate}
      onSubmit={async (values) => {
        console.log(values);
        const res = await postData("/profile", {
          handle: values.handle,
          skills: values.skills,
          status: values.status,

          company: values.company,
          bio: values.bio,
          website: values.website,
          location: values.location,
          githubusername: values.githubusername,

          youtube: values.youtube,
          linkedin: values.linkedin,
          facebook: values.facebook,
          instagram: values.instagram,
          twitter: values.twitter,
        });

        history.push("/profile");
        console.log(res);
      }}
    >
      {(formik) => (
        <div className="tab-content pt-3">
          <div className="tab-pane active">
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
                      <TextField type="text" placeholder="Bio*" name="bio" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-sm-12 mb-3">
                    <div className="mb-2">
                      <b>Other Details</b>
                    </div>
                    <div className="form-group">
                      <label>Company</label>
                      <TextField
                        type="text"
                        placeholder="Company"
                        name="company"
                      />
                    </div>
                    <div className="form-group">
                      <label>Website</label>
                      <TextField
                        type="text"
                        placeholder="Website"
                        name="website"
                      />
                    </div>
                    <div className="form-group">
                      <label>Location</label>
                      <TextField
                        type="text"
                        placeholder="Location"
                        name="location"
                      />
                    </div>
                    <div className="form-group">
                      <label>Github Username</label>
                      <TextField
                        type="text"
                        placeholder="Github Username"
                        name="githubusername"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-sm-12 mb-3">
                    <div className="mb-2">
                      <b>Social Media Accounts</b>
                    </div>
                    <div className="form-group">
                      <label>Facebook</label>
                      <TextField
                        type="text"
                        placeholder="Facebook"
                        name="facebook"
                      />
                    </div>
                    <div className="form-group">
                      <label>Instagram</label>
                      <TextField
                        type="text"
                        placeholder="Instagram"
                        name="instagram"
                      />
                    </div>
                    <div className="form-group">
                      <label>Youtube</label>
                      <TextField
                        type="text"
                        placeholder="Youtube"
                        name="youtube"
                      />
                    </div>
                    <div className="form-group">
                      <label>LinkedIn</label>
                      <TextField
                        type="text"
                        placeholder="LinkedIn"
                        name="linkedin"
                      />
                    </div>
                    <div className="form-group">
                      <label>Twitter</label>
                      <TextField
                        type="text"
                        placeholder="Twitter"
                        name="twitter"
                      />
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

export default EditProfile;
