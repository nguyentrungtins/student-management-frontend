"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import Toastify from "@/components/toastify";
import { success, warn } from "@/components/toastify";

const StudentInfo = () => {
  const [student, setStudent] = useState([]);
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const handleSubmit = () => {
    const url = "http://localhost:3030/user/getPassword";
    if (newPass == confirmPass) {
      axios
        .post(
          url,
          {
            current_password: password,
            new_password: newPass,
          },
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
            },
          }
        )
        .then((res) => {
          if (res.data == "Password changed") {
            setPassword("");
            setNewPass("");
            setConfirmPass("");
            success("Done");
          } else {
            warn(res.data)
          }
        });
    } else {
      // alert("password doesn't match!");
      warn("Password doesn't match!")
    }
  };

  useEffect(() => {
    const url = "http://localhost:3030/user/student";
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        // console.log(res);
        setStudent(res.data.id_user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div className="p-4 sm:ml-64 flex flex-row">
        <Toastify />
        <div className="basis-1/3 border-x-2 ">
          <div className="flex items-center p-4 mt-10">
            <div className="relative flex flex-col items-center w-full">
              <div className="h-24 w-24 md rounded-full relative avatar flex items-end justify-end min-w-max absolute -top-16 flex ">
                <img
                  className="h-24 w-24 md rounded-full relative"
                  src={`http:localhost:3030/images/${student.img}`}
                  alt=""
                  // fill={true}
                />
                <div className="absolute"></div>
              </div>
              <div className="flex flex-col space-y-1 justify-center items-center -mt-12 w-full">
                <div className="py-2 flex space-x-2">
                  <button
                    type="button"
                    className="inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                  >
                    Upload photo
                  </button>
                  <button
                    type="button"
                    className="inline-block rounded border-2 border-primary-100 px-6 pt-2 pb-[6px] text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:border-primary-accent-100 hover:bg-neutral-500 hover:bg-opacity-10 focus:border-primary-accent-100 focus:outline-none focus:ring-0 active:border-primary-accent-200 dark:text-primary-100 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                    data-te-ripple-init
                  >
                    Delete
                  </button>
                </div>
              </div>
              <table className="text-sm my-3 bg-gray-100">
                <tbody>
                  <tr>
                    <td className="px-2 py-2 text-gray-500 font-bold">Name</td>
                    <td className="px-2 py-2">
                      {student && student.last_name} {student.first_name}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 text-gray-500 font-bold">
                      Student Id
                    </td>
                    <td className="px-2 py-2">
                      {student && student.id_student}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 text-gray-500 font-bold">Phone</td>
                    <td className="px-2 py-2">{student && student.phone}</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 text-gray-500 font-bold">
                      Date of birth
                    </td>
                    <td className="px-2 py-2">
                      {student && student.birth_day}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 text-gray-500 font-bold">
                      Address
                    </td>
                    <td className="px-2 py-2">{student && student.address}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="basis-2/3">
          <div className="inputs w-full max-w-2xl p-6 mx-auto">
            <h2 className="text-xl text-gray-900 font-semibold">
              Student Information
            </h2>
            <form className="mt-6 border-t border-gray-400 pt-4">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6">
                  <label className="block tracking-wide text-gray-700 text-sm font-bold mb-2">
                    First name
                  </label>
                  <span
                    type="text"
                    className="appearance-none block w-full text-sm bg-white text-gray-700 border border-gray-300 shadow-inner rounded-md py-1 px-4 leading-tight focus:outline-none  focus:border-gray-400"
                  >
                    {student && student.first_name}
                  </span>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6">
                  <label className="block tracking-wide text-gray-700 text-sm font-bold mb-2">
                    Last name
                  </label>
                  <span
                    type="text"
                    className="appearance-none block w-full text-sm bg-white text-gray-700 border border-gray-300 shadow-inner rounded-md py-1 px-4 leading-tight focus:outline-none  focus:border-gray-400"
                  >
                    {student && student.last_name}
                  </span>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6">
                  <label className="block tracking-wide text-gray-700 text-sm font-bold mb-2">
                    Student Id
                  </label>
                  <span
                    type="text"
                    className="appearance-none block w-full text-sm bg-white text-gray-700 border border-gray-300 shadow-inner rounded-md py-1 px-4 leading-tight focus:outline-none  focus:border-gray-400"
                  >
                    {student && student.id_student}
                  </span>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6">
                  <label className="block tracking-wide text-gray-700 text-sm font-bold mb-2">
                    Phone number
                  </label>
                  <span
                    type="text"
                    className="appearance-none block w-full text-sm bg-white text-gray-700 border border-gray-300 shadow-inner rounded-md py-1 px-4 leading-tight focus:outline-none  focus:border-gray-400"
                  >
                    {student && student.phone}
                  </span>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6">
                  <label className="block tracking-wide text-gray-700 text-sm font-bold mb-2">
                    Date of birth
                  </label>
                  <div className="flex-shrink w-full inline-block relative">
                    <span
                      type="text"
                      className="appearance-none block w-full text-sm bg-white text-gray-700 border border-gray-300 shadow-inner rounded-md py-1 px-4 leading-tight focus:outline-none  focus:border-gray-400"
                    >
                      {student && student.birth_day}
                    </span>
                  </div>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6">
                  <label className="block tracking-wide text-gray-700 text-sm font-bold mb-2">
                    Address
                  </label>
                  <div className="flex-shrink w-full inline-block relative">
                    <span
                      type="text"
                      className="appearance-none block w-full text-sm bg-white text-gray-700 border border-gray-300 shadow-inner rounded-md py-1 px-4 leading-tight focus:outline-none  focus:border-gray-400"
                    >
                      {student && student.address}
                    </span>
                  </div>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6">
                  <label className="block tracking-wide text-gray-700 text-sm font-bold mb-2">
                    Email
                  </label>
                  <span
                    type="text"
                    className="appearance-none block w-full text-sm bg-white text-gray-700 border border-gray-300 shadow-inner rounded-md py-1 px-4 leading-tight focus:outline-none  focus:border-gray-400"
                  >
                    {student && student.email}
                  </span>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6">
                  <label className="block tracking-wide text-gray-700 text-sm font-bold mb-2">
                    Password
                  </label>
                  <button
                    onClick={() => setShow((state) => !state)}
                    type="button"
                    className="inline-block rounded bg-primary px-4 py-1 text-sm  leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                  >
                    Change password
                  </button>
                  <div className={show ? "block w-40 py-4" : "hidden"}>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      class="appearance-none block w-40 text-sm bg-white text-gray-700 border border-gray-300 shadow-inner rounded-md py-1 px-4 leading-tight focus:outline-none  focus:border-gray-400"
                      placeholder="password"
                      required
                    ></input>

                    <div className="py-2">
                      <input
                        type="password"
                        value={newPass}
                        onChange={(e) => setNewPass(e.target.value)}
                        class="appearance-none block w-40 text-sm bg-white text-gray-700 border border-gray-300 shadow-inner rounded-md py-1 px-4 leading-tight focus:outline-none  focus:border-gray-400"
                        placeholder="new password"
                        required
                      ></input>
                    </div>

                    <input
                      type="password"
                      value={confirmPass}
                      onChange={(e) => setConfirmPass(e.target.value)}
                      class="appearance-none block w-40 text-sm bg-white text-gray-700 border border-gray-300 shadow-inner rounded-md py-1 px-4 leading-tight focus:outline-none  focus:border-gray-400"
                      placeholder="confirm password"
                      required
                    ></input>
                    <div className="py-2">
                      <button
                        onClick={handleSubmit}
                        type="button"
                        className="inline-block rounded bg-primary px-4 py-1 text-sm  leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                      >
                        OK
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default StudentInfo;
