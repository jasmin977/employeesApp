import React, { useState, useEffect } from "react";
import axios from "axios";
import ListEmployee from "../components/ListEmployee";
import SideBar from "../components/SideBar";
import { NavLink } from 'react-router-dom';

function Employees() {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([])


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
  return  <div className="md:ml-64">
 <SideBar/>
 <div className="w-full px-6 py-6 mx-auto">
           <div className="flex flex-wrap -mx-3 rounded-md shadow-lg">
            <div className="flex-none w-full max-w-full px-3">
                <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
                    <div className="p-6 pb-0 mb-0 bg-white border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
                         <h6>Employees</h6>
                    </div>
                    <div className="flex-auto px-0 pt-0 pb-2">
                        <div>
                        <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-500">


<thead className="align-bottom">
<tr>
    
<th className="px-6 py-3 font-bold text-left uppercase align-middle bg-white border-b border-gray-200 shadow-none text-size-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">employee</th>
<th className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-size-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">matricul</th>
<th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-size-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Status</th>
<th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-size-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Employed</th>
<th className="px-6 py-3 font-semibold capitalize align-middle bg-transparent border-b border-gray-200 border-solid shadow-none tracking-none whitespace-nowrap text-slate-400 opacity-70"></th>
</tr>
</thead>

<tbody>

{data.map((employee)=>
<ListEmployee key={employee.id} employee={employee}/>
)}


</tbody>
</table>
                        </div>
                    </div>
                </div>
            </div>
           </div>
            </div>

   </div>
}

export default Employees;
