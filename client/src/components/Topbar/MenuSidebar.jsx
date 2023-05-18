import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../features/userSlice";

const MenuSidebar = ({ User, setShowSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Admin = import.meta.env.VITE_REACT_ADMIN;
  const logOut = () => {
    localStorage.clear();
    dispatch(logout());
    navigate("/auth");
  };
  return (
    <div className="menuSidebar">
      <div className="hamClose">
        <i
          className="fa-solid fa-circle-xmark"
          onClick={() => setShowSidebar(false)}
        ></i>
      </div>
      <Link to="/" className="menuListItems">
        <i className="fa-solid fa-house"></i>
        Home
      </Link>
      <Link to="/about" className="menuListItems">
        <i className="fa-solid fa-address-card"></i>
        About
      </Link>
      <Link to="/write" className="menuListItems">
        <i className="fa-solid fa-pen"></i>
        CreatePost
      </Link>
      {Admin === User?._id && (
        <Link to="/users" className="topListItems">
          Users
        </Link>
      )}
      {User ? (
        <Link className="menuListItems" onClick={logOut}>
          <i className="fa-solid fa-outdent"></i>
          Logout
        </Link>
      ) : (
        <Link to="/auth" className="menuListItems">
          <i className="fa-solid fa-indent"></i>
          Login/Resgister
        </Link>
      )}
    </div>
  );
};

export default MenuSidebar;
