import React, { memo, useEffect, useState } from "react";
import "./RelatedBlog.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const RelatedBlog = () => {
  const [posts, setPosts] = useState([]);
  const User = useSelector(selectUser);
  const { postId } = useParams();

  const PF = "http://localhost:5000/images/";
  const noImage =
    "https://t3.ftcdn.net/jpg/04/34/72/82/240_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg";

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get(`http://localhost:5000/api/posts/`);
      // setPosts(res.data);
      setPosts(
        res.data.filter((item) => {
          return item._id !== postId;
        })
      );
    };
    fetchPost();
  }, []);

  return (
    <div className="relatedBlog">
      <div className="relatedBlog_header">
        <h3>Related Blogs</h3>
      </div>
      <div className="related_blog_contai">
        {posts?.map((post) => (
          <div className="related_post" key={post._id}>
            {post.photo ? (
              <img className="RelatedpostImg" src={PF + post.photo} alt="img" />
            ) : (
              <img src={noImage} className="RelatedpostImg" alt="img" />
            )}
            <Link to={`/post/${post._id}`} className="Relatedlink">
              <span className="RelatedpostTitle">{post.title}</span>
            </Link>
            <Link
              to={`/post/${post._id}`}
              style={{ textDecoration: "none", color: "#222" }}
            >
              <p className="RelatedpostDesc">{post.desc.substring(0, 90)}...</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(RelatedBlog);
