import React from "react";
import updateTask from "./images/pencil-svgrepo-com.svg";
import removeTask from "./images/recycle-bin-svgrepo-com.svg";
export default function Todo({
  todo,
  toggleTodo,
  handleDeleteTodos,
  handleupdateTodos,
}) {
  function handleTodoClick() {
    toggleTodo(todo.id);
  }

  return (
    <div className="flex border-2 mt-8 py-2 px-4 justify-between ">
      <div className="ml-3">{todo.name}</div>
      <div className="flex gap-2">
        <input
          type="checkbox"
          checked={todo.Complete}
          onChange={handleTodoClick}
          className="accent-green-500 text-green-700"
        />
        <img
          src={updateTask}
          alt=""
          onClick={() => handleupdateTodos(todo._id)}
          className="cursor-pointer"
        />
        <img
          src={removeTask}
          alt=""
          onClick={() => handleDeleteTodos(todo._id)}
        />
      </div>
    </div>
  );
}
