import React from "react";

export default function PageName({ children }) {
  return (
    <div className="p-6 pb-0 mb-0">
      <h2 className="text-slate-500 text-xl capitalize">{children}</h2>
    </div>
  );
}
