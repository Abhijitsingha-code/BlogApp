import React, { useEffect, useState } from "react";
import "./comment.css";
import pp from "../../assets/pp.jpg";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

const Comment = () => {
  const [comment, setComment] = useState("");
  const [fetchComment, setFetchComment] = useState(false);
  const [comments, setComments] = useState([]);
  const User = useSelector(selectUser);
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const url = import.meta.env.VITE_URL;
  const PF = `${url}/images/`;

  const onCommentSubmit = async (e) => {
    e.preventDefault();
    const newComment = {
      id: path,
      userId: User._id,
      userComment: User.username,
      commentBody: comment,
      userphoto: User.profilePic,
    };
    if (comment) {
      try {
        await axios.post(`${url}/api/comment`, newComment);
        setComment("");
        setFetchComment(true);
        alert("Posted the comment.");
      } catch (error) {
        console.log(error);
        toast.error("There is an error", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } else {
      alert("Enter comment first.");
    }
  };

  const handleDelete = async (commentId) => {
    // console.log(commentId);
    // const deleteComment = {
    //   _id: path,
    //   commentId: commentId,
    // };
    try {
      await axios.patch(`${url}/api/comment/${path}`, { commentId: commentId });
      setFetchComment(true);
      alert("Comment deleted.");
    } catch (error) {
      console.log("Somthing is wrong", error);
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get(`${url}/api/posts/` + path);
      setComments(res.data?.comments);
      // console.log("hii");
      setFetchComment(false);
    };
    comment_box.scrollTo({ top: 0, behavior: "smooth" });
    fetchPost();
  }, [fetchComment]);

  const sortedComments = comments
    .slice()
    .sort((a, b) => b.commentedOn.localeCompare(a.commentedOn));

  return (
    <div className="comment">
      <div className="comments">
        <h4>Comments</h4>
        <div className="comments_box" id="comment_box">
          {comments.length !== 0 ? (
            sortedComments?.map((com) => (
              <div key={com._id} className="com_con">
                <div className="comm_header">
                  <div className="comment_header">
                    <img
                      src={com.userphoto ? PF + com.userphoto : pp}
                      alt="image"
                    />
                    <h5>{com.userComment}</h5>
                    {"-"}
                    <p className="comment_date">
                      {moment(com.commentedOn).fromNow()}
                    </p>
                  </div>
                  {com.userId === User?._id && (
                    <div
                      className="comment_delete"
                      onClick={() => handleDelete(com._id)}
                    >
                      <p>Delete</p>
                    </div>
                  )}
                </div>
                <p className="comment_desc">{com.commentBody}</p>
              </div>
            ))
          ) : (
            <div className="no_coment">
              <p>No comments for now.</p>
            </div>
          )}
        </div>
      </div>
      <div className="post_comment">
        <form onSubmit={onCommentSubmit}>
          <h4>Leave a comment</h4>
          <div className="form_text">
            <label htmlFor="comment">Message</label>
            <textarea
              name="comment"
              id="comment"
              // cols="30"
              rows="10"
              className="textarea"
              style={{ backgroundColor: "black" }}
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            ></textarea>
          </div>
          <div className="comment_btn">
            <button id="post" className="btn">
              Post Comment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Comment;
