import React from "react";

export default function InputField({Icon, placeholder,name,type, action, value}) {
  return (
    <div className="h-10 w-60 flex flex-row mb-2">
      <div className=" bg-gray-200 w-10 rounded-tl-md rounded-bl-md grid justify-items-center">
        <Icon color="gray" size={25} className="self-center" />
      </div>
      <input
        className="border border-gray-200 rounded-tr-md rounded-br-md px-1 "
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={action}
      />
    </div>
  );
}
