import React, { memo, useEffect, useRef, useState } from "react";
import "./Topbar.css";
import pp from "../../assets/pp.jpg";
import ppBg from "../../assets/ppBg.jpg";
import menu from "../../assets/menu.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import MenuTitleShow from "./MenuTitleShow";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../features/userSlice";
import MenuSidebar from "./MenuSidebar";

const Topbar = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const userImgRef = useRef();
  const User = useSelector(selectUser);
  const url = import.meta.env.VITE_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Admin = import.meta.env.VITE_REACT_ADMIN;
  const PF = `${url}/images/`;

  useEffect(() => {
    let handle = (e) => {
      if (!userImgRef.current?.contains(e.target)) {
        setShowProfile(false);
      }
    };

    document.addEventListener("click", handle);
    return () => {
      document.removeEventListener("click", handle);
    };
  }, []);

  const logOut = () => {
    localStorage.clear();
    dispatch(logout());
    navigate("/auth");
  };

  return (
    <nav className="top_bar">
      <div className="topLeft">
        <div className="ham topIconList" onClick={() => setShowSidebar(true)}>
          {/* <i className="fa-light fa-grid-2"></i> */}
          <img src={menu} alt="menu" style={{ width: "20px" }} />
        </div>
        {showSidebar && (
          <div className="dialog-overlay">
            <div className="open_sidebar">
              <MenuSidebar User={User} setShowSidebar={setShowSidebar} />
            </div>
          </div>
        )}
        <div className="headerTitle" onClick={() => navigate("/")}>
          <span className="headerTitle">Blogger's</span>
          <span className="headerTitle Sm">Site</span>
        </div>
        {/* <section className="topLeftSection">
          <Link
            to="https://www.facebook.com/abhijit.hijam.1/"
            target="_blank"
            className="topIcon"
          >
            <i className="fa-brands fa-facebook"></i>
          </Link>
          <Link
            to="https://www.instagram.com/abhijitsingha__/"
            target="_blank"
            className="topIcon"
          >
            <i className="fa-brands fa-instagram"></i>
          </Link>
          <Link
            to="https://www.linkedin.com/in/h-abhijit-singha-b862b3249/"
            target="_blank"
            className="topIcon"
          >
            <i className="fa-brands fa-linkedin"></i>
          </Link>
        </section> */}
      </div>
      <div className="topMid">
        <ul className="topList">
          <Link to="/" className="topListItems">
            Home
          </Link>
          <Link to="/about" className="topListItems">
            About
          </Link>
          <Link to="/write" className="topListItems">
            CreatePost
          </Link>
          {Admin === User?._id && (
            <Link to="/users" className="topListItems">
              Users
            </Link>
          )}
          <Link className="topListItems" onClick={logOut}>
            {User !== null && "Logout"}
          </Link>
        </ul>
      </div>
      <div className="topRight">
        <section>
          {User !== null ? (
            <>
              <img
                src={User.profilePic ? PF + User.profilePic : pp}
                ref={userImgRef}
                className="topImg"
                alt="User"
                onClick={() => setShowProfile(!showProfile)}
              />
              {showProfile && (
                <div className="profile-dropdown">
                  <div className="image_container">
                    <img className="profile_bg" src={ppBg} alt="img" />
                    <NavLink to="/settings">
                      <img
                        src={User.profilePic ? PF + User.profilePic : pp}
                        className="Profile_topImg"
                        alt="User"
                      />
                    </NavLink>
                    <div className="profile-info">
                      <p className="user_name">{User.username}</p>
                      <p className="user_email">📧 {User.email}</p>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <ul className="topList" id="login">
                <Link to="/auth" className="topListItems">
                  Login/Resgister
                </Link>
              </ul>
            </>
          )}
          {/* <i className="topSearchIcon fa-sharp fa-solid fa-magnifying-glass"></i> */}
        </section>
      </div>
    </nav>
  );
};

export default memo(Topbar);
