import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getItems, completeItem } from "../../actions/todo";

export default function Items() {
  const todo = useSelector((state) => state.todo);
  const style = todo.style;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getItems());
  }, []);

  const onCheck = (e) => {
    // TODO: Move others up via height
    // TODO: Only when in completed mode
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
      // default:
      //   return todo.items.filter(item => item.category === todo.filter)
    }
  };

  return (
    //   {/* Items */}
    // TODO: returnItems not found
    <ul>
      {returnItems().map((item) => (
        <li
          key={item.id}
          className="fade {{ style === 'dark' ? text-white : text-black }}"
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
