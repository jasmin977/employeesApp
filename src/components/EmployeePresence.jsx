import React, { useState, useEffect } from "react";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

import { FiUsers, FiUserCheck, FiUserX } from "react-icons/fi";

import EmployeeCard from "./atomic/EmployeeCard";
function EmployeePresence() {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const status = ["employee", "present", "absent"];
  const Icons = [FiUsers, FiUserCheck, FiUserX];
  const colors = ["blue", "green", "red"];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/admin/employees");

        setEmployees(response.data);
      } catch (error) {
        console.log("error");
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="bg-white row-span-2 rounded-md shadow-sm">
        <div className="p-4">
          <div className="flex flex-row items-center pb-1">
            <Skeleton variant="circular" width={40} height={40} />

            <div className="items-center justify-start px-4">
              <Stack spacing={1}>
                <Skeleton variant="rounded" width={60} height={10} />
                <Skeleton variant="rounded" width={150} height={5} />
              </Stack>
            </div>
          </div>
          <div className="flex flex-row items-center py-1">
            <Skeleton variant="circular" width={40} height={40} />

            <div className="items-center justify-start px-4">
              <Stack spacing={1}>
                <Skeleton variant="rounded" width={60} height={10} />
                <Skeleton variant="rounded" width={150} height={5} />
              </Stack>
            </div>
          </div>
          <div className="flex flex-row items-center pt-1">
            <Skeleton variant="circular" width={40} height={40} />

            <div className="items-center justify-start px-4">
              <Stack spacing={1}>
                <Skeleton variant="rounded" width={60} height={10} />
                <Skeleton variant="rounded" width={150} height={5} />
              </Stack>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white row-span-2 rounded-md shadow-sm">
      {Object.values(employees).map((list, idx) => (
        <EmployeeCard
          key={idx}
          Icon={Icons[idx]}
          text={status[idx]}
          data={list}
          color={colors[idx]}
        />
      ))}
    </div>
  );
}

export default EmployeePresence;
