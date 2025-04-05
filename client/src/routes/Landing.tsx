import React from "react";
import Navbar from "../components/Navbar";
import { TypeAnimation } from "react-type-animation";

type Props = {};

const Landing = (props: Props) => {
  return (
    <div className="">
      <Navbar />
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center bg-neutral-900 rounded-4xl">
          <div className="max-w-lg">
            <h1 className="mb-5 text-5xl font-bold">
              Welcome to{" "}
              <span className="animate-text bg-gradient-to-r from-orange-800 via-black-700 to-neutral-800 bg-clip-text text-transparent font-black">
                CareConnect
              </span>
              !
            </h1>
            <p className="mb-5 text-2xl">
              The best website to find local support centers!
              <h2>
                <TypeAnimation
                  sequence={[
                    "Food Assistance",
                    2000,
                    "Mental Health Resources",
                    2000,
                    "Rent Financing",
                    2000,
                    "Legal Assistance",
                    2000,
                  ]}
                  wrapper="span"
                  speed={40}
                  style={{ fontSize: "2em", display: "inline-block" }}
                  repeat={Infinity}
                />
              </h2>
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
