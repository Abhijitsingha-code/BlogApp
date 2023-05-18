import React from "react";
import { Link } from "react-router-dom";
import "./Post.css";
import moment from "moment";
import { memo } from "react";

const Post = ({ post }) => {
  const PF = "http://localhost:5000/images/";
  const noImage =
    "https://t3.ftcdn.net/jpg/04/34/72/82/240_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg";

  return (
    <div className="post">
      {post.photo ? (
        <img
          className="postImg"
          src={PF + post.photo}
          alt="img"
          loading="lazy"
        />
      ) : (
        <img src={noImage} alt="img" className="postImg" loading="lazy" />
      )}
      <div className="postInfo">
        <span className="postTitle">
          <Link to={`/post/${post._id}`} className="link">
            {post.title}
          </Link>
        </span>
        <div className="postInfo2">
          <div className="postCats">
            {post?.categories.map((cate, ind) => (
              <span key={ind} className="postCat">
                <a className="link">{cate.toUpperCase()},</a>
              </span>
            ))}
          </div>
          <span className="postDate">{moment(post.createdAt).fromNow()}</span>
        </div>
        <hr style={{ marginTop: "5px", marginBottom: "10px" }} />
      </div>
      <Link
        to={`/post/${post._id}`}
        style={{ textDecoration: "none", color: "#222" }}
      >
        <p className="postDesc">{post.desc.substring(0, 150)}..</p>
      </Link>
    </div>
  );
};

export default memo(Post);
