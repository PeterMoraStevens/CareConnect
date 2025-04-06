import React from "react";
import Navbar from "../components/Navbar";
import { TypeAnimation } from "react-type-animation";
import landingBg from "../assets/landingBg.jpg";
import support from "../assets/support.svg";
import { useNavigate } from "react-router-dom";

type Props = {
  setCity:React.Dispatch<React.SetStateAction<string>>
  setState:React.Dispatch<React.SetStateAction<string>>
};

const Landing = ({setCity, setState}: Props) => {

  const navigate = useNavigate();

  const [cityInput, setCityInput] = React.useState("");
  const [stateInput, setStateInput] = React.useState("");

  return (
    <div
      className="bg-cover bg-center h-screen"
      style={{ backgroundImage: `url(${landingBg})` }}
    >
      <div className="flex flex-col justify-center h-screen">
        <Navbar />
        <div className="flex flex-row items-center justify-center mr-30">
          <div className=" ml-30 flex flex-col items-center justify-center">
            <div className="pt-30 text-black text-7xlmax-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-8xl max-w-200 dark:text-black">
              Getting help shouldn't be hard.
            </div>
            <div className=" mt-2 text-black text-7xlmax-w-2xl mb-4 text-4xl font-normal tracking-tight leading-none md:text-5xl xl:text-3xl max-w-200 dark:text-black">
              We connect you to nearby health services, fast, easy, and right
              when you need it.
            </div>

            <div >
              <form className="mt-3 flex flex-row items-center gap-4 p-4 rounded-2xl bg-gray-700 min-w-3xl mr-10">
                <input
                  type="text"
                  placeholder="Enter State"
                  className="input rounded-md bg-gray-500"
                  required
                  onChange={(e) => {
                    setStateInput(e.target.value);
                  }}
                ></input>

                <input
                  type="text"
                  placeholder="Enter City"
                  className="input bg-gray-500"
                  required
                  onChange={(e) => {
                    setCityInput(e.target.value);
                  }}
                />

                <button onClick={() => {
                  setState(stateInput)
                  setCity(cityInput)
                  navigate(`/resources/`)
                }} className="btn bg-[#b3d161] text-black hover:bg-[#EEC170] hover:text-black transition-colors duration-300 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                  Connect
                </button>
              </form>
            </div>
          </div>
          <div className="pt-40 ml-10">
            <img className="pt-10 w-130 h-130" src={support} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
