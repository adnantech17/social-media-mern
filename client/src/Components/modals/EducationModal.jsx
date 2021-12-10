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

const EducationModal = ({ modalOpen, setModalOpen }) => {
  const validate = Yup.object({
    school: Yup.string().required("School is Required"),
    degree: Yup.string().required("Degree are Required"),
    fieldofstudy: Yup.string().required("Subject is Required"),
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
            school: "",
            degree: "",
            fieldofstudy: "",
            from: new Date(),
            to: new Date(),
          }}
          validationSchema={validate}
          onSubmit={async (values) => {
            const res = await postData("/profile/education", values);
            if (res !== null) setModalOpen(false);

            console.log(values);
          }}
        >
          {(formik) => (
            <div className="tab-content pt-3">
              <div className="tab-pane active">
                <h3>Add New Education Details</h3>
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
                        <label>School</label>
                        <TextField
                          type="text"
                          placeholder="School*"
                          name="school"
                        />
                        <div className="form-group">
                          <label>Degree</label>
                          <TextField
                            type="text"
                            placeholder="Degree*"
                            name="degree"
                          />
                        </div>
                        <div className="form-group">
                          <label>Subject*</label>
                          <TextField
                            type="text"
                            placeholder="Subject*"
                            name="fieldofstudy"
                          />
                        </div>
                        <div className="form-group">
                          <label>From</label>
                          <TextField
                            type="date"
                            placeholder="From"
                            name="from"
                          />
                        </div>
                        <div className="form-group">
                          <label>To</label>
                          <TextField type="date" placeholder="To" name="to" />
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

export default EducationModal;
