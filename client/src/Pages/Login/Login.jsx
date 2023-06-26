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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [passwordType, setPasswordType] = useState("password");

  const [username, setUsername] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const url = import.meta.env.VITE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    const newUser = {
      username: username,
      email: email,
      password: password,
    };
    try {
      const res = await axios.post(`${url}/api/auth/login`, {
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
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
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
            autoComplete="off"
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
        <button className="loginBtn">Login</button>
        {error && <p style={{ color: "tomato" }}>Error</p>}
      </form>
      <button
        className="registerBtn"
        onClick={() => {
          navigate("/auth/register");
        }}
      >
        Resgister
      </button>
    </div>
  );
};
export default Login;
