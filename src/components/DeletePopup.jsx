import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function DeletePopup(props) {
  const navigate = useNavigate();

  const deleteEmployee = async (id) => {
    try {
      const response = await axios.delete(`/api/admin/${id}`);
      if (response) {
        toast.success("deleted!", {
          position: "top-right",
          theme: "colored",
        });
        // clearForm();
        navigate(`/employees`);
      }
    } catch (ex) {
      toast.error(ex.response.data.message);
    }
  };

  return props.trigger ? (
    <div className="fixed top-0 left-0 w-full h-full bg-black/40 flex justify-center items-center">
      <div className="relative p-10 md:w-1/4 w-1/2 h-1/3 bg-white rounded-md border-red-500 border-b-2">
        <div className="absolute w-full h-full top-0 right-0">
          <div className="px-6 pt-6">
            <h2 className="font-semibold text-lg">Delete account</h2>
            <p className="">
              are you sure you want to delete this account? if you delete this
              account , you will permanently lose this profile ,data and
              information.
            </p>
          </div>
          <div className="flex w-full flex-row ">
            <button
              onClick={() => props.setTrigger(false)}
              className=" w-full rounded bg-white font-medium self-end hover:bg-gray-100 border border-gray-300
                  text-black text-sm p-2  m-4 justify-evenly"
            >
              <p className="text-base">Cancel</p>
            </button>
            <button
              onClick={() => deleteEmployee(props.id)}
              className=" w-full rounded bg-red-500 font-medium self-end hover:bg-red-400
                  text-white text-sm p-2  m-4 justify-evenly"
            >
              <p className="text-base">Delete</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default DeletePopup;
