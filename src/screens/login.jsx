import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineLock, AiOutlineUser } from "react-icons/ai";
import { useCookies } from "react-cookie";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { InputField, Clock } from "../components";
import { useForm } from "../components/hooks/useForm";
import Button from "@mui/material/Button";
import { AuthContext } from "../context/AuthContext";
const Login = () => {


  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();
  const [values, setValues] = useForm({ name: "", password: "" });
  const { login, isLoggedin,verify } = useContext(AuthContext);

  useEffect(() => {
    console.log("verify");
    verify()
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
       login(values);
      
    } catch (err) {
      console.log(err);
    }
  };

  return !isLoggedin ? (
    <div className="relative flex min-h-screen flex-col  overflow-hidden bg-gray-60 py-6 sm:py-12 justify-around">
      <div className="relative bg-white  shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-sm flex flex-row justify-center sm:justify-start">
        <div className=" h-auto basis-1/2 grid grid-cols-1 gap-4 content-center mx-7">
          <p className="font-medium text-sky-900 text-3xl">Login</p>
          <p className="font-thin text-gray-700 text-xs">
            Login to your account.
          </p>

          <form onSubmit={(e) => handleSubmit(e)}>
            <InputField
              Icon={AiOutlineUser}
              placeholder="name"
              value={values.name}
              name="name"
              type="text"
              action={(e) => setValues(e)}
            />
            <InputField
              Icon={AiOutlineLock}
              placeholder="password"
              value={values.password}
              name="password"
              type="password"
              action={(e) => setValues(e)}
            />
            <div className="flex justify-end items-center w-full">
              <Button
                className=" font-medium 
              w-1/2 text-white text-sm py-2  my-4"
                variant="contained"
                type="submit"
              >
                Login
              </Button>
            </div>
          </form>
        </div>
        <div className="sm:block  hidden bg-[url('../img/bg.png')] basis-1/2 w-64 h-96 bg-cover bg-center justify-center items-center">
          <div className="bg-gradient-to-t from-my-dark-blue to-my-sky-blue-transparent w-full h-full relative  justify-items-center z-0 items-center">
            <div className=" absolute inset-0 flex justify-center items-center z-10">
              <div className="bg-[url('../img/logo.png')] bg-no-repeat w-40 h-40 bg-contain"></div>
            </div>
          </div>
        </div>
      </div>

      <Clock />
      <ToastContainer position="bottom-right" />
    </div>
  ) : (
    <></>
  );
};

export default Login;
