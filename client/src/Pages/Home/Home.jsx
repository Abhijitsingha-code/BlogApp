import React, { memo, useEffect, useState } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import Posts from "../../components/Posts/Posts";
import Loader from "../../components/Loader/Loader";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get("http://localhost:5000/api/posts/" + search);
      setPosts(res.data);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };
    fetchPost();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [search]);

  const sortedPosts = posts
    .slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div className="home">
            <Posts posts={sortedPosts} />
            <Sidebar />
          </div>
        </>
      )}
    </>
  );
};

export default memo(Home);
