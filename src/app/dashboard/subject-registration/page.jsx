"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
//import { useSearchParams } from "next/navigation";
//import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import Toastify, { success, warn } from "@/components/toastify";

const subjectRegistration = () => {
  const [setting, setSetting] = useState();
  const [datas, setDatas] = useState();
  const router = useRouter();

  const [url1, setUrl1] = useState({
    page: 1,
    limit: 10,
    select: "all",
    search: "",
  });
  useEffect(() => {
    //clearInterval(window.a);

    const url = `http://localhost:3030/class/get/?page=${url1.page}&limit=${url1.limit}&select=${url1.select}&search=${url1.search}`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        setSetting({
          page_total: res.data.page_total,
          totalClass: res.data.totalClass,
        });
        setDatas(res.data.class);
      })
      .catch(function (err) {
        sessionStorage.removeItem("access_token");
        router.push("/auth/login");
      });
  }, [url1]);

  const handleClickSort = () => {
    const newData = datas.sort((a, b) => {
      var name_a = a.data.id_subject.subject_name.toUpperCase();
      var name_b = b.data.id_subject.subject_name.toUpperCase();

      if (name_a > name_b) return 1;
      if (name_a < name_b) return -1;

      return 0;
    });
    const updateData = [...newData];
    setDatas(updateData);
  };

  const handleSignIn = (id_class) => {
    const data = {
      sign: "signin",
      id_class: id_class,
      query: url1,
    };
    //console.log(id_class)
    axios
      .post("http://localhost:3030/class/sign", data, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        setDatas(res.data.class);
      })
      .catch(function (err) {
        sessionStorage.removeItem("access_token");
        router.push("/auth/login");
      });
  };

  const handleSignOut = (id_class) => {
    const data = {
      sign: "signout",
      id_class: id_class,
      query: url1,
    };
    //console.log(id_class);
    axios
      .post("http://localhost:3030/class/sign", data, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        setDatas(res.data.class);
        //console.log(res.data)
      })
      .catch(function (err) {
        sessionStorage.removeItem("access_token");
        router.push("/auth/login");
      });
  };

  return (
    <div className="px-4 py-2 sm:ml-64">
      {datas ? (
        <div className="p-2">
          <Toastify />
          <h1 className="sm:pl-20 text-xl text-gray-900 font-semibold">
            Đăng Ký Môn Học - học kỳ I, 2023
          </h1>
          <div className="w-11/12 mt-20 mx-auto">
            <section className="container px-4 mx-auto">
              <div className="sm:flex sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-x-3">
                    <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                      Môn học
                    </h2>
                    <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
                      {setting && setting.totalClass}
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                    Mô tả nè!
                  </p>
                </div>
              </div>

              <div className="mt-6 md:flex md:items-center md:justify-between">
                <div className="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
                  <button
                    onClick={() =>
                      setUrl1((state) => ({ ...state, select: "all" }))
                    }
                    className="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 bg-gray-100 sm:text-sm dark:bg-gray-800 dark:text-gray-300"
                  >
                    Tất Cả
                  </button>

                  <button
                    onClick={() =>
                      setUrl1((state) => ({ ...state, select: "dadangki" }))
                    }
                    className="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                  >
                    Đã Đăng Ký
                  </button>

                  <button
                    onClick={() =>
                      setUrl1((state) => ({ ...state, select: "chuadangki" }))
                    }
                    className="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
                  >
                    Chưa Đăng Ký
                  </button>
                </div>

                <div className="relative flex items-center mt-4 md:mt-0">
                  <span className="absolute">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      />
                    </svg>
                  </span>

                  <input
                    type="text"
                    value={url1.search}
                    onChange={(event) =>
                      setUrl1((state) => ({
                        ...state,
                        search: event.target.value,
                      }))
                    }
                    placeholder="Search"
                    className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
              </div>

              <div className="flex flex-col mt-6">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                          <tr>
                            <th
                              scope="col"
                              className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                            >
                              <button className="flex items-center gap-x-3 focus:outline-none">
                                <span>Môn học</span>
                                <svg
                                  onClick={handleClickSort}
                                  className="h-3"
                                  viewBox="0 0 10 11"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z"
                                    fill="currentColor"
                                    stroke="currentColor"
                                    strokeWidth="0.1"
                                  />
                                  <path
                                    d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z"
                                    fill="currentColor"
                                    stroke="currentColor"
                                    strokeWidth="0.1"
                                  />
                                  <path
                                    d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z"
                                    fill="currentColor"
                                    stroke="currentColor"
                                    strokeWidth="0.3"
                                  />
                                </svg>
                              </button>
                            </th>
                            <th
                              scope="col"
                              className="py-3.5 px-4 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400"
                            >
                              Số tín chỉ
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                            >
                              Lớp Học
                            </th>

                            <th
                              scope="col"
                              className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                            >
                              Thông Tin
                            </th>

                            <th
                              scope="col"
                              className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400"
                            >
                              Số Học Sinh
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400"
                            >
                              Đã Tham Gia
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400"
                            >
                              Đăng ký
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                          {datas.map((data, index) => {
                            return (
                              <tr key={index}>
                                <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                  <div>
                                    <h2 className="font-medium text-gray-800 dark:text-white ">
                                      {data.data.id_subject.id_subject}
                                    </h2>
                                    <p className="text-sm font-normal text-gray-600 dark:text-gray-400">
                                      {data.data.id_subject.subject_name}
                                    </p>
                                  </div>
                                </td>
                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                  <div className="flex items-center justify-center">
                                    <p className="p-3 flex items-center justify-center w-6 h-6 -mx-1 text-xs text-blue-600 bg-blue-100 border-2 border-white rounded-full">
                                      {data.data.id_subject.credit}
                                    </p>
                                  </div>
                                </td>

                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                  <div>
                                    <h4 className="text-gray-700 dark:text-gray-200">
                                      {data.data.id_class}
                                    </h4>
                                    <p className="text-gray-500 dark:text-gray-400">
                                      {data.data.class_name}
                                    </p>
                                  </div>
                                </td>
                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                  <div>
                                    <h4 className="text-gray-700 dark:text-gray-200">
                                      Phòng {data.data.id_room.id_room} -{" "}
                                      {data.data.id_room.name_room}
                                    </h4>
                                    <p className="text-gray-700 dark:text-gray-200">
                                      {data.data.id_teacher.degree}
                                      {" : "}
                                      {data.data.id_teacher.teacher_name}
                                    </p>
                                  </div>
                                </td>
                                <td className="px-4 py-4 text-sm whitespace-nowrap ">
                                  <div className="flex items-center justify-center">
                                    <p className="p-3 flex items-center justify-center w-6 h-6 -mx-1 text-xs text-blue-600 bg-blue-100 border-2 border-white rounded-full">
                                      {data.data.limit_student}
                                    </p>
                                  </div>
                                </td>

                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                  <div className="flex items-center justify-center">
                                    <p className="p-3 flex items-center justify-center w-6 h-6 -mx-1 text-xs text-blue-600 bg-blue-100 border-2 border-white rounded-full">
                                      {data.data.current_student}
                                    </p>
                                  </div>
                                </td>

                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                  <div className="flex w-full justify-center">
                                    {data.data.status ? (
                                      data.inClass ? (
                                        <FaSignOutAlt className=" h-5 w-5 text-black" />
                                      ) : (
                                        <FaSignInAlt className=" h-5 w-5 text-black" />
                                      )
                                    ) : data.data.limit_student ==
                                        data.data.current_student &&
                                      !data.inClass ? (
                                      <FaSignInAlt className=" h-5 w-5 text-black" />
                                    ) : data.inClass ? (
                                      <FaSignOutAlt
                                        className="cursor-pointer h-5 w-5 text-red-600"
                                        onClick={() =>
                                          handleSignOut(data.data._id)
                                        }
                                      />
                                    ) : (
                                      <FaSignInAlt
                                        className="cursor-pointer h-5 w-5 text-green-600"
                                        onClick={() =>
                                          handleSignIn(data.data._id)
                                        }
                                      />
                                    )}
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 sm:flex sm:items-center sm:justify-between ">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Page{" "}
                  <span className="font-medium text-gray-700 dark:text-gray-100">
                    {setting && setting.page_total == 0
                      ? "Không tìm thấy kết quả!"
                      : `${url1.page} of ${setting && setting.page_total}`}
                  </span>
                </div>

                <div className="flex items-center mt-4 gap-x-4 sm:mt-0">
                  <div
                    onClick={() =>
                      setUrl1((state) => ({ ...state, page: state.page - 1 }))
                    }
                    className={
                      setting && (url1.page == 1 || url1.page_total == 0)
                        ? "pointer-events-none flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
                        : "cursor-pointer flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5 rtl:-scale-x-100"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                      />
                    </svg>

                    <span>Previous</span>
                  </div>

                  <div
                    onClick={() =>
                      setUrl1((state) => ({ ...state, page: state.page + 1 }))
                    }
                    className={
                      setting &&
                      (setting.page_total == url1.page ||
                        setting.page_total == 0)
                        ? "pointer-events-none flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
                        : "cursor-pointer flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
                    }
                  >
                    <span>Next</span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5 rtl:-scale-x-100"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default subjectRegistration;
