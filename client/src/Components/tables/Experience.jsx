import React from "react";
import "./tables.scss";
import Moment from "react-moment";

const Experience = ({ experience }) => {
  return (
    <tr>
      <td>{experience.title}</td>
      <td>{experience.company}</td>
      <td>{experience.location}</td>
      <td>
        <Moment format="YYYY/MM/DD">{experience.date}</Moment>
      </td>
      <td>
        <Moment format="YYYY/MM/DD">{experience.date}</Moment>
      </td>
    </tr>
  );
};

export default Experience;
