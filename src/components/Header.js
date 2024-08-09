import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header flex items-center p-4">
      <div className="header-content">
        <div>
          <img
            src={`${process.env.PUBLIC_URL}/logo.png`}
            alt="Dear Studio Logo"
            className="logo w-20 h-20 mr-4"
          />
        </div>
        <div>
          <h1 className="title text-4xl font-bold text-gray-800">
            ID Photo Package
          </h1>
        </div>
        <div>
          <h5 className="subtitle text-gray-800">by Dear</h5>
        </div>
      </div>
    </header>
  );
};

export default Header;
