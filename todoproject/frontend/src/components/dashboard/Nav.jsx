import React from "react";

export default function Nav() {
  return (
    //   {/* Nav buttons to filter items, position: left */}
    <nav className="bg-white w-1/4 float-left h-screen">
      <ul className="flex flex-col items-center mt-3">
        <li>
          <h2 className="font-black text-2xl">Filters</h2>
        </li>
        <li className="bg-teal-300 mt-4 p-1 rounded-lg cursor-pointer">
          All Items
        </li>
        <li className="mt-4 bg-gray-200 p-1 rounded-lg cursor-pointer">
          Incompleted
        </li>
        <li className="mt-4 bg-gray-200 p-1 rounded-lg cursor-pointer">
          Completed
        </li>
      </ul>
      <div className="w-1/4 text-center bottom-0 absolute mb-5">
        <a className=" bg-red-300 p-2 rounded-lg cursor-pointer">Logout</a>
      </div>
    </nav>
  );
}
