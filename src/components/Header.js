// src/components/Header.js
import React from 'react';

const Header = () => {
  return (
    <header className="flexitems-center p-4">
      <div className="flex items-center justify-between ">
        <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Dear Studio Logo" className="w-20 h-20 mr-4" />
        <h1 className="text-4xl font-bold text-gray-800">โปรแกรมรูปด่วน</h1>
        งงๆ
      </div>
    </header>
  );
};

export default Header;
