import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Alerts() {
  const messages = useSelector((state) => state.todo.messages);

  return (
    <div className="absolute top-0 bg-opacity-0 right-0 top-0 m-2">
      <ul id="messages">
        {
          messages.map((msg) => (
            <li 
              key={messages.indexOf(msg)} 
              className={`self-delete w-64 bg-purple-300 m-2 ${msg.stat === "success" ? "border-teal-500" : "border-red-500" } bg-gray-500 border-t-4 p-3 shadow-md`}
            >
              <div className="flex flex-row items-center justify-evenly height-inherit">  
                <p className="height-inherit">{msg.message}</p>
                <p className="cursor-pointer height-inherit text-xl" onClick={(e) => e.target.parentNode.parentNode.remove()}> X </p>
              </div>
              
            </li>
          ))
        }
      </ul>
    </div>
  )
};
