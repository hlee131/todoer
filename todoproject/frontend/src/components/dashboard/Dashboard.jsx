import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Nav from "./Nav.jsx";
import Form from "./Form.jsx";
import Items from "./Items.jsx";

import { navVisible } from "../../actions/styles";

export default function Dashboard() {
  const styles = useSelector((state) => state.styles);
  const dispatch = useDispatch();
  
  return (
    <div className="w-screen h-screen overflow-x-hidden flex flex-row">
      {/* Navbar */}
      <Nav />
      {/* Items and form, position: right */}
      <div
        className={`w-screen flex-none overflow-y-scroll ${
          styles.navVisible === "block" ? "hidden" : "block"
        } min-h-screen h-auto sm:w-3/4 sm:block`.concat(
          styles.style === "dark" ? " bg-gray-800" : " bg-gray-100"
        )}
      >
        <Link
          to="/settings"
          className="m-3 float-right cursor-pointer z-10 relative"
        >
          <svg
            height="30px"
            viewBox="0 0 512 512"
            width="30px"
            xmlns="http://www.w3.org/2000/svg"
            className={"fill-current".concat(
              styles.style === "dark" ? " text-white" : " text-black"
            )}
          >
            <path d="m256 133.609375c-67.484375 0-122.390625 54.90625-122.390625 122.390625s54.90625 122.390625 122.390625 122.390625 122.390625-54.90625 122.390625-122.390625-54.90625-122.390625-122.390625-122.390625zm0 214.183594c-50.613281 0-91.792969-41.179688-91.792969-91.792969s41.179688-91.792969 91.792969-91.792969 91.792969 41.179688 91.792969 91.792969-41.179688 91.792969-91.792969 91.792969zm0 0" />
            <path d="m499.953125 197.703125-39.351563-8.554687c-3.421874-10.476563-7.660156-20.695313-12.664062-30.539063l21.785156-33.886719c3.890625-6.054687 3.035156-14.003906-2.050781-19.089844l-61.304687-61.304687c-5.085938-5.085937-13.035157-5.941406-19.089844-2.050781l-33.886719 21.785156c-9.84375-5.003906-20.0625-9.242188-30.539063-12.664062l-8.554687-39.351563c-1.527344-7.03125-7.753906-12.046875-14.949219-12.046875h-86.695312c-7.195313 0-13.421875 5.015625-14.949219 12.046875l-8.554687 39.351563c-10.476563 3.421874-20.695313 7.660156-30.539063 12.664062l-33.886719-21.785156c-6.054687-3.890625-14.003906-3.035156-19.089844 2.050781l-61.304687 61.304687c-5.085937 5.085938-5.941406 13.035157-2.050781 19.089844l21.785156 33.886719c-5.003906 9.84375-9.242188 20.0625-12.664062 30.539063l-39.351563 8.554687c-7.03125 1.53125-12.046875 7.753906-12.046875 14.949219v86.695312c0 7.195313 5.015625 13.417969 12.046875 14.949219l39.351563 8.554687c3.421874 10.476563 7.660156 20.695313 12.664062 30.539063l-21.785156 33.886719c-3.890625 6.054687-3.035156 14.003906 2.050781 19.089844l61.304687 61.304687c5.085938 5.085937 13.035157 5.941406 19.089844 2.050781l33.886719-21.785156c9.84375 5.003906 20.0625 9.242188 30.539063 12.664062l8.554687 39.351563c1.527344 7.03125 7.753906 12.046875 14.949219 12.046875h86.695312c7.195313 0 13.421875-5.015625 14.949219-12.046875l8.554687-39.351563c10.476563-3.421874 20.695313-7.660156 30.539063-12.664062l33.886719 21.785156c6.054687 3.890625 14.003906 3.039063 19.089844-2.050781l61.304687-61.304687c5.085937-5.085938 5.941406-13.035157 2.050781-19.089844l-21.785156-33.886719c5.003906-9.84375 9.242188-20.0625 12.664062-30.539063l39.351563-8.554687c7.03125-1.53125 12.046875-7.753906 12.046875-14.949219v-86.695312c0-7.195313-5.015625-13.417969-12.046875-14.949219zm-18.550781 89.3125-36.082032 7.84375c-5.542968 1.207031-9.964843 5.378906-11.488281 10.839844-3.964843 14.222656-9.667969 27.976562-16.949219 40.878906-2.789062 4.941406-2.617187 11.019531.453126 15.792969l19.980468 31.078125-43.863281 43.867187-31.082031-19.980468c-4.773438-3.070313-10.851563-3.242188-15.789063-.453126-12.90625 7.28125-26.660156 12.984376-40.882812 16.949219-5.460938 1.523438-9.632813 5.945313-10.839844 11.488281l-7.84375 36.082032h-62.03125l-7.84375-36.082032c-1.207031-5.542968-5.378906-9.964843-10.839844-11.488281-14.222656-3.964843-27.976562-9.667969-40.878906-16.949219-4.941406-2.789062-11.019531-2.613281-15.792969.453126l-31.078125 19.980468-43.863281-43.867187 19.976562-31.078125c3.070313-4.773438 3.246094-10.851563.457032-15.792969-7.28125-12.902344-12.984375-26.65625-16.953125-40.878906-1.523438-5.460938-5.941407-9.632813-11.484375-10.839844l-36.085938-7.84375v-62.03125l36.082032-7.84375c5.542968-1.207031 9.964843-5.378906 11.488281-10.839844 3.964843-14.222656 9.667969-27.976562 16.949219-40.878906 2.789062-4.941406 2.617187-11.019531-.453126-15.792969l-19.980468-31.078125 43.863281-43.867187 31.082031 19.980468c4.773438 3.070313 10.851563 3.242188 15.789063.453126 12.90625-7.28125 26.660156-12.984376 40.882812-16.949219 5.460938-1.523438 9.632813-5.945313 10.839844-11.488281l7.84375-36.082032h62.03125l7.84375 36.082032c1.207031 5.542968 5.378906 9.964843 10.839844 11.488281 14.222656 3.964843 27.976562 9.667969 40.878906 16.949219 4.941406 2.789062 11.019531 2.613281 15.792969-.453126l31.078125-19.980468 43.863281 43.867187-19.976562 31.078125c-3.070313 4.773438-3.246094 10.851563-.457032 15.792969 7.285156 12.902344 12.984375 26.65625 16.953125 40.878906 1.523438 5.460938 5.941407 9.632813 11.484375 10.839844l36.085938 7.84375zm0 0" />
          </svg>
        </Link>
        <svg
          height="30px"
          version="1.1"
          viewBox="0 0 32 32"
          width="30px"
          xmlns="http://www.w3.org/2000/svg"
          className={"cursor-pointer m-3 fill-current sm:hidden".concat(
            styles.style === "dark" ? " text-white" : " text-black"
          )}
          onClick={() => dispatch(navVisible())}
        >
          <path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z" />
        </svg>
        <Items />
        <Form />
      </div>
    </div>
  );
}
