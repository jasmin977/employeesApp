import React from "react";
import noWifi from "../../img/nowifi.gif";
import Button from "@mui/material/Button";

function ErrorGif() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center ">
      <img className="h-1/2 w-1/2" src={noWifi} alt="no_wifi" />
      <Button variant="contained">Try again</Button>
    </div>
  );
}

export default ErrorGif;
