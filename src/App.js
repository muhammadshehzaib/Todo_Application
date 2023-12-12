import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import DarkModeToggle from "./DarkModeToggle";

import RedButtons from "./Buttons/RedButtons";

function App() {
  const [todo, setTodo] = useState([]);
  const [statemanage, setStateManage] = useState(false);
  const todoNameRef = useRef("");

  async function handleAllTodo() {
    try {
      let res = await fetch("http://localhost:4000/get-all-notes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setTodo(data.data);
      console.log(data.data);
    } catch (error) {
      console.log();
    }
  }

  useEffect(() => {
    handleAllTodo();
  }, [statemanage]);

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
  async function handleupdateTodos(todoId) {
    try {
      let fetchRes = await fetch(`http://localhost:4000/fetchnotes/${todoId}`);
      const currentData = await fetchRes.json();

      const updatedName = prompt("Enter updated name:", currentData.name);
      const notesData = {
        notesId: todoId,
        name: updatedName,
        Completed: currentData.Completed, // Assuming you want to keep the existing Completed value
      };
      let updateRes = await fetch("http://localhost:4000/updatenotes", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notesData),
      });
      const data = await updateRes.json();
      setStateManage((prev) => !prev);

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDeleteTodos(id) {
    try {
      let res = await fetch("http://localhost:4000/deletenotes", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      setStateManage((prev) => !prev);
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
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
  async function deleteAllTodos() {
    try {
      const res = await fetch("http://localhost:4000/delete-all-notes", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setStateManage((prev) => !prev);
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  }
  // setTodo(newTodos);

  return (
    <div className="min-h-screen text-slate-900 dark:bg-slate-900 dark:text-slate-200 w-full max-h-max">
      <div className="flex justify-center items-center flex-col  mx-auto w-[90%] sm:w-[80%] h-full">
        <div className="heading-img flex justify-between w-[90%] sm:w-[70%] mt-5">
          <h1 className="text-center uppercase text-4xl font-ubantu mb-10 font-bold ">
            TodoInput
          </h1>
          <div className="">
            <DarkModeToggle />
          </div>
        </div>
        <div className="flex items-center justify-center max-[400px]:flex-col max-[400px]:gap-4"></div>
        <div className="flex flex-col w-[90%] border-2 p-6 sm:w-[70%] dark:border-black">
          <input
            ref={todoNameRef}
            type="text"
            className="outline-none border-2 rounded-lg px-6 min-h-[5%] dark:bg-slate-700 py-1 placeholder:text-slate-400 dark:border-black"
            placeholder="New Todo"
          />
          <button
            onClick={handleAddTodo}
            className="border-2 bg-[#16A3B7] text-white rounded-xl py-2 px-8 mt-4 dark:border-black"
          >
            Add New task
          </button>
        </div>
        <div className="w-[90%] sm:w-[70%] ">
          <h2 className="text-center text-2xl font-ubantu mb-10 font-bold mt-6">
            TodoList
          </h2>
        </div>
        <div className="w-[90%] sm:w-[70%]">
          <TodoList
            todos={todo}
            toggleTodo={toggleTodo}
            onClick={handleupdateTodos}
            handleupdateTodos={handleupdateTodos}
            handleDeleteTodos={handleDeleteTodos}
          />
        </div>
        <div className="w-[90%] sm:w-[70%] ">
          <RedButtons
            handleClearTodos={handleClearTodos}
            deleteAllTodos={deleteAllTodos}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
