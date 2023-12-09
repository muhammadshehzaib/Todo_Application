import React from "react";

export default function Todo({ todo, toggleTodo }) {
  function handleTodoClick() {
    toggleTodo(todo.id);
  }

  return (
    <div className="flex ">
      <input
        type="checkbox"
        checked={todo.complete}
        onChange={handleTodoClick}
      />
      <div className="ml-3">{todo.name}</div>
    </div>
  );
}
