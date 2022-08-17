import React from "react";

export default function Button({
  action = () => console.log("cliked"),
  Icon,
  text,
}) {
  return (
    <button
      className="rounded bg-indigo-700 mt-2 md:mt-0 hover:bg-indigo-800 transition-colors
        w-full md:w-40 text-white text-sm py-2 flex justify-center items-center gap-2 "
      onClick={action}
    >
      {Icon && <Icon color="white" size={20} />} {text}
    </button>
  );
}
