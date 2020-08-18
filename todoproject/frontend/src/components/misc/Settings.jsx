import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  update,
  deleteAcc,
  clearCompleted,
} from "../../actions/accounts";
import { SWITCH } from "../../actions/types";

export default function Settings() {
  const [visible, setVisible] = useState("password");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const style = useSelector((state) => state.styles.style);
  const dispatch = useDispatch();

  const textColor = style === "dark" ? "text-white" : "text-black";
  const inputStyles =
    style === "dark" ? "text-white bg-gray-700" : "text-black bg-gray-100";

  const onClick = () => {
    let ran = false;
    if (style !== document.getElementById("style").selectedOptions[0].value) {
      dispatch({type: SWITCH});
      localStorage.setItem(
        "style",
        localStorage.getItem("style") === "dark" ? "light" : "dark"
      );
      ran = true;
    }
    dispatch(update(username, password, email, ran));
    setUsername("");
    setEmail("");
    setPassword("");
  };

  const startModal = (action) => {
    let modal = document.getElementById("warn-modal");
    // Edit confirmation text
    document.getElementById("action").innerText = action;
    // Make visible
    modal.classList.remove("hidden");
    modal.classList.add("block");
    // Assign function
    let func = action === "delete your completed todo items" ? clearCompleted : deleteAcc;
    // Clear previous event listeners
    let continueBtn = document.getElementById("continue");
    continueBtn.replaceWith(continueBtn.cloneNode(true));
    // Update variable for new button
    continueBtn = document.getElementById("continue");
    continueBtn.addEventListener("click", () => {
      cancel();
      dispatch(func());
    });
  };

  const cancel = () => {
    document.getElementById("warn-modal").classList.remove("block");
    document.getElementById("warn-modal").classList.add("hidden");
  };

  return (
    <div className="relative">
    <div
      className={"h-screen w-screen overflow-hidden".concat(
        style === "dark" ? " bg-gray-800" : " bg-gray-100"
      )}
    >
      {/* <div> */}
      <Link
        to="/"
        style={{ top: "0.75rem", left: "0.75rem", position: "relative" }}
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
          className={`fill-current ${textColor}`}
        >
          <g id="chevron-left">
            <polygon points="247.35,35.7 211.65,0 58.65,153 211.65,306 247.35,270.3 130.05,153   " />
          </g>
        </svg>
      </Link>
      {/* </div> */}
      <section className="w-screen">
        <h1 className={`header-one mt-4 ${textColor}`}>Account Settings</h1>
        <form className="flex flex-col w-screen justify-center items-center">
          <label htmlFor="username" className={`m-1 ${textColor}`}>
            Username
          </label>
          <input
            type="text"
            id="username"
            className={`${inputStyles} input`}
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />

          <label htmlFor="email" className={`m-1 ${textColor}`}>
            Email
          </label>
          <input
            type="text"
            id="email"
            className={`${inputStyles} input`}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <label htmlFor="password" className={`m-1 ${textColor}`}>
            Password
          </label>
          <input
            type={visible}
            id="password"
            className={`${inputStyles} input`}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <span className="flex items-center">
            <input
              className="m-1"
              type="checkbox"
              onChange={() =>
                setVisible(visible === "password" ? "text" : "password")
              }
            ></input>
            <p className={`m-1 ${textColor}`}>Show Password</p>
          </span>
          <button
            type="button"
            className="bg-red-400 p-1 m-2 rounded-lg cursor-pointer"
            onClick={() => startModal("delete your completed todo items")}
          >
            Clear Todos
          </button>
          <p className={`${textColor}`}>
            WARNING: This button will delete any todos you have completed
          </p>
        </form>
      </section>
      <section className="w-screen">
        <h1 className={`header-one ${textColor}`}>Display Setting</h1>
        <form className="flex flex-col items-center w-screen">
          <label htmlFor="style" className={`m-1 ${textColor}`}>
            Style Settings
          </label>
          <select
            name="style"
            id="style"
            defaultValue={localStorage.getItem("style")}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </form>
      </section>
      <span className="mt-5 w-screen flex justify-center">
        <button
          type="button"
          className="bg-green-400 p-1 m-1 rounded-lg cursor-pointer"
          onClick={onClick}
        >
          Save Changes
        </button>
        <button
          type="button"
          className="bg-red-400 p-1 m-1 rounded-lg cursor-pointer"
          onClick={() => startModal("delete your account")}
        >
          Delete Account
        </button>
      </span>
    </div>
    <div id="warn-modal" className="hidden flex items-center justify-center w-screen h-screen absolute inset-0 bg-opacity-75 bg-gray-800">
      <div className="bg-gray-400 p-2 rounded-lg flex items-center justify-center flex-col">
        <h1 className="text-center text-3xl font-extrabold m-1">Are you sure you want to:</h1>
        <h2 className="header-two" id="action">Test Text</h2>
          <div className="flex flex-row space-around">
            <button onClick={cancel} className="bg-red-400 p-2 m-1 rounded-lg cursor-pointer">No</button> 
            <button id="continue" className="bg-green-400 p-2 m-1 rounded-lg cursor-pointer">Yes</button>
          </div>
      </div>
    </div>
    </div>
  );
}
