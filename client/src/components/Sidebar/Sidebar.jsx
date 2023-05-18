import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import "./Sidebar.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const fetchcategory = async () => {
      const res = await axios.get("http://localhost:5000/api/categories");
      setCats(res.data);
    };
    fetchcategory();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebarItem sidebar_admin">
        <span className="sidebarTitle">About Admin</span>
        <img src={logo} alt="logo" />
        <h3>Abhijit Singha</h3>
        <p>
          Hii there, this is a blog App website that i have created. I am a BCA
          Student.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">Categories</span>
        <ul className="sidebarList">
          {cats.map((cat) => (
            <Link
              key={cat._id}
              to={`/?cat=${cat.name}`}
              style={{ textDecoration: "none", color: "#222" }}
            >
              <li className="sidebarListItem">{cat.name.toUpperCase()}, </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
