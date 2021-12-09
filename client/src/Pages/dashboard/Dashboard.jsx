import React, { useEffect, useState } from "react";
import Post from "../../Components/post/Post";
import PostForm from "../../Components/postform/PostForm";
import { getData } from "../../utils/crudUtils";

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
      <div className="container">
        {posts === null ? (
          <h1>Loading</h1>
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
