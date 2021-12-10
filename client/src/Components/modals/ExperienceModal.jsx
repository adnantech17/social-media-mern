import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { TextField } from "../../Components/TextField/TextField";
import { postData } from "../../utils/crudUtils";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const ExperienceModal = ({ modalOpen, setModalOpen }) => {
  const validate = Yup.object({
    title: Yup.string().required("Title is Required"),
    company: Yup.string().required("Company are Required"),
    location: Yup.string().required("Location is Required"),
    from: Yup.date(),
    to: Yup.date(),
  });
  return (
    <div>
      <Modal
        isOpen={modalOpen}
        onAfterOpen={() => setModalOpen(true)}
        onRequestClose={() => setModalOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <Formik
          initialValues={{
            title: "",
            company: "",
            location: "",
            from: new Date(),
            to: new Date(),
          }}
          validationSchema={validate}
          onSubmit={async (values) => {
            const res = await postData("/profile/experience", {
              title: values.title,
              company: values.company,
              location: values.location,
              from: values.from,
              to: values.to,
            });
            if (res !== null) setModalOpen(false);

            console.log(values);
          }}
        >
          {(formik) => (
            <div className="tab-content pt-3">
              <div className="tab-pane active">
                <h3>Add New Experience</h3>
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
                        <label>Title</label>
                        <TextField
                          type="text"
                          placeholder="Title*"
                          name="title"
                        />
                        <div className="form-group">
                          <label>Company</label>
                          <TextField
                            type="text"
                            placeholder="Company*"
                            name="company"
                          />
                        </div>
                        <div className="form-group">
                          <label>Location*</label>
                          <TextField
                            type="text"
                            placeholder="Location*"
                            name="location"
                          />
                        </div>
                        <div className="form-group">
                          <label>From</label>
                          <TextField
                            type="date"
                            placeholder="Bio"
                            name="from"
                          />
                        </div>
                        <div className="form-group">
                          <label>To</label>
                          <TextField type="date" placeholder="Bio" name="to" />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col d-flex justify-content-end">
                        <button className="btn btn-primary" type="submit">
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default ExperienceModal;
