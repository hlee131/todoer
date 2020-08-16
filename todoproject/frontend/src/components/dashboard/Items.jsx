import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getItems, completeItem } from "../../actions/todo";

export default function Items() {
  const todo = useSelector((state) => state.todo);
  const styles = useSelector((state) => state.styles);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getItems());
  }, []);

  const onCheck = (e) => {
    e.target.parentNode.style.animationPlayState = "running";
    dispatch(completeItem(e.target.id));
  };

  const returnItems = () => {
    switch (todo.filter) {
      case "all":
        return todo.items;
      case "complete":
      case "incomplete":
        return todo.items.filter(
          (item) =>
            item.completed === (todo.filter === "complete" ? true : false)
        );
      default:
        return todo.items.filter((item) => (item.category === todo.filter));
    }
  };

  return (
    //   {/* Items */}
    <ul className="w-full">
      {returnItems().map((item) => (
        <li
          key={item.id}
          // TODO: Add categories to fade
          className={`${todo.filter === "incomplete" ? "fade" : ""} ${
            styles.style === "dark" ? "text-white" : "text-black"
          }`}
        >
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
