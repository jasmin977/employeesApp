import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineLock, AiOutlineUser } from "react-icons/ai";
import Clock from "../components/clock";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();
  toast.success(cookies.token);
  const [values, setValues] = useState({ name: "", password: "" });

  useEffect(() => {
    if (cookies.token) {
      navigate("/dashboard"); //which is dashhbord
    }
  }, [cookies, navigate]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "/login",
        {
          ...values, //dataObject
        },
        { withCredentials: true }
      );
      if (data) {
        if (data.errors) {
          console.log(data);
          const { name, password } = data.errors;
          if (name) console.log(name);
          else if (password) console.log(password);
        } else {
          navigate("/dashboard");
        }
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <div class="relative flex min-h-screen flex-col  overflow-hidden bg-gray-60 py-6 sm:py-12 justify-around">
      <div class="relative bg-white  shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-sm flex flex-row">
        <div class=" h-auto basis-1/2 grid grid-cols-1 gap-4 content-center mx-7">
          <p class="font-medium text-sky-900 text-3xl">Login</p>
          <p class="font-thin text-gray-700 text-xs">Login to your account.</p>

          <form onSubmit={(e) => handleSubmit(e)}>
            <div class="h-10 w-60 flex flex-row mb-2">
              <div class=" bg-gray-200 w-10 rounded-tl-md rounded-bl-md grid justify-items-center">
                <AiOutlineUser color="gray" size={25} class="self-center" />
              </div>
              <input
                class="border border-gray-200 rounded-tr-md rounded-br-md px-1 "
                type="text"
                name="name"
                placeholder="name"
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
              />
            </div>
            <div>
              <div class="h-10 w-60 flex flex-row ">
                <div class=" bg-gray-200 w-10 rounded-tl-md rounded-bl-md grid justify-items-center">
                  <AiOutlineLock color="gray" size={25} class="self-center" />
                </div>
                <input
                  class="border border-gray-200 rounded-tr-md rounded-br-md px-1 "
                  type="password"
                  placeholder="password"
                  name="password"
                  onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                  }
                />
              </div>
            </div>

            <button
              class="rounded bg-gradient-to-t  from-my-dark-blue to-my-sky-blue font-medium self-end
               w-1/2 text-white text-sm py-2  my-3.5 relative bottom-0"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
        <div class="bg-[url('../img/bg.png')] basis-1/2 w-64 h-96 bg-cover bg-center justify-center items-center">
          <div class="bg-gradient-to-t from-my-dark-blue to-my-sky-blue-transparent w-full h-full relative  justify-items-center z-0 items-center">
            <div class=" absolute inset-0 flex justify-center items-center z-10">
              <div class="bg-[url('../img/logo.png')] bg-no-repeat w-40 h-40 bg-cover"></div>
            </div>
          </div>
        </div>
      </div>

      <Clock />
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Login;
