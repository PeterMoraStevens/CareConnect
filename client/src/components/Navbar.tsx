import React, { useState, useEffect } from "react";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router";
import { CgProfile } from "react-icons/cg";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

type Props = {};

const Navbar = (props: Props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [auth]);

  return (
    <nav className="top-0 w-full fixed">
      <div className="flex flex-row justify-between items-center text-black">
        <div className="ml-15 text-black flex items-center text-7xl font-semibold">
          <img src={logo} alt="logo" className="w-30 h-30 mt-2" />
          <h1>CareConnect</h1>
        </div>
        {user ? (
          <CgProfile
            className="mr-8 text-6xl cursor-pointer"
            onClick={() => navigate("orgProfile")}
          />
        ) : (
          <button
            type="button"
            className="mr-15 py-2.5 px-5 me-2 mb-2 text-2xl font-medium text-gray-900 focus:outline-none bg-white rounded-full cursor-pointer dark:hover:text-black dark:hover:bg-[#EAF3D2] transition-colors duration-300"
            onClick={() => navigate("SignInOrg")}
          >
            Sign in
          </button>
        )}
      </div>
      <p id="phrase" className="ml-47 text-black text-3xl italic">
        Support, just a tap away...
      </p>
    </nav>
  );
};

export default Navbar;
