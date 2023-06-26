import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../features/userSlice";

const MenuSidebar = ({ User, setShowSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Admin = import.meta.env.VITE_REACT_ADMIN;

  const hide = () => {
    setShowSidebar(false);
  };
  const logOut = () => {
    localStorage.clear();
    dispatch(logout());
    window.location.replace("/auth/login");
  };
  return (
    <div className="menuSidebar">
      <div className="hamClose">
        <i className="fa-solid fa-circle-xmark" onClick={() => hide()}></i>
      </div>
      <Link to="/" className="menuListItems" onClick={() => hide()}>
        <i className="fa-solid fa-house"></i>
        Home
      </Link>
      <Link to="/about" className="menuListItems" onClick={() => hide()}>
        <i className="fa-solid fa-address-card"></i>
        About
      </Link>
      <Link to="/write" className="menuListItems" onClick={() => hide()}>
        <i className="fa-solid fa-pen"></i>
        CreatePost
      </Link>
      {Admin === User?._id && (
        <Link to="/users" className="menuListItems" onClick={() => hide()}>
          <i className="fa-sharp fa-solid fa-user"></i>
          Users
        </Link>
      )}
      {User ? (
        <Link
          className="menuListItems"
          onClick={() => {
            hide();
            logOut();
          }}
        >
          <i className="fa-solid fa-outdent"></i>
          Logout
        </Link>
      ) : (
        <Link to="/auth/login" className="menuListItems" onClick={() => hide()}>
          <i className="fa-solid fa-indent"></i>
          Login/Resgister
        </Link>
      )}
    </div>
  );
};

export default MenuSidebar;
