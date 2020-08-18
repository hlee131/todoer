import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Alerts() {
  const messages = useSelector((state) => state.todo.messages);

  return (
    <div className="inset-0 h-screen w-screen bg-opacity-0">
      <ul id="messages">
        {
          messages.map((msg) => (
            <li 
              key={messages.indexOf(msg)} 
              className={`w-64 bg-purple-300 m-2 ${msg.stat === "success" ? "border-teal-500" : "border-red-500" } bg-gray-500 border-t-4 p-3 shadow-md fade-10`}
            >
              <div className="flex flex-row items-center justify-center space-around">  
                <p>{msg.message}</p>
                <p className="p-1 cursor-pointer" onClick={(e) => e.target.parentNode.parentNode.remove()}> X </p>
              </div>
              
            </li>
          ))
        }
      </ul>
    </div>
  )
};
