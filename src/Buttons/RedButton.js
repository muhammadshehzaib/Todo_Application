import React from "react";

export default function RedButtons({ labels, onClick }) {
  function clickhandler() {
    onClick();
  }
  return (
    <button
      className=" border-2 bg-[#DB3345] text-white rounded-xl py-2 px-6 mt-4 w-full dark:border-black"
      onClick={clickhandler}
    >
      {labels}
    </button>
  );
}
