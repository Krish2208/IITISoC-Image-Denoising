import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./home.css";
import background from "../black_bg.png";
import logo from "../logo.png";

export default function home() {
  return (
    <>
      <nav class="navbar">
        <div className="navtext">Image Denoiser: ADNet Model</div>
      </nav>
      <div
        style={{
          backgroundImage: `url(${background})`,
          width: "100vw",
          height: "100vh",
          backgroundSize: "cover",
        }}
      >
        <img src={logo} className="logo" alt="Logo" />
        <a href="/model" className="link">
          <div className="startlink">
            Get Started
            <FontAwesomeIcon
              icon="fa-solid fa-circle-chevron-right"
              style={{ paddingLeft: 5 }}
            />
          </div>
        </a>
      </div>
    </>
  );
}
