import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { TbFileExport } from "react-icons/tb";
import axios from "axios";
import {
  ListTimeSheetEmployee,
  NavBar,
  SearchWarpper,
  SideBar,
  MonthChanger,
} from "../components";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import avatar from "../img/employee.png";
import {
  Button,
  EmployeeInfoPreview,
  PageName,
  SearchInput,
  Status,
  StatusInstructions,
} from "../components/atomic";

const timeline = new Array(17).fill(0);

function TimeSheetEmployee() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [thisMonth, setThisMonth] = useState(new Date().getMonth() + 1);
  const [timesheet, settimesheet] = useState(null);
  const [employeeData, setEmployee] = useState();
  const navigate = useNavigate();
  const days = {
    0: "Dimenche",
    1: "Lundi",
    2: "Mardi",
    3: "Mercredi",
    4: "Jeudi",
    5: "Vendredi",
    6: "Samedi",
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const getEmployee = await axios.get(`/api/admin/?id=${id}`);
        const timeSheetResponse = await axios.get(
          `/api/admin/timesheet?id=${id}&month=${thisMonth}`
        );
        settimesheet(...timeSheetResponse.data);
        setEmployee(getEmployee.data);
      } catch (error) {
        console.log("error");
      }
      setLoading(false);
    };

    fetchData();
  }, [thisMonth]);

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

      <div className="w-full px-6 py-6 mx-auto h-full">
        <div
          className="flex w-fit flex-row text-gray-500 text-lg font-medium p-3 hover:cursor-pointer  hover:text-gray-400"
          onClick={() => navigate(-1)}
        >
          <IoIosArrowRoundBack color="gray" size={30} className="self-center" />
          Go back
        </div>
        <div className="flex flex-wrap -mx-3 ">
          <div className="flex-none w-full max-w-full px-3">
            <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid rounded-sm shadow-lg p-4">
              <div className="flex-auto px-0 pt-0 pb-2">
                <div>
                  <SearchWarpper>
                    <div>
                      <span className="font-semibold text-gray-800 text-md p-4">
                        {" "}
                        Feuille de présence employé
                      </span>
                      <div className="flex items-center p-4 hover:cursor-pointer hover:bg-slate-50 hover:shadow-sm ">
                        <div>
                          <img
                            src={
                              employeeData.profile_IMG === "defaulIMG"
                                ? avatar
                                : employeeData.profile_IMG
                            }
                            className="inline-flex items-center justify-center mr-4 text-white  h-20 w-20 rounded-full"
                            alt="user1"
                          />
                        </div>
                        <div className="flex flex-col justify-center">
                          <h6 className="font-semibold text-gray-800 text-lg ">
                            {employeeData.firstname} {employeeData.lastname}
                          </h6>
                          <Status employee={employeeData} />
                        </div>
                      </div>
                    </div>
                    <Button Icon={TbFileExport} text="exporter" />
                  </SearchWarpper>
                  <SearchWarpper>
                    <MonthChanger thisMonth={thisMonth} setter={setThisMonth} />

                    <StatusInstructions />
                  </SearchWarpper>

                  <div className="table_head bg-[#F5F5FA]">
                    <div className="font-medium capitalize text-[#999898]">
                      Date
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
                  {!timesheet ? (
                    <div className=" flex items-baseline justify-center pt-8 w-full bg-slate-50 h-screen">
                      {" "}
                      <div className="text-lg text-gray-400">
                        aucun pointage pour cet mois
                      </div>
                    </div>
                  ) : (
                    Object.keys(timesheet.timesheet).map((key) => (
                      <div key={key}>
                        {new Date(key) < new Date() && (
                          <ListTimeSheetEmployee
                            userId={timesheet.userId}
                            day={timesheet.timesheet[key]}
                          >
                            <div className="flex justify-around w-full">
                              {" "}
                              <h2 className="text-center text-sm">
                                {days[new Date(key).getDay()]}
                              </h2>
                              <h2 className="text-center text-sm">{key}</h2>
                            </div>
                          </ListTimeSheetEmployee>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default TimeSheetEmployee;
