import React from "react";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className="navbar bg-ghost shadow-sm top-0 fixed">
      <div className="flex-1">
        <button className="btn btn-neutral text-xl">CareConnect</button>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <button className="btn btn-secondary mr-4">User Sign-In</button>
          </li>
          <li>
            <button className="btn btn-primary">Org Sign-In</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
