import React, { useState, useEffect } from "react";
import axios from "axios";
import { SideBar } from "../components";
import { TailSpin } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import { timeDifference } from "../helpers/timeDifference";
import { GrCheckbox, GrCheckboxSelected } from "react-icons/gr";

function ToDo() {
  const [loading, setLoading] = useState(true);
  const [taskTEXT, setTASKtext] = useState("");
  const [tasks, setasks] = useState([]);
  useEffect(() => {
    const fetchTASKS = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/task/");
        setasks(response.data);
      } catch (error) {
        console.log("error");
      }
      setLoading(false);
    };

    fetchTASKS();
  }, []);

  const handleSubmit = async () => {
    try {
      await axios.post("/api/task/", { text: taskTEXT });

      toast.success("nouveau tache ajouté!", {
        position: "top-right",
        theme: "colored",
      });
      setTASKtext("");
    } catch (ex) {
      toast.error(ex.response.data.message);
    }
  };
  const checkToggle = async (id) => {
    try {
      await axios.put(`/api/task/check/${id}`);

      toast.success("UPTADED!", {
        position: "top-right",
        theme: "colored",
      });
    } catch (ex) {
      toast.error(ex.response.data.message);
    }
  };

  return (
    <div className="md:ml-64 bg-gray-100 h-full">
      <SideBar />

      <div className="p-6 pb-0 mb-0">
        <h2 className="text-slate-500 text-2xl">TACHES</h2>
      </div>
      <div className="w-full px-6 py-6 mx-auto h-screen">
        <div className="flex flex-wrap -mx-3 ">
          <div className="flex-none w-full max-w-full px-3">
            <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid rounded-sm shadow-lg p-4">
              <form onSubmit={handleSubmit}>
                <div class="mb-6">
                  <input
                    type="text"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5 0"
                    placeholder="add new task"
                    value={taskTEXT}
                    name="task"
                    onChange={(e) => setTASKtext(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  class="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
                >
                  ADD
                </button>
              </form>
              <div className="flex-auto px-0 pt-0 pb-2">
                {loading ? (
                  <div className="md:ml-64 flex items-center justify-center h-screen ">
                    <TailSpin height="80" width="80" color="#136ABA" />
                  </div>
                ) : (
                  <div>
                    {tasks.map((task, index) => (
                      <div
                        key={index}
                        className="flex flex-col justify-between w-fit p-4 leading-normal"
                      >
                        <div className="flex flex-row justify-start  ">
                          {task.isDone ? (
                            <GrCheckboxSelected name="slected" size={25} />
                          ) : (
                            <GrCheckbox name="notselected" size={25} />
                          )}
                          <h5
                            className={`text-2xl font-bold mx-2 ${
                              task.isDone ? "line-through " : ""
                            } tracking-tight text-gray-900`}
                          >
                            {task.text}
                          </h5>
                          <button
                            onClick={() => checkToggle(task.id)}
                            class="text-white bg-green-500  font-medium rounded-lg text-sm w-auto px-5 py-2.5 text-center "
                          >
                            check
                          </button>
                        </div>
                        <h1 className="text-sm font-thin text-gray-400">
                          {timeDifference(new Date(), new Date(task.createdAT))}
                        </h1>
                      </div>
                    ))}
                  </div>
                )}
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

export default ToDo;
