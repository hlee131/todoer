import React from "react";
import { useDispatch } from "react-redux";

import { logout } from "../../actions/accounts";
import { FILTER } from "../../actions/types";

export default function Nav() {
  const dispatch = useDispatch();

  const onSelect = (e) => {
    // First reset everything, then select selected and replace background
    let selectors = document.getElementsByClassName("selector");
    for (var i = 0; i < selectors.length; i++) {
      selectors[i].classList =
        "mt-4 bg-gray-200 p-1 rounded-lg cursor-pointer selector";
    }
    e.target.classList = String(e.target.classList).replace(
      "bg-gray-200",
      "bg-teal-300"
    );

    dispatch({
      type: FILTER,
      payload: e.target.id,
    });
  };

  return (
    //   {/* Nav buttons to filter items, position: left */}
    <nav className="bg-white w-1/4 float-left h-screen">
      <ul className="flex flex-col items-center mt-3">
        <li>
          <h2 className="font-black text-2xl">Categories</h2>
        </li>
        <li
          id="all"
          className="bg-teal-300 mt-4 p-1 rounded-lg cursor-pointer selector"
          onClick={onSelect}
        >
          All Items
        </li>
        <li
          id="incomplete"
          className="mt-4 bg-gray-200 p-1 rounded-lg cursor-pointer selector"
          onClick={onSelect}
        >
          Incompleted
        </li>
        <li
          id="complete"
          className="mt-4 bg-gray-200 p-1 rounded-lg cursor-pointer selector"
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
