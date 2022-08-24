import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ListTimeSheetEmployee,
  NavBar,
  SearchWarpper,
  SideBar,
} from "../components";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Moment from "moment";

import {
  Button,
  EmployeeInfoPreview,
  PageName,
  SearchInput,
  StatusInstructions,
} from "../components/atomic";
import { formatDate } from "../helpers/format-time";

const timeline = new Array(17).fill(0);

function TimeSheets() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [timesheet, settimesheet] = useState(null);
  const [todayDate, setTodayDate] = useState(
    Moment(new Date()).format("YYYY-MM-DD")
  );

  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/admin/");
        const timeSheetResponse = await axios.get(
          `/api/admin/timesheet?date=${todayDate}`
        );
        settimesheet(timeSheetResponse.data);

        setEmployees(response.data);
      } catch (error) {
        console.log("error");
      }
      setLoading(false);
    };

    fetchData();
  }, [todayDate]);

  const handleSearchTextChange = (text) => {
    if (text.length === 0) {
      setData(employees);
    } else {
      let filtredEmployees = [];

      filtredEmployees = employees.filter((employee) => {
        const lc = employee.firstname.toLowerCase();
        text = text.toLowerCase();

        return lc.includes(text);
      });
      setData(filtredEmployees);
    }
  };

  const onChangeDate = (e) => {
    const newDate = Moment(new Date(e.target.value)).format("YYYY-MM-DD");
    setTodayDate(newDate);
  };
  useEffect(() => {
    handleSearchTextChange(searchText);
  }, [searchText]);

  if (loading) {
    return (
      <div className="md:ml-64 pt-14 bg-gray-100 h-full">
        <SideBar />
        <NavBar />
        <PageName>Feuilles de temps</PageName>
        <div className="w-full px-6 py-6 mx-auto h-full">
          <div className="flex flex-wrap -mx-3 ">
            <div className="flex-none w-full max-w-full px-3">
              <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid rounded-sm shadow-lg p-4">
                <div className="flex-auto px-0 pt-0 pb-2">
                  <Stack spacing={1}>
                    <SearchWarpper>
                      <Skeleton variant="rounded" width={"30%"} height={40} />

                      <Skeleton variant="rounded" width={"20%"} height={40} />
                    </SearchWarpper>
                    <Skeleton variant="rounded" width={"100%"} height={15} />
                    <Stack spacing={2}>
                      <Skeleton variant="rounded" width={"100%"} height={50} />
                      <div className="flex flex-row items-center justify-between">
                        <Skeleton variant="circular" width={40} height={40} />
                        <Skeleton variant="rounded" width={"95%"} height={20} />
                      </div>
                      <div className="flex flex-row items-center justify-between">
                        <Skeleton variant="circular" width={40} height={40} />
                        <Skeleton variant="rounded" width={"95%"} height={20} />
                      </div>
                      <div className="flex flex-row items-center justify-between">
                        <Skeleton variant="circular" width={40} height={40} />
                        <Skeleton variant="rounded" width={"95%"} height={20} />
                      </div>
                      <div className="flex flex-row items-center justify-between">
                        <Skeleton variant="circular" width={40} height={40} />
                        <Skeleton variant="rounded" width={"95%"} height={20} />
                      </div>
                      <div className="flex flex-row items-center justify-between">
                        <Skeleton variant="circular" width={40} height={40} />
                        <Skeleton variant="rounded" width={"95%"} height={20} />
                      </div>
                      <div className="flex flex-row items-center justify-between">
                        <Skeleton variant="circular" width={40} height={40} />
                        <Skeleton variant="rounded" width={"95%"} height={20} />
                      </div>
                    </Stack>
                  </Stack>
                </div>
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
      <PageName>Feuilles de temps</PageName>

      <div className="w-full px-6 py-6 mx-auto h-screen">
        <div className="flex flex-wrap -mx-3 ">
          <div className="flex-none w-full max-w-full px-3">
            <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid rounded-sm shadow-lg p-4">
              <div className="flex-auto px-0 pt-0 pb-2">
                <div>
                  <SearchWarpper>
                    <SearchInput
                      onChange={(e) => setSearchText(e.target.value)}
                      value={searchText}
                      placeholder="rechercher employee..."
                    />
                    <Button text="exporter" />
                  </SearchWarpper>
                  <SearchWarpper>
                    <input
                      className={`appearance-none block w-1/3  text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none
         focus:bg-white   `}
                      type="date"
                      name="changeDate"
                      value={todayDate}
                      onChange={onChangeDate}
                    />

                    <StatusInstructions />
                  </SearchWarpper>
                  <div className="table_head bg-[#F5F5FA]">
                    <div className="font-medium capitalize text-[#999898]">
                      Employee
                    </div>
                    {timeline.map((_, idx) => (
                      <div
                        key={`thead_time_${idx}`}
                        className="text-xs font-thin text-[#8a8a8a] "
                      >
                        {("0" + ((7 + idx) % 24)).slice(-2)}:00
                      </div>
                    ))}
                    <div></div>
                    <div className="font-medium capitalize text-[#8a8a8a]">
                      arrivé
                    </div>
                    <div className="font-medium capitalize text-[#8a8a8a]">
                      total
                    </div>
                  </div>
                  {timesheet &&
                    timesheet.map((employee) => (
                      <ListTimeSheetEmployee
                        day={
                          employee.timesheet[Object.keys(employee.timesheet)[0]]
                        }
                        userId={employee.userId}
                        key={employee.userId}
                      >
                        <EmployeeInfoPreview employee={employee} />
                      </ListTimeSheetEmployee>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default TimeSheets;
