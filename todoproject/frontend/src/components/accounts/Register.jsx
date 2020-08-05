import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { register } from "../../actions/accounts";

export default function Register(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [visible, setVisible] = useState("password");
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const style = useSelector((state) => state.styles.style);
  const textColor = style === "dark" ? "text-white" : "text-black";
  const inputStyles =
    style === "dark" ? "text-white bg-gray-700" : "text-black bg-gray-100";

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(register(username, password, email));
    setUsername("");
    setPassword("");
    setEmail("");
  };

  const onChange = (e) => {
    switch (e.target.id) {
      case "username":
        setUsername(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
    }
  };

  if (auth.isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div
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
        <h1 className="header-one">Todoer</h1>
        <h2 className="header-two">Register</h2>
        <form
          className="flex flex-col m-3 items-center justify-center"
          onSubmit={onSubmit}
        >
          <label htmlFor="email" className="m-1">
            Email
          </label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={onChange}
            className={`${inputStyles} input`}
          ></input>

          <label htmlFor="username" className="m-1">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={onChange}
            className={`${inputStyles} input`}
          ></input>
          <label htmlFor="password" className="m-1">
            Password
          </label>
          <input
            type={visible}
            id="password"
            value={password}
            onChange={onChange}
            className={`${inputStyles} input`}
          ></input>
          <span className="flex justify-center items-center">
            <input
              onChange={() =>
                setVisible(visible === "password" ? "text" : "password")
              }
              type="checkbox"
              className="m-1"
            ></input>
            <p className="m-1">Show Password</p>
          </span>
          <input
            className={`${inputStyles} btn-submit`}
            type="submit"
            value="Create Account!"
            placeholder="password"
          ></input>
        </form>
        <span className="inline-block m-4">
          <a className="cursor-pointer font-thin">Forgot password?</a>
          <span className="hidden sm:inline"> | </span>
          <br className="sm:hidden" />
          <Link className="cursor-pointer font-thin" to="/login">
            Already have an account?
          </Link>
        </span>
      </div>
    </div>
  );
}
