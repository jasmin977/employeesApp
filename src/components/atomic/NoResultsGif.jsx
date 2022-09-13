import React from "react";

function NoResultGif({ imgPath }) {
  return (
    <div className="w-full h-fit flex  justify-center items-center ">
      <img src={imgPath} alt="gif" />
    </div>
  );
}

export default NoResultGif;
