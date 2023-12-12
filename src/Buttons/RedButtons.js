import React from "react";
import RedButton from "./RedButton";
export default function RedButtons({ handleClearTodos, deleteAllTodos }) {
  function clickhandler() {
    handleClearTodos();
  }

  function clickAllDelete() {
    deleteAllTodos();
  }
  return (
    <div className="flex gap-2 sm:flex-row flex-col">
      <RedButton labels="Delete done tasks" onClick={clickhandler} />
      <RedButton labels="Delete all tasks" onClick={clickAllDelete} />
    </div>
  );
}
