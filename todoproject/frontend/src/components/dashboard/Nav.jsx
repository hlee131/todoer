import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../actions/accounts";
import { FILTER } from "../../actions/types";

export default function Nav() {
  const dispatch = useDispatch();
  const style = useSelector((state) => state.todo.style);
  const textColor = style === "dark" ? "text-white" : "text-black";
  const bgColor = style === "dark" ? "bg-gray-900" : "bg-gray-200";

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
        style === "dark" ? "bg-gray-700" : "bg-white"
      } w-1/4 float-left h-screen`}
    >
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
      <div className="w-1/4 text-center bottom-0 absolute mb-5">
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
