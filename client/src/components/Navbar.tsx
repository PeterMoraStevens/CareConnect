import React from "react";
import logo from "../assets/logo.svg";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav className="top-0 w-full fixed">
      <div className=" flex flex-row justify-between items-center text-black">
        <div className=" ml-15 text-black flex items-center text-7xl font-semibold">
          <img src={logo} alt="logo" className="w-30 h-30 mt-2"></img>
          <h1 className="">CareConnect</h1>
        </div>
        <button type="button" className="mr-15 py-2.5 px-5 me-2 mb-2 text-2xl font-medium text-gray-900 focus:outline-none bg-white rounded-full cursor-pointer dark:hover:text-black dark:hover:bg-[#EAF3D2] transition-colors duration-300">Sign in</button>
      </div>
      <text id="phrase" className=" ml-47 text-black text-3xl italic" >Support, just a tap away... </text>
    </nav>
  );
};

export default Navbar;
