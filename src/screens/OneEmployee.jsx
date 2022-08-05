import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import SideBar from "../components/SideBar";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import avatar from "../img/employee.png";
import { IoIosArrowRoundBack } from "react-icons/io";
import { NavLink } from "react-router-dom";
function Employee() {
  const [employeeData, setEmployeeData] = useState();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const days = {
    0: "Dimenche",
    1: "Lundi",
    2: "Mardi",
    3: "Mercredi",
    4: "Jeudi",
    5: "Vendredi",
    6: "Samedi",
  };

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/api/admin/`, {
        params: {
          id: id,
        },
      })
      .then((res) => {
        setEmployeeData(res.data);
      });
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/admin/");
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("error");
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading || !employeeData) {
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
    <>
      <div className="md:ml-64  bg-gray-100">
        <SideBar />
        <div className="w-full bg-gray-100  px-6 py-6 mx-auto">
          <Link
            className="flex flex-row text-gray-500 text-lg font-medium px-6 py-6 mx-auto"
            to="/employees"
          >
            <IoIosArrowRoundBack
              color="gray"
              size={30}
              className="self-center"
            />
            employees
          </Link>
          <div className="flex flex-wrap justify-end mx-3 rounded-md shadow-lg bg-white">
            <button
              className="  rounded bg-gradient-to-t flex   from-my-dark-blue to-my-sky-blue font-medium 
                  w-auto text-white text-sm py-2 m-5 justify-end  hover:bg-my-sky-blue-transparent  active:bg-my-sky-blue-transparent  px-4 outline-none focus:outline-none  ease-linear transition-all duration-150"
            >
              <p className="text-base">Exporter</p>
            </button>
            <div className="flex flex-row justify-center w-full max-w-full px-3 right-0 ">
              <div class="  h-full w-1/4 pl-2 pt-2 pb-2">
                {data.map((employee, index) => (
                  <NavLink to={`/employee/${employee.id}`} exact="true">
                    <div
                      className={`flex items-center border-b border-gray-300  
                      ${
                        employee.id.toString() === id
                          ? "bg-my-sky-blue-transparent"
                          : index % 2 === 0
                          ? "bg-slate-50"
                          : "bg-transparent"
                      } hover:bg-my-sky-blue-transparent pl-2 px-2 py-3`}
                    >
                      <div>
                        <img
                          src={
                            employee.profile_IMG === "defaulIMG"
                              ? avatar
                              : employee.profile_IMG
                          }
                          class="inline-flex items-center justify-center mr-4  transition-all duration-200 ease-soft-in-out h-10 w-10 rounded-full"
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h6 className="mb-0 leading-normal text-size-sm">
                          {employee.firstname} {employee.lastname}
                        </h6>
                        <p className="mb-0 leading-tight text-size-xs text-slate-400">
                          {employee.phone_number}
                        </p>
                      </div>
                    </div>
                  </NavLink>
                ))}
              </div>
              <div className=" h-full w-3/4  border-l border-gray-300 p-10">
                <div className="flex justify-start flex-row">
                  <img
                    src={
                      employeeData.profile_IMG === "defaulIMG"
                        ? avatar
                        : employeeData.profile_IMG
                    }
                    class=" items-center justify-center mr-4 text-white transition-all duration-200 ease-soft-in-out h-24 w-24 rounded-full"
                  />
                  <div className="flex  justify-center flex-col">
                    <p className="mb-0 leading-7 font-semibold text-3xl">
                      {employeeData.firstname} {employeeData.lastname}
                    </p>
                    <p className="mb-0 leading-7 font-medium text-1xl">
                      Status
                    </p>
                  </div>
                </div>
                <div className="bg-gray-100">
                  {/** GENERAL INFO */}
                  <div className="grid my-3 grid-cols-3 gap-1 justify-evenly  w-full h-auto px-10 py-10">
                    <span className="font-semibold text-lg">General</span>
                    <div className="flex flex-col">
                      <p className="font-medium text-gray-600 text-lg">
                        matricule
                      </p>
                      <p className="font-medium text-gray-600 text-lg">
                        salaire
                      </p>
                      <p className="font-medium text-gray-600 text-lg">
                        heures/semaine
                      </p>
                      <p className="font-medium text-gray-600 text-lg">
                        employé depuis
                      </p>
                      <p className="font-medium text-gray-600 text-lg">
                        jour ferié
                      </p>
                    </div>
                    <div className="flex flex-col">
                      <p className="font-medium text-gray-400 text-lg">
                        {employeeData.matricul}
                      </p>
                      <p className="font-medium text-gray-400 text-lg">
                        salaire
                      </p>
                      <p className="font-medium text-gray-400 text-lg">
                        heures/semaine
                      </p>
                      <p className="font-medium text-gray-400 text-lg">
                        {employeeData.employee_since}
                      </p>
                      <p className="font-medium text-gray-400 text-lg">
                        {days[employeeData.holiday]}
                      </p>
                    </div>
                  </div>

                  {/** WORK HOURS */}
                  <div className="grid my-3 grid-cols-3 gap-1 justify-evenly  w-full h-auto px-10 py-10">
                    <span className="font-semibold text-lg">
                      Heures de travail
                    </span>
                    <div className="flex flex-col">
                      <p className="font-medium text-gray-600 text-lg">
                        heure de début
                      </p>
                      <p className="font-medium text-gray-600 text-lg">
                        heure de fin
                      </p>
                      <p className="font-medium text-gray-600 text-lg">
                        heures supplémentaires
                      </p>
                      <p className="font-medium text-gray-600 text-lg">
                        jours déduits
                      </p>
                      <p className="font-medium text-gray-600 text-lg">prime</p>
                    </div>
                    <div className="flex flex-col">
                      <p className="font-medium text-gray-400 text-lg">
                        {employeeData.start_time}
                      </p>
                      <p className="font-medium text-gray-400 text-lg">
                        {employeeData.end_time}
                      </p>
                      <p className="font-medium text-gray-400 text-lg">...</p>
                      <p className="font-medium text-gray-400 text-lg">...</p>
                      <p className="font-medium text-gray-400 text-lg">15%</p>
                    </div>
                  </div>

                  {/** PERSONEL INFORMATION */}
                  <div className="grid my-3 grid-cols-3 gap-1 justify-evenly  w-full h-auto px-10 py-10">
                    <span className="font-semibold text-lg">
                      Info.personnels
                    </span>
                    <div className="flex flex-col">
                      <p className="font-medium text-gray-600 text-lg">
                        nom prénom
                      </p>
                      <p className="font-medium text-gray-600 text-lg">
                        numero de tèlephone
                      </p>
                      <p className="font-medium text-gray-600 text-lg">
                        date de naissance
                      </p>
                      <p className="font-medium text-gray-600 text-lg">ville</p>
                    </div>
                    <div className="flex flex-col">
                      <p className="font-medium text-gray-400 text-lg">
                        {employeeData.firstname} {employeeData.lastname}
                      </p>
                      <p className="font-medium text-gray-400 text-lg">
                        {employeeData.phone_number}
                      </p>
                      <p className="font-medium text-gray-400 text-lg">
                        {employeeData.date_of_birth}
                      </p>
                      <p className="font-medium text-gray-400 text-lg">
                        {employeeData.city}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Employee;
