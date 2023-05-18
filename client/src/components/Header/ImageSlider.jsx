import React, { useState } from "react";
import "./Header.css";
import imageDetails from "./Image";

const ImageSlider = () => {
  return (
    <section className="slide">
      <div className="slide_img">
        <img
          alt="bg"
          className="headerImg"
          src={imageDetails[1].img}
        />
        {/* <h3>{imageDetails[0].text}</h3> */}
      </div>
      {/* <div className="navigation">
        <div
          className={`btn_navigation ${imageIndex === 0 ? "btn_active" : ""}`}
          //   onClick={setImageIndex(0)}
        ></div>
        <div
          className={`btn_navigation ${imageIndex === 1 ? "btn_active" : ""}`}
          //   onClick={setImageIndex(1)}
        ></div>
        <div
          className={`btn_navigation ${imageIndex === 2 ? "btn_active" : ""}`}
          //   onClick={setImageIndex(2)}
        ></div>
        <div
          className={`btn_navigation ${imageIndex === 3 ? "btn_active" : ""}`}
          //   onClick={setImageIndex(3)}
        ></div>
      </div> */}
    </section>
  );
};

export default ImageSlider;
