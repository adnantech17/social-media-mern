import React, { useEffect, useState } from "react";
import Post from "../../Components/post/Post";
import PostForm from "../../Components/postform/PostForm";
import { getData } from "../../utils/crudUtils";
import ClipLoader from "react-spinners/ClipLoader";
import "./dashboard.scss";

const Dashboard = () => {
  const [posts, setPosts] = useState(null);
  const getPostData = async () => {
    const data = await getData("/posts");
    setPosts(data.data);
  };

  useEffect(() => {
    getPostData();
  }, []);
  return (
    <div>
      <PostForm />
      <div className="container page">
        {posts === null ? (
          <div className="loading">
            <ClipLoader loading={posts === null} size={150} />
          </div>
        ) : (
          posts.map((post) => (
            <Post post={post} key={post._id} refetch={getPostData} />
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
