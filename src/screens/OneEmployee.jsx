import React, { useState,useEffect } from "react";
import { Link,useParams } from 'react-router-dom';
import SideBar from "../components/SideBar";
import axios from "axios";
import Lottie from "lottie-react";
import { IoIosArrowRoundBack } from "react-icons/io";
import ClockLoader from "../loader/ClockLoader.json";
function Employee() {
  const [employeeData, setEmployeeData] = useState()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    axios.get(`/api/admin/`,{
      params: {
        id: id
      }
    })
  .then((res) =>{ 
    setEmployeeData(res.data)
    console.log(employeeData)}
   )
  }, [])



  useEffect(() => {
      const fetchData = async () =>{
        setLoading(true);
        try {
          const  response = await axios.get('/api/admin/');
          setData(response.data);
          console.log(response.data);
       
        } catch (error) {
          console.log('error');
        }
        setLoading(false);
      }
  
      fetchData();
    }, []);
  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: ClockLoader,
    
  };
  if (!employeeData) {
    return  <div className="md:ml-64">
    <SideBar/>
    
  {/**  <Lottie options={defaultOptions}
              height={400}
              width={400}
             />
              */} 
    </div>;
  }
  return( 
   <>
  <SideBar/>
    <div className="md:ml-64">
  <Link className="flex flex-row " to="/employees" >
  <IoIosArrowRoundBack color="black" size={25} className="self-center" />Retour 
  </Link>
  <div className="w-full  px-6 py-6 mx-auto">
           <div className="flex flex-wrap mx-3 rounded-md shadow-lg">
            <div className="flex flex-row justify-center w-full max-w-full px-3 right-0 ">

            <div class="  h-full w-1/4">
            {data.map((employee)=>
                            
                            <div className="flex items-center hover:bg-slate-100 pl-2 px-2 py-3">
                            <div>
                            <img src={employee.profile_IMG} class="inline-flex items-center justify-center mr-4  transition-all duration-200 ease-soft-in-out h-10 w-10 rounded-full" />
                            </div>
                            <div className="flex flex-col justify-center">
                            <h6 className="mb-0 leading-normal text-size-sm">{employee.firstname} {employee.lastname}</h6>
                            <p className="mb-0 leading-tight text-size-xs text-slate-400">{employee.phone_number}</p>
                            </div>
                            </div>
                        
                            )}
  </div>
  <div class=" h-full w-3/4 p-8">
  <div>
  <img src={employeeData.profile_IMG} class=" items-center justify-center mr-4 text-white transition-all duration-200 ease-soft-in-out h-20 w-20 rounded-full" />
  <p className="mb-0 leading-7 font-semibold text-2xl">{employeeData.firstname} {employeeData.lastname}</p> 
  </div>
  {/** GENERAL INFO */}
 <div className="bg-gray-100 w-full h-auto flex flex-row justify-between px-10 py-10">
<span className="font-semibold text-lg">General</span>
<div className="flex flex-col">
<p className="font-medium text-gray-600 text-lg">matricule</p>
<p className="font-medium text-gray-600 text-lg">salaire</p>
<p className="font-medium text-gray-600 text-lg">heures/semaine</p>
<p className="font-medium text-gray-600 text-lg">employé depuis</p>
<p className="font-medium text-gray-600 text-lg">jour ferié</p>
</div>
<div className="flex flex-col">
<p className="font-medium text-gray-400 text-lg">{employeeData.matricul}</p>
<p className="font-medium text-gray-400 text-lg">salaire</p>
<p className="font-medium text-gray-400 text-lg">heures/semaine</p>
<p className="font-medium text-gray-400 text-lg">{employeeData.employee_since}</p>
<p className="font-medium text-gray-400 text-lg">{employeeData.holiday}</p>
</div>
 </div>

  {/** WORK HOURS */}
  <div className="bg-gray-100 w-full h-auto flex flex-row justify-between px-10 py-10">
<span className="font-semibold text-lg">Heures de travail</span>
<div className="flex flex-col">
<p className="font-medium text-gray-600 text-lg">heure de début</p>
<p className="font-medium text-gray-600 text-lg">heure de fin</p>
<p className="font-medium text-gray-600 text-lg">heures supplémentaires</p>
<p className="font-medium text-gray-600 text-lg">jours déduits</p>
<p className="font-medium text-gray-600 text-lg">prime</p>
</div>
<div className="flex flex-col">
<p className="font-medium text-gray-400 text-lg">{employeeData.start_time}</p>
<p className="font-medium text-gray-400 text-lg">{employeeData.end}</p>
<p className="font-medium text-gray-400 text-lg">...</p>
<p className="font-medium text-gray-400 text-lg">...</p>
<p className="font-medium text-gray-400 text-lg">15%</p>
</div>
 </div>

  {/** PERSONEL INFORMATION */}
  <div className="bg-gray-100 w-full h-auto flex flex-row justify-between px-10 py-10">
<span className="font-semibold text-lg">Info.personnels</span>
<div className="flex flex-col">
<p className="font-medium text-gray-600 text-lg">nom prénom</p>
<p className="font-medium text-gray-600 text-lg">numero de tèlephone</p>
<p className="font-medium text-gray-600 text-lg">date de naissance</p>
<p className="font-medium text-gray-600 text-lg">ville</p>
</div>
<div className="flex flex-col">
<p className="font-medium text-gray-400 text-lg">{employeeData.firstname} {employeeData.lastname}</p>
<p className="font-medium text-gray-400 text-lg">{employeeData.phone_number}</p>
<p className="font-medium text-gray-400 text-lg">...</p>
<p className="font-medium text-gray-400 text-lg">...</p>
<p className="font-medium text-gray-400 text-lg">..</p>
</div>
 </div>

  </div>
  </div>
  </div>
  </div>         
</div>
</>)
}

export default Employee;
