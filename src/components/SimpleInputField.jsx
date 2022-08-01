import React from "react";

export default function FormInputField({error ,label, placeholder,name,type, action, value}) {
  return (
    <>
      
      <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={name}>
        {label}
      </label>
      <input
        className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${error ? ' border-red-500' : ' border-gray-200'}  `}
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={action}
      />
    </>
  );
}
