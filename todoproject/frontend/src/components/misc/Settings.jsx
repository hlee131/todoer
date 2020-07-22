import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

export default function Settings() {
  const [visible, setVisible] = useState("password");
  const onClick = () => {
    console.log("submitted");
  };

  return (
    <Fragment>
      <div>
        <Link to="/">
          <img
            className="m-3"
            src="https://img.icons8.com/metro/26/000000/back.png"
          />
        </Link>
      </div>
      <section className="w-screen">
        <h1 className="text-center text-3xl font-extrabold m-1">
          Account Settings
        </h1>
        <form className="flex flex-col w-screen justify-center items-center">
          <label htmlFor="username" className="m-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="w-1/2 border-solid border-2 border-gray-600 m-1"
          />

          <label htmlFor="email" className="m-1">
            Email
          </label>
          <input
            type="text"
            id="email"
            className="w-1/2 border-solid border-2 border-gray-600 m-1"
          />
          <label htmlFor="password" className="m-1">
            Password
          </label>
          <input
            type={visible}
            id="password"
            className="w-1/2 border-solid border-2 border-gray-600 m-1"
          />
          <span className="flex items-center">
            <input
              className="m-1"
              type="checkbox"
              onChange={() =>
                setVisible(visible === "password" ? "text" : "password")
              }
            ></input>
            <p className="m-1">Show Password</p>
          </span>
        </form>
      </section>
      <section className="w-screen">
        <h1 className="text-center text-3xl font-extrabold m-1">
          Display Settings
        </h1>
        <form className="flex flex-col items-center w-screen">
          <label htmlFor="style" className="m-1">
            Style Settings
          </label>
          <select name="style" id="style">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </form>
      </section>
      <div className="mt-5 w-screen flex justify-center">
        <button
          type="button"
          className="bg-green-400 p-1 rounded-lg cursor-pointer"
          onClick={onClick}
        >
          Save Changes
        </button>
      </div>
    </Fragment>
  );
}
