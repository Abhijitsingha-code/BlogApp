import React, { useEffect, useState } from "react";
import "./Login.css";
import changePP from "../../assets/change_profile.png";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Username from "./Username";
import useDebounce from "./useDebounce";
import OtpPage from "./OtpPage";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ConPassword, setConPassword] = useState("");
  const [otpPage, setOtpPage] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [ConPasswordType, setConPasswordType] = useState("password");
  const [errorPassword, setErrorPassword] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [verifyUser, setVerifyUser] = useState({});

  const [username, setUsername] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedUsername = useDebounce(username, 500);

  const navigate = useNavigate();
  const url = import.meta.env.VITE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    const newUser = {
      username: username,
      email: email,
      password: password,
    };
    if (ConPassword === password) {
      if (file) {
        const data = new FormData();
        const filename = Date.now() + file.name;
        data.append("name", filename);
        data.append("file", file);
        newUser.profilePic = filename;
        console.log(newUser);
        try {
          await axios.post(`${url}/api/upload`, data);
        } catch (error) {
          console.log(error);
        }
      }
      try {
        const res = await axios.post(`${url}/api/auth/register`, newUser);
        // res.data && window.location.reload();
        console.log(res.data.data);
        setVerifyUser(res.data.data);
        toast.success("OTP has successfully send to your email.", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setOtpPage(true);
      } catch (error) {
        // setError(true);
        toast.error(error, {
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
      setErrorPassword(true);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setUsername(e.target.value);
  };

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const toggleConPassword = () => {
    if (ConPasswordType === "password") {
      setConPasswordType("text");
      return;
    }
    setConPasswordType("password");
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(`${url}/api/users`);
      setAllUsers(res.data.map((user) => user.username));
      // setAllUsers(res.data);
    };
    fetchUsers();
    setIsValid(!allUsers?.some((u) => u === debouncedUsername));
    setIsLoading(false);
  }, [debouncedUsername]);

  return (
    <div className="login">
      <ToastContainer />
      <span className="loginTitle">Resgister</span>
      {otpPage ? (
        <OtpPage User={verifyUser} />
      ) : (
        <form className="loginForm" onSubmit={handleSubmit}>
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
          <Username
            handleChange={handleChange}
            username={username}
            isLoading={isLoading}
            isValid={isValid}
          />
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
          <label htmlFor="conpassword">Confirm Password</label>
          <div className="input pass_word">
            <input
              type={ConPasswordType}
              id="conpassword"
              placeholder="Enter password again"
              value={ConPassword}
              autoComplete="off"
              onChange={(e) => setConPassword(e.target.value)}
            />
            <div onClick={toggleConPassword}>
              {ConPasswordType === "password" ? (
                <i className="fa-regular fa-eye-slash fa-sm"></i>
              ) : (
                <i className="fa-regular fa-eye fa-sm"></i>
              )}
            </div>
          </div>
          {errorPassword && (
            <p style={{ color: "tomato", fontSize: "12px" }}>
              Confirm password does not match the password.
            </p>
          )}
          <button className="loginBtn">Verify Email</button>
          {error && <p style={{ color: "tomato" }}>Error</p>}
        </form>
      )}
      <button
        className="registerBtn"
        onClick={() => {
          navigate("/auth/login");
        }}
      >
        Login
      </button>
    </div>
  );
};

export default Register;
