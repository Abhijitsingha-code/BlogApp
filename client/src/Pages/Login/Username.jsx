import React from "react";
import "./Login.css";

const Username = ({ handleChange, username, isLoading, isValid }) => {
  return (
    <>
      <label htmlFor="name" className="label" style={{ textAlign: "right" }}>
        Username
      </label>
      <div
        className="input pass_word"
        style={{ position: "relative", marginBottom: "0px" }}
      >
        <input
          type="text"
          id="name"
          placeholder="Username.."
          //   value={username}
          onChange={handleChange}
        />
        <div className={`spinner ${isLoading ? "loading" : ""}`}></div>
      </div>
      <div className={`validation ${!isValid ? "invalid" : ""}`}>
        Username already taken
      </div>
    </>
  );
};

export default Username;
