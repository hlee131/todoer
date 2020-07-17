import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getItems } from "../../actions/todo";

export default function Items() {
  const todo = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getItems());
  }, []);

  return (
    //   {/* Items */}
    <ul>
      {todo.items.map((item) => (
        <li key={item.id}>
          <input type="checkbox" className="m-3"></input>
          {item.item}
        </li>
      ))}
    </ul>
  );
}
