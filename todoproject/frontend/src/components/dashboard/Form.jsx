import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { newItem } from "../../actions/todo";

export default function Form() {
  const [item, setItem] = useState("");
  const dispatch = useDispatch();
  const style = useSelector((state) => state.todo.style);
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(newItem(item));
    setItem("");
  };
  return (
    // {/* Add new items */}
    <form
      className="w-3/4 absolute flex justify-around mb-5 bottom-0"
      onSubmit={onSubmit}
    >
      <input
        type="text"
        placeholder="New item!"
        // TODO: Better way?
        className="{{ style === 'dark' ? text-white : text-black }} {{ style === 'dark' ? bg-gray-700 : bg-current }} p-1 shadow-inner w-1/2 placeholder-current border-solid border-2 border-gray-300"
        value={item}
        onChange={(e) => setItem(e.target.value)}
      ></input>
      <input
        type="submit"
        value="Add"
        className="{{ style === 'dark' ? text-white : text-black }} {{ style === 'dark' ? bg-gray-700 : bg-current }} p-2 w-20 cursor-pointer shadow-inner border-solid border-2 border-gray-300"
      ></input>
    </form>
  );
}
