import React from "react";
import { ErrorMessage, useField } from "formik";

export const TextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-2">
      <ErrorMessage component="div" name={field.name} className="error" />
      <textarea
        className={`form-control ${meta.touched && meta.error && "is-invalid"}`}
        {...field}
        {...props}
        rows="3"
      />
    </div>
  );
};
