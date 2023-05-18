import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <div className="footerItem">
        <ul className="footerSocial">
          <Link to="https://www.facebook.com/abhijit.hijam.1/" target='_blank' className="footerIcon">
            <i className="fa-brands fa-facebook"></i>
          </Link>
          <Link to="https://www.instagram.com/abhijitsingha__/" target='_blank' className="footerIcon">
            <i className="fa-brands fa-instagram"></i>
          </Link>
          <Link to="https://www.linkedin.com/in/h-abhijit-singha-b862b3249/" target='_blank' className="footerIcon">
            <i className="fa-brands fa-linkedin"></i>
          </Link>
        </ul>
      </div>
      <div className="footer_copyright">
        <p>2023 ©Copyright | AbhijitSingha</p>
      </div>
    </div>
  );
}

export default Footer;
