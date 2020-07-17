import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { login } from "../../actions/accounts";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(username, password));
    setUsername("");
    setPassword("");
  };

  const onChange = (e) => {
    switch (e.target.id) {
      case "username":
        setUsername(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <div className="w-3/4 border-solid border border-gray-200 p-2 text-center shadow-md bg-white">
        <h1 className="text-center text-5xl font-extrabold m-1">Todoer</h1>
        <h2 className="text-center text-2xl m-1 font-thin">Login</h2>
        <form
          className="flex flex-col m-3 items-center justify-center"
          onSubmit={onSubmit}
        >
          <label htmlFor="username" className="m-1">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={onChange}
            className="w-1/2 border-solid border-2 border-gray-600 m-1"
          ></input>
          <label htmlFor="password" className="m-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={onChange}
            className="w-1/2 border-solid border-2 border-gray-600 m-1"
          ></input>
          <input
            className="p-2 cursor-pointer m-1"
            type="submit"
            value="Login"
            placeholder="password"
          ></input>
        </form>
        <span className="inline-block m-4">
          <a className="cursor-pointer font-thin">Forgot password?</a> |{" "}
          <a className="cursor-pointer font-thin">
            <Link to="/register">Don't have an account?</Link>
          </a>
        </span>
      </div>
    </div>
  );
}

export default Login;
