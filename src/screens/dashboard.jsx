import React from "react";
import { useCookies } from "react-cookie";
import { SideBar } from "../components";

import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(["token"]);

  const logOut = () => {
    removeCookie("token");
    navigate("/login");
  };
  return (
    <div className="md:ml-64 bg-gray-100 h-full">
      <SideBar />
      <div className="p-6 ">
        <h2 className="text-slate-500 text-2xl">DASHBOARD</h2>
      </div>
      <div className="w-full flex flex-row justify-between px-6 py-6 gap-3 h-screen ">
        <div className="bg-white w-2/3 h-20 p-4 rounded-md shadow-sm">
          <table className="items-center w-full  text-[#7c7c7e] text-sm">
            <thead>
              <tr className="bg-[#F5F5FA]  ">
                <th className="py-2 ">employee</th>
                <th>Start</th>
                <th>Departure</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody></tbody>
          </table>
        </div>
        <div className="bg-white w-1/3 h-20 rounded-md shadow-sm"></div>
      </div>
    </div>
  );
}
