import React from "react";

export default function Button({
  action = () => console.log("cliked"),
  Icon,
  text,
  bg,
  color,
}) {
  return (
    <button
      style={{
        backgroundColor: bg || "#4338ca",
        color: color || "#fff",
      }}
      className="rounded bg-indigo-700 mt-2 md:mt-0 hover:opacity-90 transition-opacity
        w-full md:w-40 text-white text-sm py-2 flex justify-center items-center gap-2 "
      onClick={action}
    >
      {Icon && <Icon color="white" size={20} />} {text}
    </button>
  );
}
