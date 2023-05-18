import React, { useState } from "react";
import "./Settings.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser, update } from "../../features/userSlice";
import axios from "axios";
import noProfile from "../../assets/change_profile.png";

const Settings = () => {
  const User = useSelector(selectUser);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const url = import.meta.env.VITE_URL;
  const PF = `${url}/images/`;
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateUser = {
      userId: User._id,
      username: username ? username : User.username,
      email: email ? email : User.email,
      password: password ? password : User.password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updateUser.profilePic = filename;
      try {
        await axios.post(`${url}/api/upload`, data);
      } catch (error) {
        console.log(error);
      }
    }
    try {
      const res = await axios.put(`${url}/api/users/` + User._id, updateUser);
      setSuccess(true);
      dispatch(update(res.data));
      localStorage.setItem("user", JSON.stringify(res.data));
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserDelete = async () => {
    if (confirm("Do You want to delete your account?")) {
      try {
        await axios.delete(`${url}/api/users/${User._id}`, {
          data: { userId: User._id },
        });
        dispatch(logout());
        localStorage.clear();
        window.location.replace("/");
      } catch (error) {
        console.log(error);
      }
    } else {
      window.location.replace("/");
    }
  };

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update your account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <section className="settingsPP">
            <label>Profile Picture</label>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "10px",
              }}
            >
              {User.profilePic ? (
                <img
                  src={file ? URL.createObjectURL(file) : PF + User.profilePic}
                  alt="pp"
                  className="settingsppImage"
                />
              ) : (
                <img src={noProfile} alt="profile" />
              )}
              <label htmlFor="fileInput" className="settingsUpload">
                upload
              </label>
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
          </section>
          <div className="settingsUserDetails">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder={User.username}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="off"
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder={User.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="update_delete_con">
              <button className="settingsUpdate" type="submit">
                Update
              </button>
              <span className="settingsDeleteTitle" onClick={handleUserDelete}>
                Delete account
              </span>
            </div>
          </div>
        </form>
      </div>
      <div className="sidebar_con">
        <Sidebar />
      </div>
    </div>
  );
};

export default Settings;
