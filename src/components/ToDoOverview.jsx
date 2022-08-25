import React, { useState, useEffect } from "react";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { NoResultGif } from "./atomic";
import done from "../img/doneTasks.gif";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { IoIosArrowDown } from "react-icons/io";
function ToDoOverview() {
  const [loading, setLoading] = useState(true);
  const [allToDoTasks, setallToDoTasks] = useState();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchTASKS = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/task/cards/");
        const todoResponse = await axios.get("/api/task/");
        setCards(response.data);
        setallToDoTasks(todoResponse.data);
      } catch (error) {
        console.log("error");
      }
      setLoading(false);
    };

    fetchTASKS();
  }, []);
  if (loading) {
    return (
      <div className="  p-4 bg-white rounded-md shadow-sm">
        <div className="items-center justify-start py-2">
          <Skeleton variant="text" sx={{ fontSize: "1rem", width: "30%" }} />
          <Skeleton variant="rounded" width={150} height={5} />
        </div>

        {[0, 1, 2].map((_, idx) => (
          <div index={idx} className="items-center justify-start py-3">
            <Stack spacing={0.5}>
              <Skeleton variant="rounded" width={"100%"} height={5} />
              <Skeleton variant="rounded" width={"100%"} height={15} />
            </Stack>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="  p-4 bg-white rounded-md shadow-sm">
      <div className="font-semibold tracking-wide">Ma To Do List</div>
      <div className="font-medium text-sm text-gray-500 mb-2">
        {`${new Date().getDate()} ${new Date().toLocaleString("default", {
          month: "long",
        })}
 ${new Date().getFullYear()}`}{" "}
      </div>
      {allToDoTasks.length === 0 ? (
        <NoResultGif imgPath={done} />
      ) : (
        <>
          {" "}
          {cards.map((task, index) => (
            <>
              {task.tasks.length !== 0 &&
              task.tasks.length !== task.done.length ? (
                <Accordion key={`_Card_${task.cardId}__${index}`}>
                  <AccordionSummary
                    expandIcon={<IoIosArrowDown />}
                    aria-controls="panel-content"
                    id="tasks"
                  >
                    <div className="p-1">
                      <div className="flex flex-row justify-between">
                        <h2>
                          Card num°{index + 1}:{" "}
                          <span className="font-semibold">{task.cardName}</span>
                        </h2>
                        <span>
                          {task.done.length} / {task.tasks.length}
                        </span>
                      </div>

                      <div
                        key={index}
                        className="w-full h-3 my-1 bg-slate-100 rounded-md"
                      >
                        <div
                          style={{
                            width: `${
                              (task.done.length * 100) / task.tasks.length
                            }%`,
                            height: "100%",
                            backgroundColor: " rgb(34 197 94 )",
                          }}
                          className={`rounded-md px-4 `}
                        ></div>
                      </div>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div>
                      {task.notDone.map((taskLeft, idx) => (
                        <div key={`_tasks_${taskLeft.id}__${idx}`}>
                          {taskLeft.text}
                        </div>
                      ))}
                    </div>
                  </AccordionDetails>
                </Accordion>
              ) : (
                <></>
              )}
            </>
          ))}
        </>
      )}
    </div>
  );
}

export default ToDoOverview;
