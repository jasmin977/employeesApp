import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FormInputField, SideBar } from "../components";
import avatar from "../img/employee.png";
import { ToastContainer, toast } from "react-toastify";
import Moment from "moment";

function AddEmployee() {
  const [values, setValues] = useState({
    lastname: "",
    firstname: "",
    gender: "Femme",
    city: "",
    date_of_birth: "",
    phone_number: "",
    matricul: "",
    password: "",
    employee_since: Moment(new Date()).format("YYYY-MM-DD"),
    holiday: 0,
    start_time: "08:00",
    end_time: "18:00",
    profile_IMG: "defaulIMG",
  });
  const [formErrors, setFormErrors] = useState({});
  const errors = {};
  const navigate = useNavigate();

  useEffect(() => {
    console.log(formErrors);
    console.log(values);
  }, [formErrors, values]);

  const clearForm = () => {
    setValues({
      lastname: "",
      firstname: "",
      gender: "Femme",
      city: "",
      date_of_birth: "",
      phone_number: "",
      matricul: "",
      password: "",
      employee_since: Moment(new Date()).format("YYYY-MM-DD"),
      holiday: 0,
      start_time: "08:00",
      end_time: "18:00",
      profile_IMG: "defaulIMG",
    });
  };

  const notify = (msg) => toast.warning(msg);

  const validateForm = () => {
    if (!values.phone_number || values.phone_number.length === 0) {
      notify("Please enter a phone number.");
      setFormErrors({
        ...formErrors,
        phoneNumber: "phone number is required!",
      });

      return false;
    }
    if (!values.lastname || values.lastname.length === 0) {
      notify("Please enter a lastname.");
      setFormErrors({
        ...formErrors,
        lastname: "lastname is required!",
      });

      return false;
    }
    if (!values.firstname || values.firstname.length === 0) {
      notify("Please enter a firstname.");
      setFormErrors({
        ...formErrors,
        firstname: "firstname is required!",
      });
      return false;
    }
    if (!values.matricul || values.matricul.length === 0) {
      notify("Please enter a matricul number.");
      setFormErrors({
        ...formErrors,
        matricul: "matricul is required!",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        const { data, status } = await axios.post("/api/admin/", { ...values });
        if (status) {
          toast.success("nouveau employee ajouté!", {
            position: "top-right",
            theme: "colored",
          });
          clearForm();
          navigate("/employees", { replace: true });
        }
      } catch (ex) {
        toast.error(ex.response.data.message);
      }
    }
  };

  //  convert files to base64 :use of the JavaScript FileReader which has a readAsDataURL method that reads the binary data and encodes it as a base64 data URL
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <>
      <div className="md:ml-64 bg-gray-100">
        <SideBar />

        <div className="w-full bg-gray-100  px-6 py-6 mx-auto">
          <Link
            className="flex flex-row text-gray-500 text-lg font-medium p-3 "
            to="/employees"
          >
            <IoIosArrowRoundBack
              color="gray"
              size={30}
              className="self-center"
            />
            ajouter employé
          </Link>
          <div className="flex flex-wrap mx-3 rounded-md shadow-lg bg-white">
            <div className="flex   w-full max-w-full px-3 right-0 ">
              <form
                className="w-full "
                id="form"
                onSubmit={(e) => handleSubmit(e)}
              >
                <div
                  id="main"
                  className="m-8 grid grid-cols-3   gap-1 justify-evenly"
                >
                  {/** PROFILE IMG */}
                  <div className="md:p-10 ">
                    <img
                      className="h-fit w-fit p-3 object-cover rounded-sm"
                      src={
                        values.profile_IMG === "defaulIMG"
                          ? avatar
                          : values.profile_IMG
                      }
                      alt="employee"
                    />
                    <label className="block">
                      <input
                        type="file"
                        label="Image"
                        name="profile_IMG"
                        accept=".jpeg, .png, .jpg"
                        onChange={async (e) =>
                          setValues({
                            ...values,
                            [e.target.name]: await convertToBase64(
                              e.target.files[0]
                            ),
                          })
                        }
                        className="flex w-full text-transparent hover:text-bg-my-sky-blue
      file:py-2 file:px-4
       file:border-0
      file:text-sm file:font-semibold
      file:bg-transparent file:text-white 
      hover:file:bg-my-sky-blue rounded bg-gradient-to-t   from-my-dark-blue to-my-sky-blue
    "
                      />
                    </label>
                  </div>

                  {/** PERSONAL INFO */}
                  <div className="grid my-3 grid-cols-2 col-span-2 gap-1 justify-evenly">
                    <div>
                      <label className="tracking-wide text-my-dark-blue text-2xl font-bold mb-2">
                        Information Personnels
                      </label>
                    </div>
                    <div></div>
                    <div>
                      <FormInputField
                        error={formErrors.phoneNumber}
                        label="Tèlephone"
                        placeholder="00-000-00"
                        value={values.phone_number}
                        name="phone_number"
                        type="text"
                        action={(e) =>
                          setValues({
                            ...values,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div> </div>

                    <div>
                      <FormInputField
                        error={formErrors.lastname}
                        label="Nom"
                        placeholder="ben flen"
                        value={values.lastname}
                        name="lastname"
                        type="text"
                        action={(e) =>
                          setValues({
                            ...values,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <FormInputField
                        error={formErrors.firstname}
                        label="Prénom"
                        placeholder="flen"
                        value={values.firstname}
                        name="firstname"
                        type="text"
                        action={(e) =>
                          setValues({
                            ...values,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div></div>

                    <div className="grid my-3 grid-cols-3 col-span-2 gap-1 justify-evenly">
                      <div>
                        <label
                          className="block  tracking-wide text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-state"
                        >
                          Genre
                        </label>
                        <div className="relative">
                          <select
                            value={values.gender}
                            name="gender"
                            onChange={(e) =>
                              setValues({
                                ...values,
                                [e.target.name]: e.target.value,
                              })
                            }
                            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-state"
                          >
                            <option value="Femme">Femme</option>
                            <option value="Homme">Homme</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg
                              className="fill-current h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div>
                        <FormInputField
                          label="Ville"
                          placeholder="msaken"
                          value={values.city}
                          name="city"
                          type="text"
                          action={(e) =>
                            setValues({
                              ...values,
                              [e.target.name]: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <FormInputField
                          label="Date de naissance"
                          placeholder="19-12-1999"
                          value={values.date_of_birth}
                          name="date_of_birth"
                          type="date"
                          action={(e) =>
                            setValues({
                              ...values,
                              [e.target.name]: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/** WORK HOURS */}
                  <div className="md:p-5">
                    <label className="tracking-wide text-my-dark-blue text-2xl  font-bold mb-2">
                      Heures du travail
                    </label>
                    <div className="flex flex-row justify-between my-2">
                      <label className="block  tracking-wide text-gray-700 text-sm font-bold  self-center">
                        Debut
                      </label>

                      <div>
                        <FormInputField
                          label=""
                          placeholder="08:00"
                          value={values.start_time}
                          name="start_time"
                          type="time"
                          action={(e) =>
                            setValues({
                              ...values,
                              [e.target.name]: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="flex flex-row justify-between my-2">
                      <label className="block  tracking-wide text-gray-700 text-sm font-bold  self-center">
                        Fin
                      </label>
                      <div>
                        <FormInputField
                          label=""
                          placeholder="18:00"
                          value={values.end_time}
                          name="end_time"
                          type="time"
                          action={(e) =>
                            setValues({
                              ...values,
                              [e.target.name]: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/** TRAVAIL INFO */}
                  <div className="grid my-3 grid-cols-2 col-span-2 gap-1 justify-evenly">
                    <div>
                      <label className="tracking-wide text-my-dark-blue text-2xl font-bold mb-2">
                        Travail
                      </label>
                    </div>
                    <div></div>
                    <div>
                      <FormInputField
                        error={formErrors.matricul}
                        label="Matricule"
                        placeholder="matricule"
                        value={values.matricul}
                        name="matricul"
                        type="text"
                        action={(e) =>
                          setValues({
                            ...values,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <FormInputField
                        label="Mot de passe"
                        placeholder="*********"
                        value={values.password}
                        name="password"
                        type="text"
                        action={(e) =>
                          setValues({
                            ...values,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <FormInputField
                        label="Commencer le"
                        placeholder="aujourdhui"
                        value={values.employee_since}
                        name="employee_since"
                        type="date"
                        action={(e) =>
                          setValues({
                            ...values,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label
                        className="block  tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="holiday"
                      >
                        Jour ferié
                      </label>
                      <div className="relative">
                        <select
                          value={values.holiday}
                          name="holiday"
                          onChange={(e) =>
                            setValues({
                              ...values,
                              [e.target.name]: e.target.value,
                            })
                          }
                          className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-state"
                        >
                          <option value={0}>Dimenche</option>
                          <option value={1}>Lundi</option>
                          <option value={2}>Mardi</option>
                          <option value={3}>Mercredi</option>
                          <option value={4}>Jeudi</option>

                          <option value={5}>Vendredi</option>
                          <option value={6}>Samedi</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={clearForm}
                        className=" md:w-full rounded bg-gray-300 font-medium self-end
                  w-full text-black text-sm py-2  my-3.5 justify-evenly"
                      >
                        <p className="text-base">Annuler</p>
                      </button>
                    </div>
                    <div>
                      <button
                        className=" md:w-full rounded bg-gradient-to-t flex flex-row  from-my-dark-blue to-my-sky-blue font-medium self-end
                  w-full text-white text-sm py-2  my-3.5 justify-evenly  hover:bg-my-sky-blue-transparent  active:bg-my-sky-blue-transparent  px-4 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit"
                      >
                        <p className="text-base">Enregistrer</p>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
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
          </div>
        </div>
      </div>
    </>
  );
}

export default AddEmployee;
