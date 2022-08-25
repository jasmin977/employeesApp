import React from "react";
import noresult from "../../img/noresult.gif";

function NoResultGif({ imgPath }) {
  return (
    <div className="w-full h-fit flex  justify-center items-center ">
      <img src={imgPath} alt="gif" />
    </div>
  );
}

export default NoResultGif;
