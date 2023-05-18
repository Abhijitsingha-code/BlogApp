import React, { useEffect, useState } from "react";
import "./Login.css";
import changePP from "../../assets/change_profile.png";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { json, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, login, logout } from "../../features/userSlice.js";

const Login = () => {
  const [isResgister, setIsResgister] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const navigate = useNavigate();
  const User = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    const newUser = {
      username: username,
      email: email,
      password: password,
    };
    if (isResgister) {
      if (file) {
        const data = new FormData();
        const filename = Date.now() + file.name;
        data.append("name", filename);
        data.append("file", file);
        newUser.profilePic = filename;
        console.log(newUser);
        try {
          await axios.post("http://localhost:5000/api/upload", data);
        } catch (error) {
          console.log(error);
        }
      }
      try {
        const res = await axios.post(
          "http://localhost:5000/api/auth/register",
          newUser
        );
        res.data && window.location.reload();
        toast.success("🦄 You have succesfully Resgister..", {
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
        // setError(true);
        toast.error("There is error", {
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
      try {
        const res = await axios.post("http://localhost:5000/api/auth/login", {
          email,
          password,
        });
        dispatch(login(res.data));
        localStorage.setItem("user", JSON.stringify(res.data));
        toast.success(
          "🦄 You have succesfully Login..",
          {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          },
          { delay: 1000 }
        );
        res.data && navigate("/");
      } catch (error) {
        // setError(true);
        toast.error("There is error", {
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
    }
  };

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  return (
    <div className="login">
      <ToastContainer />
      <span className="loginTitle">{isResgister ? "Resgister" : "Login"}</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        {isResgister && (
          <>
            <div>
              <label htmlFor="fileInput">
                <img src={changePP} alt="pp" className="loginPP" />
              </label>
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <label htmlFor="name">Username</label>
            <input
              className="input"
              type="text"
              id="name"
              placeholder="Username.."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </>
        )}
        <label htmlFor="email">Email</label>
        <input
          className="input"
          type="text"
          id="email"
          placeholder="Enter your email.."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <div className="input pass_word">
          <input
            type={passwordType}
            id="password"
            placeholder="Enter password.."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div onClick={togglePassword}>
            {passwordType === "password" ? (
              <i className="fa-regular fa-eye-slash fa-sm"></i>
            ) : (
              <i className="fa-regular fa-eye fa-sm"></i>
            )}
          </div>
        </div>
        <button className="loginBtn">
          {isResgister ? "Resgister" : "Login"}
        </button>
        {error && <p style={{ color: "tomato" }}>Error</p>}
      </form>
      <button
        className="registerBtn"
        onClick={() => {
          setIsResgister(!isResgister);
        }}
      >
        {isResgister ? "Login" : "Resgister"}
      </button>
    </div>
  );
};

export default Login;
