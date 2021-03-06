import React from "react";
import "./comment.scss";
import Moment from "react-moment";

const Comment = ({ comment }) => {
  return (
    <div className="comment">
      <h4>{comment?.name} says</h4>
      <p className="timestamp">
        <Moment fromNow>{comment?.date}</Moment>
      </p>
      <p>{comment?.text}</p>
    </div>
  );
};

export default Comment;
