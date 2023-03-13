"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import Toastify from "@/components/toastify";
import { success, warn } from "@/components/toastify";
import HeaderNavigation from "@/app/components/HeaderNavigation";
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
            warn(res.data);
          }
        });
    } else {
      // alert("password doesn't match!");
      warn("Password doesn't match!");
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
    <div className="ml-64 bg-gray-50">
      <HeaderNavigation
        title="Thông Tin Sinh Viên"
        desc="Học kỳ II 2022-2203"
      />
      <div className="flex flex-row mt-6">
        <Toastify />

        <div className="basis-1/3 border-r-2 mt-6">
          <div className="flex items-center p-4 mt-10">
            <div className="relative flex flex-col items-center w-full">
              <div className="h-24 w-24 md rounded-full relative avatar  items-end justify-end min-w-max  -top-16 flex ">
                <Image
                  className="rounded-full"
                  src={`http:localhost:3030/images/${student.img}`}
                  width={100}
                  height={100}
                  // fill={true}
                />
                <div className="absolute"></div>
              </div>
              <div className="flex flex-col space-y-1 justify-center items-center -mt-12 w-full">
                <div className="py-2 flex space-x-2">
                  <button
                    type="button"
                    className="inline-block rounded-lg bg-blue-500 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-blue-500-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-blue-500-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-blue-500-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                  >
                    Thay avatar
                  </button>
                  <button
                    type="button"
                    className="inline-block rounded-lg border-2 border-gray-300 bg-white px-6 pt-2 pb-[6px] text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:border-primary-accent-100 hover:bg-neutral-500 hover:bg-opacity-10 focus:border-primary-accent-100 focus:outline-none focus:ring-0 active:border-primary-accent-200 dark:text-primary-100 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                    data-te-ripple-init
                  >
                    Xóa
                  </button>
                </div>
              </div>
              <table className="text-sm bg-gray-100 w-10/12 rounded-xl mt-6 max-w-[300px]">
                <tbody className="w-full p-6">
                  <tr>
                    <td className="px-6 py-4 text-gray-500 font-bold">Name</td>
                    <td className="px-6 py-4 text-end">
                      {student && student.last_name} {student.first_name}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-500 font-bold">
                      Mã sinh viên
                    </td>
                    <td className="px-6 py-4 text-end">
                      {student && student.id_student}
                    </td>
                  </tr>
                </tbody>
              </table>
              <table className="text-sm bg-gray-100 w-10/12 rounded-xl mt-6 max-w-[300px]">
                <tbody className="w-full p-6">
                  <tr>
                    <td className="px-6 py-4 text-gray-500 font-bold">Phone</td>
                    <td className="px-6 py-4 text-end">
                      {student && student.phone}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-500 font-bold">
                      Ngày sinh
                    </td>
                    <td className="px-6 py-4 text-end">
                      {student && student.birth_day}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-500 font-bold">
                      Địa chỉ
                    </td>
                    <td className="px-6 py-4 text-end">
                      {student && student.address}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="basis-2/3">
          <div className="inputs w-full max-w-2xl px-6 py-4 mx-auto">
            <h2 className="text-xl text-gray-900 font-semibold">
              Thông tin chi tiết
            </h2>
            <form className="mt-6 border-t border-gray-200 pt-4">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-2">
                  <div class="mb-6">
                    <label
                      for="email"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Tên
                    </label>
                    <input
                      type="email"
                      id="email"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      placeholder={student && student.first_name}
                      disabled
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-2">
                  <div class="mb-6">
                    <label
                      for="email"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Họ
                    </label>
                    <input
                      type="email"
                      id="email"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      placeholder={student && student.last_name}
                      disabled
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-2">
                  <div class="mb-6">
                    <label
                      for="email"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Mã sinh viên
                    </label>
                    <input
                      type="email"
                      id="email"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      placeholder={student && student.id_student}
                      disabled
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-2">
                  <div class="mb-6">
                    <label
                      for="email"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Số điện thoại
                    </label>
                    <input
                      type="email"
                      id="email"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      placeholder={student && student.phone}
                      disabled
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-2">
                  <div class="mb-6">
                    <label
                      for="email"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Ngày sinh
                    </label>
                    <input
                      type="email"
                      id="email"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      placeholder={student && student.birth_day}
                      disabled
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-2">
                  <div class="mb-6">
                    <label
                      for="email"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Địa chỉ
                    </label>
                    <input
                      type="email"
                      id="email"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      placeholder={student && student.address}
                      disabled
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-2">
                  <div class="mb-6">
                    <label
                      for="email"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      placeholder={student && student.email}
                      disabled
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-2">
                  <label className="block tracking-wide text-gray-900 text-sm font-medium mb-2">
                    Mật khẩu
                  </label>
                  <button
                    onClick={() => setShow((state) => !state)}
                    type="button"
                    className="inline-block rounded-lg  bg-blue-500 px-6 py-2 text-sm  leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-blue-500-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-blue-500-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-blue-500-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                  >
                    Đổi mật khẩu
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
                        className="inline-block rounded-lg bg-blue-500 px-6 py-2 text-sm  leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-blue-500-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-blue-500-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-blue-500-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
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
    </div>
  );
};
export default StudentInfo;
