import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { newItem } from "../../actions/todo";

export default function Form() {
  const [item, setItem] = useState("");
  const [category, setCategory] = useState("No Category");
  const dispatch = useDispatch();
  const styles = useSelector((state) => state.styles);
  const categories = useSelector((state) => state.todo.categories);
  const style =
    styles.style === "dark"
      ? "text-white bg-gray-700"
      : "text-black bg-gray-100";

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(newItem(item, category));
    setItem("");
  };

  const onChange = (e) => {
    let select = document.getElementById("category");
    setCategory(select.options[select.selectedIndex].text);
  };

  return (
    // {/* Add new items */}
    <form
      className={`w-full sm:w-3/4 fixed flex justify-around p-5 bottom-0 ${
        styles.style === "dark" ? " bg-gray-800" : " bg-gray-100"
      }`}
      onSubmit={onSubmit}
    >
      <input
        type="text"
        placeholder="New item!"
        className={`${style} p-1 shadow-inner w-1/2 placeholder-current border-solid border border-gray-600`}
        value={item}
        onChange={(e) => setItem(e.target.value)}
      ></input>
      <select defaultValue="No Category" name="category" id="category" onChange={onChange}>
	  <option value="No Category">No Category</option>
	  { categories.map((item) => (
	    <option key={item.id} id={item.id} value={item.name}>{item.name}</option>))
	  }
      </select>
      <input
        type="submit"
        value="Add"
        className={`${style} p-2 w-20 cursor-pointer shadow-inner border-solid border border-gray-600`}
      ></input>
    </form>
  );
}
