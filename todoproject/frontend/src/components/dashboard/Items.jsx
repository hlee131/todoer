import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getItems, completeItem } from "../../actions/todo";

export default function Items() {
  const todo = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getItems());
  }, []);

  const onCheck = (e) => {
    e.target.parentNode.style.animationPlayState = "running";
    dispatch(completeItem(e.target.id));
  };

  function returnItems() {
    switch (todo.filter) {
      case "all":
        return todo.items;
      case "complete":
      case "incomplete":
        return todo.items.filter(
          (item) =>
            item.completed === (todo.filter === "complete" ? true : false)
        );
      // default:
      //   return todo.items.filter(item => item.category === todo.filter)
    }
  }

  return (
    //   {/* Items */}
    <ul>
      {returnItems().map((item) => (
        <li key={item.id} className="fade">
          <input
            id={item.id}
            type="checkbox"
            className="m-3"
            onChange={onCheck}
            checked={item.completed}
          ></input>
          {item.item}
        </li>
      ))}
    </ul>
  );
}
