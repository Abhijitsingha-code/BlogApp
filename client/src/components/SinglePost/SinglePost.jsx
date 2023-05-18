import React, { memo, useEffect, useState } from "react";
import "./SinglePost.css";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import moment from "moment";

const SinglePost = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [posts, setPosts] = useState({});
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [postUpdate, setPostUpdate] = useState(false);
  const PF = "http://localhost:5000/images/";
  const User = useSelector(selectUser);
  const noImage =
    "https://t3.ftcdn.net/jpg/04/34/72/82/240_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg";

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get("http://localhost:5000/api/posts/" + path);
      setPosts(res.data);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    fetchPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${posts._id}`, {
        data: { userId: User._id },
      });
      window.location.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      const resUpdated = await axios.put(
        `http://localhost:5000/api/posts/${posts._id}`,
        {
          userId: User._id,
          title,
          desc,
        }
      );
      setPosts(resUpdated.data);
      setPostUpdate(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {!posts.photo ? (
          <img src={noImage} alt="img" className="noImg" />
        ) : (
          <img src={PF + posts.photo} alt="img" className="singlePostImg" />
        )}

        {!postUpdate ? (
          <>
            <h3 className="singlePostTitle">
              {posts.title}
              {posts.username === User?.username && (
                <div className="singlePostEdit">
                  <i
                    className="singlePostIcon fa-solid fa-pen-to-square"
                    onClick={() => setPostUpdate(true)}
                  ></i>
                  <i
                    className="singlePostIcon fa-solid fa-trash"
                    onClick={handleDelete}
                  ></i>
                </div>
              )}
            </h3>
            <div className="singlePostInfo">
              <span className="singlePostAuthor">
                Author:{" "}
                <Link
                  to={`/?user=${posts.username}`}
                  style={{ textDecoration: "none", color: "#149eca" }}
                >
                  <b>{posts.username}</b>
                </Link>
              </span>
              <span className="singlePostDate">
                {moment(posts.createdAt).fromNow()}
              </span>
            </div>
            <p className="singlePostDesc">{posts.desc}</p>
          </>
        ) : (
          <>
            <form className="updateForm" onSubmit={handleUpdate}>
              <div className="updateFormGroup">
                <input
                  type="text"
                  placeholder="Title"
                  className="UpdateInput"
                  autoFocus={true}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="updateFormGroup">
                <textarea
                  type="text"
                  placeholder="Tell your story..."
                  className="UpdateInput UpdateText"
                  cols="30"
                  rows="10"
                  onChange={(e) => setDesc(e.target.value)}
                ></textarea>
              </div>
              <button className="updateSubmit" type="submit">
                Update
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default memo(SinglePost);
