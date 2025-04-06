import React from "react";
import logo from "../assets/logo.svg";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav className="top-0 w-full fixed">
      <div className="mt-10 flex flex-row justify-between items-center text-black">
        <div className=" ml-15 text-black flex items-center text-7xl font-semibold">
          <img src={logo} alt="logo" className="w-30 h-30 mt-2"></img>
          <h1 className="">CareConnect</h1>
        </div>
        <button className="mr-15 flex font-semibold btn btn-outline text-3xl py-4" >Sign in </button>
      </div>
      <text id="phrase" className=" ml-47 text-black text-3xl italic" >Support, just a tap away... </text>
    </nav>
  );
};

export default Navbar;
