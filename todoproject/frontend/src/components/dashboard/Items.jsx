import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getItems, itemCheck } from "../../actions/todo";

export default function Items() {
  const todo = useSelector((state) => state.todo);
  const styles = useSelector((state) => state.styles);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getItems());
  }, []);

  const onCheck = (e) => {
    if ((e.target.checked && todo.filter === "incomplete") || (!e.target.checked && todo.filter === "complete")) {
      e.target.parentNode.style.animationPlayState = "running";
    };
    let completed = e.target.checked ? true : false;
    dispatch(itemCheck(e.target.id, completed));
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

  let textColor = styles.style === "dark" ? "text-white" : "text-black";

  return (
    //   {/* Items */}
    <ul className="w-full">
      {returnItems().length !== 0 ? returnItems().map((item) => (
        <li
          key={item.id}
          // TODO: Add categories to fade
          className={`fade ${textColor}`}
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
      )) : <p className={`${textColor} m-3 text-center`}>You currently don't have any items</p>}
    </ul>
  );
}
