import React from "react";
import "./tables.scss";
import Moment from "react-moment";

const Education = ({ education }) => {
  return (
    <tr>
      <td>{education.school}</td>
      <td>{education.degree}</td>
      <td>{education.fieldofstudy}</td>
      <td>
        <Moment format="YYYY/MM/DD">{education.date}</Moment>
      </td>
      <td>
        <Moment format="YYYY/MM/DD">{education.date}</Moment>
      </td>
    </tr>
  );
};

export default Education;
