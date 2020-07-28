import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../actions/accounts";
import { navVisible } from "../../actions/styles";

import { FILTER } from "../../actions/types";

export default function Nav() {
  const dispatch = useDispatch();
  const styles = useSelector((state) => state.styles);
  const textColor = styles.style === "dark" ? "text-white" : "text-black";
  const bgColor = styles.style === "dark" ? "bg-gray-900" : "bg-gray-200";

  const onSelect = (e) => {
    // First reset everything, then select selected and replace background
    let selectors = document.getElementsByClassName("selector");
    for (var i = 0; i < selectors.length; i++) {
      let classList = `mt-4 ${bgColor} ${textColor} p-1 rounded-lg cursor-pointer selector`;

      selectors[i].classList = classList;
    }
    e.target.classList = String(e.target.classList).replace(
      bgColor + " " + textColor,
      "bg-teal-300 text-black"
    );

    dispatch({
      type: FILTER,
      payload: e.target.id,
    });
  };

  return (
    //   {/* Nav buttons to filter items, position: left */}
    <nav
      className={`${
        styles.style === "dark" ? "bg-gray-700" : "bg-white"
      } w-screen float-left h-screen ${styles.navVisible} sm:block sm:w-1/4`}
    >
      <svg
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="30px"
        height="30px"
        viewBox="0 0 306 306"
        style={{ top: "0.75rem", left: "0.75rem" }}
        className={`fill-current ${textColor} relative cursor-pointer sm:hidden`}
        onClick={() => dispatch(navVisible())}
      >
        <g id="chevron-left">
          <polygon points="247.35,35.7 211.65,0 58.65,153 211.65,306 247.35,270.3 130.05,153   " />
        </g>
      </svg>
      <ul className="flex flex-col items-center mt-3">
        <li>
          <h2 className={`${textColor} font-black text-2xl`}>Categories</h2>
        </li>
        <li
          id="all"
          className="bg-teal-300 mt-4 p-1 rounded-lg cursor-pointer selector"
          onClick={onSelect}
        >
          All Items
        </li>
        {/* TODO: on initiall load, bg-gray-200 not showing */}
        <li
          id="incomplete"
          className={`${textColor} ${bgColor} mt-4  p-1 rounded-lg cursor-pointer selector`}
          onClick={onSelect}
        >
          Incompleted
        </li>
        <li
          id="complete"
          className={`${textColor} ${bgColor} mt-4 p-1 rounded-lg cursor-pointer selector`}
          onClick={onSelect}
        >
          Completed
        </li>
      </ul>
      <div className="w-full text-center bottom-0 absolute mb-5 sm:w-1/4">
        <a
          id="logout"
          className=" bg-red-300 p-2 rounded-lg cursor-pointer"
          onClick={() => dispatch(logout())}
        >
          Logout
        </a>
      </div>
    </nav>
  );
}
