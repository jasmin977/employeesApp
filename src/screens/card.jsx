import React from "react";

const Card = (props) => {
  return <div className="p-7 bg-slate-100 rounded-lg">{props.children}</div>;
};

export default Card;
