import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import DarkModeToggle from "./DarkModeToggle";
// const { v4: uuidv4 } = require("uuid");

const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
  const [todo, setTodo] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodo(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todo));
  }, [todo]);

  function toggleTodo(id) {
    const newTodos = [...todo];
    const todos = newTodos.find((todo) => todo.id === id);
    todos.complete = !todo.complete;
    setTodo(newTodos);
  }

  function handleAddTodo() {
    const name = todoNameRef.current.value;
    if (name === "") return;

    const notesData = {
      // Include any other properties you want to send to the server
      name: name,
      complete: false,
    };
    fetch("http://localhost:4000/create-notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(notesData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        // Assuming you have a state to manage todos, you can update it here
        setTodo((prevTodos) => [
          ...prevTodos,
          { id: data.data._id, ...notesData },
        ]);
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error as needed
      });

    todoNameRef.current.value = null;
  }

  function handleClearTodos() {
    const completedTodos = todo.filter((todo) => todo.complete);
    if (completedTodos.length === 0) {
      // If there are no completed todos, do nothing
      return;
    }
    const todoIdsToDelete = completedTodos.map((todo) => todo.id);
    fetch("http://localhost:4000/clear-complete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids: todoIdsToDelete }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        // Assuming you have a state to manage todos, you can update it here
        const newTodos = todo.filter((todo) => !todo.complete);
        setTodo(newTodos);
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error as needed
      });
  }
  // setTodo(newTodos);

  return (
    <div className=" h-screen text-slate-900 dark:bg-slate-900 dark:text-slate-200">
      <div className="flex justify-center items-center flex-col h-screen gap-6">
        <div className="heading-img flex w-full justify-around">
          <h1 className="text-center uppercase text-4xl font-ubantu mb-10 font-bold ">
            T o d o
          </h1>
          <div className="">
            <DarkModeToggle />
          </div>
        </div>
        <div className="flex items-center justify-center max-[400px]:flex-col max-[400px]:gap-4">
          <button
            onClick={handleAddTodo}
            className="border-2 rounded-xl py-2 px-8 mr-2 "
          >
            Add Todo
          </button>
          <button
            onClick={handleClearTodos}
            className="border-2 rounded-xl py-2 px-4 mr-2"
          >
            Clear Completed
          </button>
          <div>{todo.filter((todo) => !todo.complete).length} left todo</div>
        </div>
        <input
          ref={todoNameRef}
          type="text"
          className="bg-slate-300 outline-none rounded-lg px-2 w-[60%] min-h-[5%] dark:bg-slate-700"
        />
        <div className="uppercase h-[30%]">
          <TodoList todos={todo} toggleTodo={toggleTodo} />
        </div>
      </div>
    </div>
  );
}

export default App;
