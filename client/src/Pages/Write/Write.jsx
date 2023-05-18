import React, { useEffect, useState } from "react";
import "./Write.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import axios from "axios";

const Write = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [cate, setCate] = useState("");
  const [file, setFile] = useState(null);
  const User = useSelector(selectUser);
  const [cats, setCats] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: User._id,
      username: User.username,
      title,
      desc,
      categories: cate,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("http://localhost:5000/api/upload", data);
      } catch (error) {
        console.log(error);
      }
    }
    try {
      const res = await axios.post("http://localhost:5000/api/posts", newPost);
      window.location.replace("/post/" + res.data._id);
      toast.success("🦄 You have succesfully Posted a blog.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
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
  };

  useEffect(() => {
    const fetchcategory = async () => {
      const res = await axios.get("http://localhost:5000/api/categories");
      setCats(res.data);
    };
    fetchcategory();
  }, [User]);

  return (
    <div className="write">
      <ToastContainer />
      {file && (
        <img src={URL.createObjectURL(file)} alt="bg" className="writeImage" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="inputFile" className="writeIcon">
            <i className="fa-solid fa-upload"></i>
          </label>
          <input
            type="file"
            id="inputFile"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput s"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
          <select
            className="writeInput writeText"
            onChange={(e) => setCate(e.target.value)}
          >
            <option value="" id="option">
              Select a Category
            </option>
            {cats?.map((cat) => (
              <option key={cat._id} id="option" value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          <textarea
            type="text"
            placeholder="Tell your story..."
            className="writeInput writeText"
            cols="30"
            rows="10"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <button className="writeSubmit" type="submit">
            Publish
          </button>
        </div>
      </form>
    </div>
  );
};

export default Write;
