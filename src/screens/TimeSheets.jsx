import React, { useState, useEffect } from "react";
import axios from "axios";
import { ListTimeSheetEmployee, SideBar } from "../components";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FiUserPlus } from "react-icons/fi";
import { ToastContainer } from "react-toastify";
function TimeSheets() {
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
                  <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
                    <thead className="align-bottom w-full ">
                      <tr className="content-between  ">
                        <th className="px-6 py-3 font-bold flex flex-row border-b-solid text-slate-400 opacity-70">
                          <label className="relative block">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                              <BsSearch className="text-slate-400" size={20} />
                            </div>
                            <input
                              className="placeholder placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                              placeholder="rechercher employee..."
                              value={searchText}
                              onChange={(e) => setSearchText(e.target.value)}
                              type="text"
                            />
                          </label>
                        </th>
                        <th></th> <th></th> <th></th> <th></th> <th></th>{" "}
                        <th></th> <th></th> <th></th> <th></th> <th></th>{" "}
                        <th></th> <th></th> <th></th> <th></th> <th></th>{" "}
                        <th></th>
                        <th></th>
                        <th></th>
                        <th>
                          <button
                            className="rounded bg-gradient-to-t flex flex-row  from-my-dark-blue to-my-sky-blue font-medium self-end
            w-full text-white text-sm py-2  my-3.5 justify-evenly"
                          >
                            <p className="text-base">exporter</p>{" "}
                          </button>
                        </th>
                      </tr>
                      <tr className="bg-[#E1E5F0] ">
                        <th className="pl-6 py-5 flex justify-between font-medium text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-size-xxs border-b-solid tracking-none whitespace-nowrap text-[#6d6c6c] ">
                          <p>Employee</p>
                          <p>07:</p>
                        </th>
                        <th className=" font-thin text-left  align-middle  text-[#6d6c6c]  ">
                          <div className="flex flex-row justify-between">
                            <p>00</p>
                            <p>08:</p>
                          </div>
                        </th>
                        <th className=" font-thin text-left  align-middle  text-[#6d6c6c] ">
                          <div className="flex flex-row justify-between">
                            <p>00</p>
                            <p>09:</p>
                          </div>
                        </th>
                        <th className=" font-thin text-left  align-middle  text-[#6d6c6c] ">
                          <div className="flex flex-row justify-between">
                            <p>00</p>
                            <p>10:</p>
                          </div>
                        </th>
                        <th className=" font-thin text-left  align-middle  text-[#6d6c6c] ">
                          <div className="flex flex-row justify-between">
                            <p>00</p>
                            <p>11:</p>
                          </div>
                        </th>
                        <th className=" font-thin text-left  align-middle  text-[#6d6c6c] ">
                          <div className="flex flex-row justify-between">
                            <p>00</p>
                            <p>12:</p>
                          </div>
                        </th>
                        <th className=" font-thin text-left  align-middle  text-[#6d6c6c] ">
                          <div className="flex flex-row justify-between">
                            <p>00</p>
                            <p>13:</p>
                          </div>
                        </th>
                        <th className=" font-thin text-left  align-middle  text-[#6d6c6c] ">
                          <div className="flex flex-row justify-between">
                            <p>00</p>
                            <p>14:</p>
                          </div>
                        </th>
                        <th className=" font-thin text-left  align-middle  text-[#6d6c6c] ">
                          <div className="flex flex-row justify-between">
                            <p>00</p>
                            <p>15:</p>
                          </div>
                        </th>
                        <th className=" font-thin text-left  align-middle  text-[#6d6c6c] ">
                          <div className="flex flex-row justify-between">
                            <p>00</p>
                            <p>16:</p>
                          </div>
                        </th>
                        <th className=" font-thin text-left  align-middle  text-[#6d6c6c] ">
                          <div className="flex flex-row justify-between">
                            <p>00</p>
                            <p>16:</p>
                          </div>
                        </th>
                        <th className=" font-thin text-left  align-middle  text-[#6d6c6c] ">
                          <div className="flex flex-row justify-between">
                            <p>00</p>
                            <p>17:</p>
                          </div>
                        </th>
                        <th className=" font-thin text-left  align-middle  text-[#6d6c6c] ">
                          <div className="flex flex-row justify-between">
                            <p>00</p>
                            <p>18:</p>
                          </div>
                        </th>
                        <th className=" font-thin text-left  align-middle  text-[#6d6c6c] ">
                          <div className="flex flex-row justify-between">
                            <p>00</p>
                            <p>19:</p>
                          </div>
                        </th>
                        <th className=" font-thin text-left  align-middle  text-[#6d6c6c] ">
                          <div className="flex flex-row justify-between">
                            <p>00</p>
                            <p>20:</p>
                          </div>
                        </th>
                        <th className=" font-thin text-left  align-middle  text-[#6d6c6c] ">
                          <div className="flex flex-row justify-between">
                            <p>00</p>
                            <p>21:</p>
                          </div>
                        </th>
                        <th className=" font-thin text-left  align-middle  text-[#6d6c6c] ">
                          <div className="flex flex-row justify-between">
                            <p>00</p>
                            <p>22:</p>
                          </div>
                        </th>
                        <th className=" font-thin text-left  align-middle  text-[#6d6c6c] ">
                          <div className="flex flex-row justify-between">
                            <p>00</p>
                            <p>23:</p>
                          </div>
                        </th>
                        <th className=" font-thin text-left  align-middle  text-[#6d6c6c] ">
                          <div className="flex flex-row justify-between">
                            <p>00:00</p>
                          </div>
                        </th>
                        <th className="px-6 py-5 pl-2 font-medium text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-size-xxs border-b-solid tracking-none whitespace-nowrap text-[#6d6c6c] ">
                          arrivé
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {data.map((employee) => (
                        <ListTimeSheetEmployee
                          employee={employee}
                          key={employee.id}
                        />
                      ))}
                    </tbody>
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
