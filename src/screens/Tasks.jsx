import React, { useState, useEffect } from "react";
import axios from "axios";
import { SideBar, Card, NavBar } from "../components";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

import "react-circular-progressbar/dist/styles.css";
import { PageName } from "../components/atomic";

function Tasks() {
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="md:ml-64 pt-14 bg-gray-100 h-full">
        <SideBar />
        <NavBar />
        <PageName>taches</PageName>

        <div className="w-full px-6 py-6  h-screen  ">
          <div className="flex-none w-full   px-3">
            <div className="relative flex flex-col h-full  p-4">
              <div className=" flex flex-wrap  ">
                {[0, 1].map((_, idx) => (
                  <div
                    key={idx}
                    className="w-full h-fit m-2 max-w-sm items-center bg-white p-5 flex-col rounded-lg border border-gray-200 shadow-md  "
                  >
                    <Stack spacing={1}>
                      <div className="flex justify-between items-center ">
                        <Skeleton
                          variant="text"
                          sx={{ fontSize: "2rem", width: "30%" }}
                        />
                        <Skeleton variant="circular" width={20} height={20} />
                      </div>
                      <Stack spacing={2}>
                        <div className="flex justify-around items-center ">
                          <Skeleton variant="circular" width={50} height={50} />
                          <Skeleton variant="circular" width={50} height={50} />
                          <Skeleton variant="circular" width={60} height={60} />
                        </div>
                        <Skeleton
                          variant="rounded"
                          width={"100%"}
                          height={10}
                        />

                        <Skeleton
                          variant="rounded"
                          width={"100%"}
                          height={50}
                        />
                        <Skeleton
                          variant="rounded"
                          width={"100%"}
                          height={50}
                        />
                      </Stack>
                    </Stack>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="md:ml-64 pt-14 bg-gray-100 h-full">
      <SideBar />
      <NavBar />
      <PageName>taches</PageName>

      <div className="w-full px-6 py-6  h-full ">
        <div className="flex-none w-full  max-w-screen-xl  px-3">
          <div className="relative flex flex-col min-w-0 mb-6  p-4">
            <div className=" flex flex-wrap px-0 pt-0 pb-2">
              {cards.map((task, index) => (
                <Card key={index} task={task} />
              ))}
              <div className="w-full  flex max-w-sm justify-center  items-center  p-10   ">
                <div className="flex bg-gray-300 w-1/3 h-1/2 rounded-full justify-center items-center  hover:bg-slate-300 hover:cursor-pointer">
                  <div className="text-4xl text-gray-500 font-light">+</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tasks;
