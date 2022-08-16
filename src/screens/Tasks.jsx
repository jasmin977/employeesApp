import React, { useState, useEffect } from "react";
import axios from "axios";
import { SideBar, Card } from "../components";
import { TailSpin } from "react-loader-spinner";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { GrCheckbox, GrCheckboxSelected } from "react-icons/gr";

function Tasks() {
  const [loading, setLoading] = useState(true);
  const [taskTEXT, setTASKtext] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchTASKS = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/task/cards/");
        setCards(response.data);
      } catch (error) {
        console.log("error");
      }
      setLoading(false);
    };

    fetchTASKS();
  }, []);

  if (loading)
    return (
      <div className="md:ml-64 flex items-center justify-center h-screen ">
        <TailSpin height="80" width="80" color="#136ABA" />
      </div>
    );

  return (
    <div className="md:ml-64 bg-gray-100 h-full">
      <SideBar />
      <div className="p-6 pb-0 mb-0">
        <h2 className="text-slate-500 text-2xl">TACHES</h2>
      </div>{" "}
      <div className="w-full px-6 py-6  h-full ">
        <div className="flex-none w-full  max-w-screen-xl  px-3">
          <div className="relative flex flex-col min-w-0 mb-6  p-4">
            <div className=" flex flex-wrap px-0 pt-0 pb-2">
              {cards.map((task, index) => (
                <Card key={index} task={task} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tasks;
