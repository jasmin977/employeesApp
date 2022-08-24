import React, { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import axios from "axios";
import avatar from "../img/employee.png";

function BirthdayCard() {
  const [loading, setLoading] = useState(true);
  const [birthdays, setBirthdays] = useState();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const birthdayRes = await axios.get("/api/admin/birthdayInfo");

        setBirthdays(birthdayRes.data);
      } catch (error) {
        console.log("error");
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className=" bg-white  p-4 rounded-md shadow-sm">
        <Skeleton variant="text" sx={{ fontSize: "1rem", width: "30%" }} />
        <Skeleton variant="rounded" width={150} height={5} />
        <div className="flex flex-row items-center py-2">
          <Skeleton variant="circular" width={40} height={40} />

          <div className="items-center justify-start px-4">
            <Stack spacing={1}>
              <Skeleton variant="rounded" width={60} height={10} />
              <Skeleton variant="rounded" width={150} height={5} />
            </Stack>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className=" bg-gradient-to-tr  from-[#CFD6E6] to-[#E7EFF9]  p-4 rounded-md shadow-sm">
      <div className="font-semibold tracking-wide">Anniversaire</div>
      <div className="font-medium text-sm text-gray-500">
        {`${new Date().getDate()} ${new Date().toLocaleString("default", {
          month: "long",
        })}
${new Date().getFullYear()}`}{" "}
        {birthdays.length === 0 ? (
          <div>no birthdays</div>
        ) : (
          <div>
            {birthdays.map((birthdayItem, idx) => (
              <div key={idx} className="flex items-center px-2 py-1 ">
                <div>
                  <img
                    src={
                      birthdayItem.profile_IMG === "defaulIMG"
                        ? avatar
                        : birthdayItem.profile_IMG
                    }
                    className="inline-flex items-center justify-center mr-4 text-white transition-all h-12 w-12 rounded-full"
                    alt="user"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h6 className="text-md">
                    {birthdayItem.firstname} {birthdayItem.lastname}
                  </h6>
                  <p className="text-xs text-slate-400">
                    {new Date().getFullYear() -
                      new Date(birthdayItem.date_of_birth).getFullYear()}{" "}
                    ans
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BirthdayCard;
