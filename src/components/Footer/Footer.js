import React from "react";
import "../../styles/header.css";

function Head() {
  return (
    <footer className="header-container">
      <div className="header" style={{ justifyContent: "space-evenly" , border: "none" }}>
        <div className="header-2" style={{ width: "max-content" }}>
          About us
        </div>
        <div className="header-2" style={{ width: "max-content" }}>
          Privacy policy
        </div>
        <div className="header-2" style={{ width: "max-content" }}>
          Terms of Service
        </div>
      </div>
    </footer>
  );
}

export default Head;
