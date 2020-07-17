import React, { Fragment } from "react";

import Nav from "./Nav.jsx";

export default function Dashboard() {
  return (
    <div className="w-screen">
      <Nav />
      {/* Items and form, position: right */}
      <div className="bg-gray-100 w-3/4 float-right h-screen">
        {/* Items */}
        <ul>
          <li>
            <input type="checkbox" className="m-3"></input>Item 1
          </li>
          <li>
            <input type="checkbox" className="m-3"></input>Item 2
          </li>
          <li>
            <input type="checkbox" className="m-3"></input>Item 3
          </li>
          <li>
            <input type="checkbox" className="m-3"></input>Item 4
          </li>
          <li>
            <input type="checkbox" className="m-3"></input>Item 5
          </li>
        </ul>

        {/* Add new items */}
        <form className="w-3/4 absolute flex justify-around mb-5 bottom-0">
          <input type="text" placeholder="New item!"></input>
          <input type="submit" value="Add"></input>
        </form>
      </div>
    </div>
  );
}
