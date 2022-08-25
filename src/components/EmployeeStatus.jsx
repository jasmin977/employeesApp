import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { EmployeeInfoPreview, Arrival } from "../components/atomic";
import { formatDate, minutesToString } from "../helpers/format-time";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

function EmployeeStatus() {
  const navigator = useNavigate();
  const [loading, setLoading] = useState(true);

  const [timesheet, settimesheet] = useState(null);
  const today = formatDate(new Date());

  const getStatusColor = (status) => {
    if (status === "absent") return "late";
    return "present";
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const timeSheetResponse = await axios.get("/api/admin/timesheet");
        settimesheet(timeSheetResponse.data);
      } catch (error) {
        console.log("error");
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <>
        <div className="bg-white  items-start col-span-2  p-4 rounded-md shadow-sm hover:cursor-pointer">
          <Stack spacing={1}>
            <Skeleton variant="text" sx={{ fontSize: "1rem", width: "30%" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem", width: "20%" }} />

            <Skeleton variant="rectangular" width={"100%"} height={40} />
            <Skeleton variant="rectangular" width={"100%"} height={20} />
            <Skeleton variant="rectangular" width={"100%"} height={20} />
            <Skeleton variant="rectangular" width={"100%"} height={20} />
            <Skeleton variant="rectangular" width={"100%"} height={20} />
            <Skeleton variant="rectangular" width={"100%"} height={20} />
          </Stack>
        </div>
      </>
    );
  }
  return (
    <div
      onClick={() => navigator(`/timesheets`)}
      className="bg-white  items-start col-span-2  p-4 rounded-md shadow-sm hover:cursor-pointer"
    >
      <div className="font-semibold tracking-wide ">Presence du jour</div>
      <div className="font-medium text-sm text-gray-500">
        {`${new Date().getDate()} ${new Date().toLocaleString("default", {
          month: "long",
        })}
     ${new Date().getFullYear()}`}{" "}
      </div>
      <table className="items-center w-full  text-[#7c7c7e] text-sm my-2">
        <thead>
          <tr className="bg-[#F5F5FA]  ">
            <th className="py-2 ">Employee</th>
            <th>Arrivé</th>

            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {timesheet &&
            timesheet.map((employee) => (
              <tr key={employee.userId} className="border-b">
                <th className=" w-1/3">
                  <EmployeeInfoPreview employee={employee} />
                </th>
                <th>
                  <Arrival
                    arrivedTime={employee.timesheet[today].arrival}
                    color={employee.timesheet[today].arrival.status}
                  />
                </th>

                <th>
                  <div className="flex h-full w-full items-center justify-center">
                    {" "}
                    <div
                      className={`h-3 w-3 rounded-full mx-1 bg-${getStatusColor(
                        employee.status
                      )}`}
                    ></div>
                    <div>{employee.status}</div>
                  </div>
                </th>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
export default EmployeeStatus;
