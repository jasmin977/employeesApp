import React, { useState, useEffect } from "react";
import axios from "axios";
import { ListTimeSheetEmployee, SearchBar, SideBar } from "../components";
import { TailSpin } from "react-loader-spinner";

import { ToastContainer } from "react-toastify";

const timeline = new Array(17).fill(0);

function TimeSheets() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [timesheet, settimesheet] = useState(null);

  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/admin/");
        const timeSheetResponse = await axios.get("/api/admin/timesheet");
        settimesheet(timeSheetResponse.data);
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
      <>
        <SideBar />
        <div className="md:ml-64 flex items-center justify-center h-screen ">
          <TailSpin height="80" width="80" color="#136ABA" />
        </div>
      </>
    );
  }
  return (
    <div className="md:ml-64 bg-gray-100 h-full">
      <SideBar />

      <div className="p-6 pb-0 mb-0">
        <h2 className="text-slate-500 text-2xl">Feuilles de temps</h2>
      </div>
      <div className="w-full px-6 py-6 mx-auto h-screen">
        <div className="flex flex-wrap -mx-3 ">
          <div className="flex-none w-full max-w-full px-3">
            <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid rounded-sm shadow-lg p-4">
              <div className="flex-auto px-0 pt-0 pb-2">
                <div>
                  <SearchBar
                    action={(e) => setSearchText(e.target.value)}
                    value={searchText}
                  />

                  <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
                    <thead className="w-full ">
                      <tr className="bg-[#E1E5F0]">
                        <th className="font-medium uppercase py-4 text-[#6d6c6c] ">
                          Employee
                        </th>
                        {timeline.map((_, idx) => (
                          <th
                            key={`thead_time_${idx}`}
                            className="text-sm font-thin py-4 text-[#6d6c6c] "
                          >
                            {("0" + (7 + idx)).slice(-2)}:00
                          </th>
                        ))}
                        <th className="font-medium uppercase py-4 text-[#6d6c6c] ">
                          arrivé
                        </th>
                        <th className="font-medium uppercase py-4 text-[#6d6c6c] ">
                          total
                        </th>
                      </tr>
                    </thead>

                    {timesheet && (
                      <tbody>
                        {timesheet.map((employee) => (
                          <ListTimeSheetEmployee
                            employee={employee}
                            key={employee.userId}
                          />
                        ))}
                      </tbody>
                    )}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
export default TimeSheets;
