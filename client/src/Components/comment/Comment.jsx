import React from "react";
import "./comment.scss";

const Comment = ({ comment }) => {
  return (
    <div className="comment">
      <h4>{comment?.name} says</h4>
      <p className="timestamp">{comment?.date}</p>
      <p>{comment?.text}</p>
    </div>
  );
};

export default Comment;
