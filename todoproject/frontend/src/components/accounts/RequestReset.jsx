import React, { useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import axios from "axios";

export default function RequestReset() {
  const style = useSelector((state) => state.styles.style);
  const textColor = style === "dark" ? "text-white" : "text-black";
  const inputStyles =
    style === "dark" ? "text-white bg-gray-700" : "text-black bg-gray-100";
  const [email, setEmail] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setEmail("");

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      email,
    });

    axios
      .post("/api/auth/request-reset", body, config)
      .then((res) => {
        document.getElementById("initial").classList += "hidden";
        document.getElementById("success").classList.trim(" hidden");
      })
      .catch((err) => console.log(err.response.data));
  };

  return (
    <Fragment>
      <div
        id="initial"
        className={`${textColor} ${
          style === "dark" ? "bg-gray-700" : "bg-gray-100"
        } h-screen w-screen flex items-center justify-center`}
      >
        <div
          className={`${
            style === "dark"
              ? "bg-gray-800"
              : "bg-white border-solid border border-gray-200"
          } w-3/4 p-2 text-center shadow-md`}
        >
          <h1 className={`header-one`}>Todoer</h1>
          <h2 className={`header-two`}>Password Reset</h2>
          <form
            className="flex flex-col m-3 items-center justify-center"
            onSubmit={onSubmit}
          >
            <label htmlFor="email" className={`${textColor} m-1`}>
              Enter your email
            </label>
            <input
              id="email"
              type="text"
              value={email}
              className={`${inputStyles} input p-2`}
              placeholder="Input your email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
            <input
              className={`${inputStyles} btn-submit`}
              type="submit"
              value="Reset Password"
              placeholder="password"
            ></input>
          </form>
          <span className="inline-block m-4">
            <Link className={`${textColor} cursor-pointer font-thin`} to="/">
              Back to Register or Login
            </Link>
          </span>
        </div>
      </div>
      <div
        id="success"
        className={`${textColor} ${
          style === "dark" ? "bg-gray-700" : "bg-gray-100"
        } h-screen w-screen flex items-center justify-center hidden`}
      >
        <div
          className={`${
            style === "dark"
              ? "bg-gray-800"
              : "bg-white border-solid border border-gray-200"
          } w-3/4 p-2 text-center shadow-md`}
        >
          <h1 className={`header-one`}>Todoer</h1>
          <h2 className={`header-two`}>Password Reset</h2>
          <span className="inline-block m-4">
            <Link className={`${textColor} cursor-pointer font-thin`} to="/">
              Return to Login and Registration Page
            </Link>
          </span>
        </div>
      </div>
    </Fragment>
  );
}
