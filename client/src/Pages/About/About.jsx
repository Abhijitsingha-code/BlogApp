import React, { useEffect } from "react";
import "./About.css";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/about");

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="about">
      <div className="about_img"></div>
      <div className="about_container">
        <h3>About me</h3>
        <div style={{ height: "100%" }}>
          <p>
            Hi there, and welcome to my website! My name is Abhijit Singha, and
            I'm a Web Developer , I'm passionate about front-end developing and
            designing, and I love nothing more than using my skills and
            knowledge to make a positive impact on the world. I first discovered
            my passion for Web development when I was building a simple weather
            forecast web application. From that moment on, I've been hooked, and
            I've spent countless hours learning and developing my knowledge
            about HTML, CSS Javascript and its frameworks/library. In addition
            to my work in Web development, I also have interest in sketching and
            in making origami When I'm not working or pursuing my hobbies, you
            can usually find me MLBB. I'm excited to share my work with you, and
            I hope that it inspires you to pursue your own passions and make a
            positive impact on the world. Thank you for taking the time to get
            to know me a little better. If you'd like to get in touch, feel free
            to contact me through my website :{" "}
            <a href="https://abhijit-singha.netlify.app/" target="_blank">
              abhijit-singha.netlify.app
            </a>
            . I look forward to hearing from you!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
