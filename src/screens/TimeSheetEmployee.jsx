import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  ListTimeSheetEmployee,
  NavBar,
  SearchWarpper,
  SideBar,
} from "../components";
import { TailSpin } from "react-loader-spinner";

import {
  Button,
  PageName,
  SearchInput,
  StatusInstructions,
} from "../components/atomic";

const timeline = new Array(17).fill(0);

function TimeSheetEmployee() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [timesheet, settimesheet] = useState(null);

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const timeSheetResponse = await axios.get(
          `/api/admin/timesheet?id=${id}`
        );
        settimesheet(...timeSheetResponse.data);
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
                  <StatusInstructions />
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

                  {timesheet &&
                    Object.keys(timesheet.timesheet).map((key) => (
                      <div key={key}>
                        {new Date(key) < new Date() && (
                          <ListTimeSheetEmployee
                            userId={timesheet.userId}
                            day={timesheet.timesheet[key]}
                          >
                            <h2 className="text-center text-sm">{key}</h2>
                          </ListTimeSheetEmployee>
                        )}
                      </div>
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
export default TimeSheetEmployee;
