import React from "react";
import { BsSearch } from "react-icons/bs";

export default function SearchBar({ value, action }) {
  return (
    <div className="md:flex justify-between mb-4">
      <div className="flex items-center space-x-4 border border-slate-300 rounded-md p-2 w-full md:w-1/2 lg:w-1/3">
        <BsSearch className="text-slate-400" size={20} />
        <input
          className="placeholder:text-slate-400 bg-transparent w-full outline-none sm:text-sm"
          placeholder="rechercher employee..."
          value={value}
          onChange={action}
          type="text"
        />
      </div>
      <button
        className="rounded bg-indigo-700 mt-2 md:mt-0 hover:bg-indigo-800 transition-colors
        w-full md:w-40 text-white text-sm py-2 text-center"
      >
        exporter
      </button>
    </div>
  );
}
