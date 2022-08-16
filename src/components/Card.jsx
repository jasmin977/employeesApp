import React, { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { GrCheckbox, GrCheckboxSelected } from "react-icons/gr";
import { BsPlusCircleFill } from "react-icons/bs";
import { RiDeleteBin6Fill } from "react-icons/ri";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import ListItemButton from "@mui/material/ListItemButton";

import { TransitionGroup } from "react-transition-group";

import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
function Card({ task }) {
  const [showAddTasks, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState(task.notDone);
  const [completedTasks, setcompletedTasks] = useState(task.done);
  const [allTasks, setAllTasks] = useState(task.tasks);
  const [cardName, setCardName] = useState(task.cardName);
  const [editcardName, setEditCardName] = useState(false);
  const [taskTEXT, setTASKtext] = useState("");

  const deleteTask = async (task) => {
    try {
      const response = await axios.delete(`/api/task/${task.id}`);
      if (response) {
        if (task.isDone) {
          //task from completed task list
          setcompletedTasks((prev) => [
            ...prev.filter((i) => i.id !== task.id),
          ]);
        } else {
          setTasks((prev) => [...prev.filter((i) => i.id !== task.id)]);
        }
      }
    } catch (ex) {
      console.log(ex.response.data.message);
    }
  };
  const add = async () => {
    try {
      const newTask = await axios.post("/api/task/", {
        text: taskTEXT,
        cardTaskId: task.cardId,
      });
      setTASKtext("");

      setTasks((prev) => [newTask.data, ...prev]);
      setAllTasks((prev) => [newTask.data, ...prev]);
    } catch (ex) {
      console.log(ex.response.data.message);
    }
  };
  const updateTitle = async () => {
    try {
      const updatedCard = await axios.put(`/api/task/card/${task.cardId}`, {
        title: cardName,
      });
      if (updatedCard) {
        setEditCardName(false);
      }
    } catch (ex) {
      console.log(ex.response.data.message);
    }
  };

  const handleToggle = async (task) => {
    try {
      const response = await axios.put(`/api/task/check/${task.id}`);
      if (response) {
        if (task.isDone) {
          task.isDone = false; //push it to do tasks and remove iit from completed list
          setcompletedTasks((prev) => [
            ...prev.filter((i) => i.id !== task.id),
          ]);
          setTasks((prev) => [task, ...prev]);
        } else {
          task.isDone = true;
          setTasks((prev) => [...prev.filter((i) => i.id !== task.id)]);
          setcompletedTasks((prev) => [task, ...prev]);
        }
      }
    } catch (ex) {
      console.log(ex.response.data.message);
    }
  };
  return (
    <div className="w-full h-fit m-2 max-w-sm items-center bg-white p-5 flex-col rounded-lg border border-gray-200 shadow-md  ">
      <div className="flex justify-between px-4 pt-4">
        <div
          className={`font-thin text-3xl ${
            editcardName ? "hover:cursor-text " : "hover:cursor-pointer"
          }`}
          onClick={() => setEditCardName(true)}
          onDoubleClick={updateTitle}
        >
          {editcardName ? (
            <form>
              <input
                className="w-full bg-[#DCDCDC] px-2 py-1"
                type="text"
                name="name"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />
            </form>
          ) : (
            <>{cardName}</>
          )}
        </div>
        <div className="flex flex-row items-center justify-center">
          <BsPlusCircleFill
            onClick={() => setShowAddTask(!showAddTasks)}
            color="gray"
            size={25}
            className="mx-2 hover:cursor-pointer"
          />

          <IoIosArrowDown
            color="gray"
            size={20}
            className="mx-1 hover:cursor-pointer"
          />
        </div>
      </div>

      {allTasks.length !== 0 ? (
        <>
          <div className="flex flex-row items-center  justify-around pt-5 pb-5">
            <div className="flex flex-col items-start m-1">
              <p className="text-5xl mb-1">{tasks.length}</p>
              <p className="text-sm text-gray-400 ">Not done</p>
            </div>
            <div className="flex flex-col items-start m-1">
              <p className="text-5xl mb-1">{completedTasks.length}</p>
              <p className="text-sm text-gray-400 ">Done</p>
            </div>
            <div className="w-1/5 h-full">
              <CircularProgressbar
                value={(completedTasks.length * 100) / allTasks.length}
                text={`${Math.round(
                  (completedTasks.length * 100) / allTasks.length
                )}%`}
                styles={buildStyles({
                  rotation: 0.25,

                  strokeLinecap: "round",

                  textSize: "30px",

                  pathTransitionDuration: 0.5,

                  pathColor: `rgba(50, 205, 50, ${
                    (task.done.length * 100) / task.tasks.length
                  })`,
                  textColor: "#000",
                  trailColor: "#d6d6d6",
                  backgroundColor: "transparent",
                })}
              />
            </div>
          </div>
          <div className="w-full h-2 flex bg-slate-200 flex-row rounded-md mb-2">
            <div
              style={{
                width: `${(completedTasks.length * 100) / allTasks.length}%`,
                height: "100%",
                backgroundColor: " rgb(34 197 94 )",
              }}
              className={`rounded-l-md`}
            ></div>
            <div
              style={{
                width: `${(tasks.length * 100) / allTasks.length}%`,
                height: "100%",
                backgroundColor: "rgb(59 130 246)",
              }}
              className={`rounded-r-md`}
            ></div>
          </div>
          <div className="w-full flex-col hover:cursor-pointer my-4">
            <Accordion>
              <AccordionSummary
                expandIcon={<IoIosArrowDown />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <div className="flex flex-row items-center  ">
                  <div className="h-4 w-4 bg-blue-500 rounded-lg" />
                  <p className="text-lg text-gray-700 mx-2">To Do</p>
                  <div className="h-fit w-fit p-1 bg-gray-400 rounded-full text-white text-xs">
                    {tasks.length}
                  </div>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ mt: 1 }}>
                  <List>
                    <TransitionGroup>
                      {tasks.map((uncompletedTask, i) => (
                        <Collapse key={uncompletedTask.id}>
                          <ListItem
                            className="bg-slate-100 rounded-md p-1 mb-1 h-fit w-full"
                            secondaryAction={
                              <IconButton
                                edge="end"
                                aria-label="delete"
                                title="Delete"
                                onClick={() => deleteTask(uncompletedTask)}
                              >
                                <RiDeleteBin6Fill
                                  color="#fc6f65"
                                  size={20}
                                  className="mx-1 hover:cursor-pointer"
                                />
                              </IconButton>
                            }
                          >
                            <ListItemButton
                              role={undefined}
                              onClick={() => handleToggle(uncompletedTask)}
                              dense
                            >
                              <ListItemIcon>
                                <Checkbox
                                  edge="start"
                                  checked={uncompletedTask.isDone}
                                  tabIndex={-1}
                                  disableRipple
                                  inputProps={{
                                    "aria-labelledby": uncompletedTask.id,
                                  }}
                                />
                              </ListItemIcon>
                              <ListItemText primary={uncompletedTask.text} />
                            </ListItemButton>
                          </ListItem>
                        </Collapse>
                      ))}
                    </TransitionGroup>
                  </List>
                </Box>

                {/** {task.notDone.map((uncompletedTask, i) => (
                    <div className="mx-2 border border-white p-1 rounded-md my-1">
                      {uncompletedTask.isDone ? (
                        <div className="flex flex-row justify-start items-center">
                          <GrCheckboxSelected
                            color="gray"
                            size={20}
                            className="mx-1"
                          />
                          <p className="text-lg text-gray-700 ">
                            {uncompletedTask.text}
                          </p>
                        </div>
                      ) : (
                        <div className="flex flex-row justify-start items-center">
                          <GrCheckbox color="gray" size={20} className="mx-1" />
                          <p className="text-lg text-gray-700 ">
                            {uncompletedTask.text}
                          </p>
                        </div>
                      )}
                    </div>
                  ))} */}
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<IoIosArrowDown />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>
                  <div className="flex flex-row items-center  ">
                    <div className="h-4 w-4 bg-green-500 rounded-lg" />
                    <p className="text-lg text-gray-700 mx-2">Completed</p>
                    <div className="h-fit w-fit p-1 bg-gray-400 rounded-full text-white text-xs">
                      {completedTasks.length}
                    </div>
                  </div>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ mt: 1 }}>
                  <List>
                    <TransitionGroup>
                      {completedTasks.map((completedTask, i) => (
                        <Collapse key={completedTask.id}>
                          <ListItem
                            className="bg-slate-100 rounded-md p-1 mb-1 h-fit w-full"
                            secondaryAction={
                              <IconButton
                                edge="end"
                                aria-label="delete"
                                title="Delete"
                                onClick={() => deleteTask(completedTask)}
                              >
                                <RiDeleteBin6Fill
                                  color="#fc6f65"
                                  size={20}
                                  className="mx-1 hover:cursor-pointer"
                                />
                              </IconButton>
                            }
                          >
                            <ListItemButton
                              role={undefined}
                              onClick={() => handleToggle(completedTask)}
                              dense
                            >
                              <ListItemIcon>
                                <Checkbox
                                  edge="start"
                                  checked={completedTask.isDone}
                                  tabIndex={-1}
                                  disableRipple
                                  inputProps={{
                                    "aria-labelledby": completedTask.id,
                                  }}
                                />
                              </ListItemIcon>
                              <ListItemText primary={completedTask.text} />
                            </ListItemButton>
                          </ListItem>
                        </Collapse>
                      ))}
                    </TransitionGroup>
                  </List>
                </Box>
                {/**
                <div className="bg-slate-100 rounded-md p-1 h-fit w-full">
                  {completedTasks.map((completedTask, i) => (
                    <div className="mx-2 border border-white p-1 rounded-md my-1">
                      {completedTask.isDone ? (
                        <div className="flex flex-row justify-start items-center">
                          <GrCheckboxSelected
                            color="gray"
                            size={20}
                            className="mx-1"
                          />
                          <p className="text-lg text-gray-700 ">
                            {completedTask.text}
                          </p>
                        </div>
                      ) : (
                        <div className="flex flex-row justify-start items-center">
                          <GrCheckbox color="gray" size={20} className="mx-1" />
                          <p className="text-lg text-gray-700 ">
                            {completedTask.text}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                      </div> */}
              </AccordionDetails>
            </Accordion>
          </div>
        </>
      ) : (
        <div className="flex flex-row items-center  justify-around pt-5 pb-5">
          theres is no TASK u lazy ass
        </div>
      )}

      <form className="my-4 ">
        <div className="mb-2 ">
          <input
            type="text"
            className="shadow  border rounded w-full py-2 px-3 mr-4 text-grey-darker"
            placeholder="add new task"
            value={taskTEXT}
            name="task"
            onChange={(e) => setTASKtext(e.target.value)}
            required
          />
        </div>
        <Button variant="contained" onClick={add}>
          Save
        </Button>
      </form>
    </div>
  );
}

export default Card;
