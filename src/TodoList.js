import React from "react";
import Todo from "./Todo";

export default function TodoList({
  todos,
  toggleTodo,
  onClick,
  handleDeleteTodos,
  handleupdateTodos,
}) {
  return todos?.map((todos) => {
    return (
      <Todo
        todo={todos}
        key={todos.id}
        toggleTodo={toggleTodo}
        onClick={onClick}
        handleDeleteTodos={handleDeleteTodos}
        handleupdateTodos={handleupdateTodos}
      />
    );
  });
}
