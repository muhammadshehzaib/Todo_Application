import React from "react";
import Todo from "./Todo";

export default function TodoList({ todos, toggleTodo }) {
  return todos.map((todos) => {
    return <Todo todo={todos} key={todos.id} toggleTodo={toggleTodo} />;
  });
}
