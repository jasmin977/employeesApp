import React from "react";
import { BsSearch } from "react-icons/bs";

export default function SearchInput({ value, placeholder, onChange }) {
  return (
    <div className="flex items-center space-x-4 border border-slate-300 rounded-md p-2 w-full md:w-1/2 lg:w-1/3">
      <BsSearch className="text-slate-400" size={20} />
      <input
        className="placeholder:text-slate-400 bg-transparent w-full outline-none sm:text-sm"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type="text"
      />
    </div>
  );
}
