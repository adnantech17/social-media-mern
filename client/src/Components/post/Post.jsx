import React, { useContext } from "react";
import * as Yup from "yup";
import "./post.scss";
import Comment from "../comment/Comment";
import { postData } from "../../utils/crudUtils";
import { LoginContext } from "../../Context/LoginContext";
import { Form, Formik } from "formik";
import { TextField } from "../TextField/TextField";
import Moment from "react-moment";

const Post = ({ post, refetch }) => {
  const [, , user] = useContext(LoginContext);
  const validate = Yup.object({
    text: Yup.string()
      .min(10, "Post must be at least 10 characters")
      .max(300, "Post can be at max 300 characters")
      .required("Text is Required"),
  });

  const likedOrNot = () => {
    return post.likes.some((likedUser) => {
      return likedUser.user === user.id;
    });
  };

  return (
    <div>
      <div className="container">
        <div className="bg-white p-2">
          <div className="user-info">
            <img
              className="rounded-circle"
              src="https://media.istockphoto.com/vectors/person-gray-photo-placeholder-man-vector-id1202490554?k=20&m=1202490554&s=612x612&w=0&h=Pkb9bPY7CT5whOt0yZDzGivGBs_CW2fAs0btjFaHCOg="
              width="40"
              height="40"
            />
            <div className="poster-title">
              <span>{post.name}</span>
              <p className="date text-black-50timestamp">
                <Moment fromNow>{post.date}</Moment>
              </p>
            </div>
          </div>
          <div className="mt-1">
            <p className="post-text">{post.text}</p>
          </div>
        </div>
        <div className="bg-white">
          <div className="d-flex flex-row fs-12">
            {likedOrNot() ? (
              <div
                className="liked p-2 cursor"
                onClick={async () => {
                  const res = await postData("/posts/unlike/" + post._id, {});
                  console.log(res, "Res");
                  refetch();
                }}
              >
                <i className="fa fa-thumbs-up"></i>
                <span className="ml-1">&nbsp;({post.likes.length})</span>
              </div>
            ) : (
              <div
                className="like p-2 cursor"
                onClick={async () => {
                  const res = await postData("/posts/like/" + post._id, {});
                  console.log(res, "Res");
                  refetch();
                }}
              >
                <i className="fa fa-thumbs-up"></i>
                <span className="ml-1">&nbsp;({post.likes.length})</span>
              </div>
            )}

            <div className="p-2">
              <i className="fa fa-comments"></i>
              <span className="ml-1">({post.comments.length})&nbsp;</span>
            </div>
          </div>
        </div>
        <div className="coment-bottom bg-white p-2 px-4">
          <Formik
            initialValues={{
              text: "",
            }}
            validationSchema={validate}
            onSubmit={async (values) => {
              const res = await postData("/posts/comment/" + post._id, {
                text: values.text,
                name: user.name,
                avatar: user.avatar,
              });
              console.log(res.data);
              refetch();
            }}
          >
            {(formik) => (
              <div className="form-group container">
                <Form
                  className="login-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    formik.handleSubmit();
                  }}
                >
                  <TextField
                    type="text"
                    placeholder="Write Something Here*"
                    name="text"
                  />
                  <div className="d-flex">
                    <button className="btn btn-info ms-auto">Submit</button>
                  </div>
                </Form>
              </div>
            )}
          </Formik>
        </div>
        <div className="comments">
          {post.comments.map((comment) => (
            <Comment comment={comment} key={comment._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Post;
