import React, { useContext } from "react";
import * as Yup from "yup";
import "./post.scss";
import Comment from "../comment/Comment";
import { postData } from "../../utils/crudUtils";
import { LoginContext } from "../../Context/LoginContext";
import { Form, Formik } from "formik";
import { TextField } from "../TextField/TextField";

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
        <div class="bg-white p-2">
          <div class="d-flex flex-row user-info">
            <img
              class="rounded-circle"
              src="https://i.imgur.com/RpzrMR2.jpg"
              width="40"
            />
            <div class="d-flex flex-column justify-content-start ml-2">
              <span class="d-block font-weight-bold name">{post.name}</span>
              <span class="date text-black-50">{post.date}</span>
            </div>
          </div>
          <div class="mt-1">
            <p class="post-text">{post.text}</p>
          </div>
        </div>
        <div class="bg-white">
          <div class="d-flex flex-row fs-12">
            {likedOrNot() ? (
              <div
                class="liked p-2 cursor"
                onClick={async () => {
                  const res = await postData("/posts/unlike/" + post._id, {});
                  console.log(res, "Res");
                  refetch();
                }}
              >
                <i class="fa fa-thumbs-up"></i>
                <span class="ml-1">&nbsp;({post.likes.length})</span>
              </div>
            ) : (
              <div
                class="like p-2 cursor"
                onClick={async () => {
                  const res = await postData("/posts/like/" + post._id, {});
                  console.log(res, "Res");
                  refetch();
                }}
              >
                <i class="fa fa-thumbs-up"></i>
                <span class="ml-1">&nbsp;({post.likes.length})</span>
              </div>
            )}

            <div class="p-2">
              <i class="fa fa-comments"></i>
              <span class="ml-1">({post.comments.length})&nbsp;</span>
            </div>
          </div>
        </div>
        <div class="coment-bottom bg-white p-2 px-4">
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
              <div class="form-group container">
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
                    <button class="btn btn-info ms-auto">Submit</button>
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
