import React, { useEffect, useState } from "react";
import "./Post.css";
import Post from "./Post";
import Pagination from "../Pagination/Pagination";

const Posts = ({ posts }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(6);

  const lastIndex = currentPage * perPage;
  const firstIndex = lastIndex - perPage;
  const currentPosts = posts.slice(firstIndex, lastIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [posts]);
  return (
    <div className="posts">
      {posts.length !== 0 ? (
        <div className="postcon">
          <div className="postDiv">
            {currentPosts.map((p) => (
              <Post key={p._id} post={p} />
            ))}
          </div>
          <Pagination
            total={posts.length}
            PerPage={perPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      ) : (
        <>
          <p className="not_available">Sorry no posts available</p>
        </>
      )}
    </div>
  );
};

export default Posts;
