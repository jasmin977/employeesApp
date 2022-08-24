import React, { useState, useEffect } from "react";
import axios from "axios";
import { ListEmployee, NavBar, SearchWarpper, SideBar } from "../components";

import { Link } from "react-router-dom";
import { FiUserPlus } from "react-icons/fi";
import { Button, PageName, SearchInput } from "../components/atomic";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
function Employees() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/admin/");
        setEmployees(response.data);
        setData(response.data);
      } catch (error) {
        console.log("error");
      }
      setLoading(false);
    };

    fetchData();
  }, []);

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

  useEffect(() => {
    handleSearchTextChange(searchText);
  }, [searchText]);

  if (loading) {
    return (
      <div className="md:ml-64 pt-14 bg-gray-100 h-full">
        <SideBar />
        <NavBar />
        <PageName>Employees</PageName>
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
                    <Stack spacing={2}>
                      <Skeleton variant="rounded" width={"100%"} height={50} />
                      <div className="flex flex-row items-center justify-evenly">
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
      <PageName>Employees</PageName>

      <div className="w-full px-6 py-6 mx-auto h-full">
        <div className="flex flex-wrap -mx-3 ">
          <div className="flex-none w-full max-w-full px-3">
            <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid rounded-sm shadow-lg p-4">
              <div className="flex-auto px-0 pt-0 pb-2">
                <div>
                  <SearchWarpper>
                    <SearchInput
                      placeholder="rechercher employee..."
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                    />

                    <Link to="/addemployee">
                      <Button text="ajouter employé" Icon={FiUserPlus} />
                    </Link>
                  </SearchWarpper>
                  <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
                    <thead className="align-bottom w-full ">
                      <tr className="bg-[#E1E5F0] ">
                        <th className="px-6 py-5 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-size-xxs border-b-solid tracking-none whitespace-nowrap text-[#6d6c6c]">
                          employee ({data.length})
                        </th>
                        <th className="px-6 py-5 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-size-xxs border-b-solid tracking-none whitespace-nowrap text-[#6d6c6c] ">
                          matricul
                        </th>
                        <th className="px-6 py-5 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-size-xxs border-b-solid tracking-none whitespace-nowrap text-[#6d6c6c] ">
                          Start Work
                        </th>
                        <th className="px-6 py-5 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-size-xxs border-b-solid tracking-none whitespace-nowrap text-[#6d6c6c] ">
                          End Work
                        </th>

                        <th className="px-6 py-5 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-size-xxs border-b-solid tracking-none whitespace-nowrap text-[#6d6c6c] ">
                          Status
                        </th>
                        <th className="px-6 py-5 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-size-xxs border-b-solid tracking-none whitespace-nowrap text-[#6d6c6c]">
                          Employed
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {data.map((employee) => (
                        <ListEmployee employee={employee} key={employee.id} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Employees;
