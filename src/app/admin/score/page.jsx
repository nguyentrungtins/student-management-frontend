"use client";
import Toastify, { success, warn } from "@/components/toastify";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegCalendarCheck, FaRegSave, FaSave } from "react-icons/fa";
function managerScore() {
  const [idClass, setIdClass] = useState("");
  const [setting, setSetting] = useState();
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
    select: "all",
  });

  const [students, setStudents] = useState();
  const [scores, setScores] = useState([]);

  useEffect(() => {
    if (idClass != "") {
      const data = {
        id_subject: idClass.toUpperCase(),
      };
      const urlQuery = `http://localhost:3030/score/get?page=${query.page}&limit=${query.limit}&select=${query.select}`;
      axios
        .post(urlQuery, data, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
          },
        })
        .then((res) => {
          //console.log(res.data);
          setSetting({
            page_total: res.data.page_total,
          });
          setStudents(res.data.data);
          handleCreateScoreData(res.data.data);
        })
        .catch((err) => {
          setStudents(null);
          warn("Not find result!");
        });
    }
  }, [query]);

  const handleFindIdClass = () => {
    const data = {
      id_subject: idClass.toUpperCase(),
    };
    const urlQuery = `http://localhost:3030/score/get?page=${query.page}&limit=${query.limit}&select=${query.select}`;
    axios
      .post(urlQuery, data, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        //console.log(res.data);
        setSetting({
          page_total: res.data.page_total,
        });
        setStudents(res.data.data);
        handleCreateScoreData(res.data.data);
      })
      .catch((err) => {
        setStudents(null);
        console.log(err)
        warn("Not find result!");
      });
  };

  const handleCreateScoreData = (arrStudent) => {
    const data = arrStudent.map((student) => {
      return {
        id_user: student.id_user._id,
        score: student.score,
        id_subject: student.id_subject._id,
      };
    });
    setScores(data);
  };

  const handleSubmitOneStudent = (index) => {
    if (scores[index].score != null) {
      axios
        .post(
          `http://localhost:3030/score/add/one?page=${query.page}&limit=${query.limit}&select=${query.select}`,
          scores[index],
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
            },
          }
        )
        .then((res) => {
          //console.log(res.data);
          success("Success!");
          setSetting({
            page_total: res.data.page_total,
          });
          setStudents(res.data.data);
          //handleCreateScoreData(res.data.data);
        })
        .catch((err) => {
          //console.log(err)
          warn('Score cannot be entered at this time!')
        });
    } else {
      warn("Score not null!");
    }
  };

  const handleSubmitMutiStudent = () => {
    axios
      .post(
        `http://localhost:3030/score/add/muti?page=${query.page}&limit=${query.limit}&select=${query.select}`,
        scores,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
          },
        }
      )
      .then((res) => {
        //console.log(res.data);
        success("Success!");
        setSetting({
          page_total: res.data.page_total,
        });
        setStudents(res.data.data);
      })
      .catch((err) => {
        //console.log(err)
        warn("Score cannot be entered at this time!");
      });
  };

  const handleAddScore = (newScore, id_user) => {
    const newScores = scores.map((item) =>
      item.id_user == id_user ? { ...item, score: newScore } : item
    );
    setScores(newScores);
  };
  //console.log(scores)
  return (
    <div className="px-4 py-2 sm:ml-64">
      <Toastify />
      <div className="p-2">
        <h2 className="mt-8 sm:pl-20 text-xl text-gray-900 font-semibold">
          Nhập điểm cho các sinh viên
        </h2>
        <div className="w-10/12 mt-20 mx-auto">
          <section className="container px-4 mx-auto">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-x-3">
                  <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                    Tổng các lớp
                  </h2>
                  <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
                    000
                  </span>
                </div>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                  Nhập kết quả cho các sinh viên!
                </p>
              </div>

              <div className="flex items-center mt-4 gap-x-3">
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
                    value={idClass}
                    onChange={(e) => setIdClass(e.target.value)}
                    placeholder="Ex: XX000"
                    className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-40 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                <button
                  onClick={handleFindIdClass}
                  className="peer flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
                >
                  <FaRegCalendarCheck />
                  <span>Tìm kiếm</span>
                </button>

                <button
                  onClick={handleSubmitMutiStudent}
                  className={
                    scores.length > 0
                      ? "peer flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
                      : "pointer-events-none peer flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
                  }
                >
                  <FaRegSave />
                  <span>Save All</span>
                </button>
              </div>
            </div>
            {students ? (
              <div>
                <div className="flex flex-col mt-8">
                  <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                      <div className="mb-6 inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
                        <button
                          onClick={() =>
                            setQuery((state) => ({
                              ...state,
                              select: "all",
                            }))
                          }
                          className={
                            query.select == "all"
                              ? "px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 bg-gray-100 sm:text-sm dark:bg-gray-800 dark:text-gray-300"
                              : "px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 bg-white sm:text-sm  dark:text-gray-300"
                          }
                        >
                          Tất Cả
                        </button>

                        <button
                          onClick={() =>
                            setQuery((state) => ({
                              ...state,
                              select: "yes",
                            }))
                          }
                          className={
                            query.select == "yes"
                              ? "px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 bg-gray-100 sm:text-sm dark:bg-gray-800 dark:text-gray-300"
                              : "px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 bg-white sm:text-sm dark:text-gray-300"
                          }
                        >
                          Đã nhập điểm
                        </button>

                        <button
                          onClick={() =>
                            setQuery((state) => ({
                              ...state,
                              select: "no",
                            }))
                          }
                          className={
                            query.select == "no"
                              ? "px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 bg-gray-100 sm:text-sm dark:bg-gray-800 dark:text-gray-300"
                              : "px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 bg-white sm:text-sm dark:text-gray-300"
                          }
                        >
                          Chưa nhập điểm
                        </button>
                      </div>
                      <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                          <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                              <th
                                scope="col"
                                className="py-3.5 px-4 text-sm font-medium text-left rtl:text-right text-gray-500 dark:text-gray-400"
                              >
                                <button className="flex items-center gap-x-3 focus:outline-none">
                                  <span>ID</span>
                                  <svg
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
                                className="py-3.5 px-4 text-sm font-medium text-center rtl:text-right text-gray-500 dark:text-gray-400"
                              >
                                Tên sinh viên
                              </th>
                              <th
                                scope="col"
                                className="px-4 py-3.5 text-sm font-medium text-center rtl:text-right text-gray-500 dark:text-gray-400"
                              >
                                Chuyên ngành
                              </th>

                              <th
                                scope="col"
                                className="px-4 py-3.5 text-sm font-medium text-center rtl:text-right text-gray-500 dark:text-gray-400"
                              >
                                Môn học
                              </th>

                              <th
                                scope="col"
                                className="px-4 py-3.5 text-sm font-medium text-center rtl:text-right text-gray-500 dark:text-gray-400"
                              >
                                Số tín chỉ
                              </th>
                              <th
                                scope="col"
                                className="px-4 py-3.5 text-sm font-medium text-center rtl:text-right text-gray-500 dark:text-gray-400"
                              >
                                Nhập điểm
                              </th>
                              <th
                                scope="col"
                                className="px-4 py-3.5 text-sm font-medium text-center rtl:text-right text-gray-500 dark:text-gray-400"
                              >
                                Tùy chọn
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                            {students != null && students.map((student, index) => {
                              return (
                                <tr key={index}>
                                  <th
                                    scope="col"
                                    className="w-8 py-3.5 px-4 text-sm font-medium text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                  >
                                    <span>
                                      {student.id_user.id_user.id_student}
                                    </span>
                                  </th>
                                  <th
                                    scope="col"
                                    className="py-3.5 px-4 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400"
                                  >
                                    {`${student.id_user.id_user.first_name} ${student.id_user.id_user.last_name}`}
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400"
                                  >
                                    {student.id_user.id_user.major}
                                  </th>

                                  <th
                                    scope="col"
                                    className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400"
                                  >
                                    {student.id_subject.subject_name}
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400"
                                  >
                                    <div className="flex items-center justify-center">
                                      <p className="p-3 flex items-center justify-center w-6 h-6 -mx-1 text-xs text-blue-600 bg-blue-100 border-2 border-white rounded-full">
                                        {student.id_subject.credit}
                                      </p>
                                    </div>
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-4 py-3.5 text-sm font-normal text-center text-gray-500 dark:text-gray-400"
                                  >
                                    <input
                                      type="number"
                                      min={0}
                                      max={10}
                                      value={
                                        scores[index].score == null
                                          ? ""
                                          : scores[index].score
                                      }
                                      onChange={(e) =>
                                        handleAddScore(
                                          Number(e.target.value),
                                          student.id_user._id
                                        )
                                      }
                                      placeholder="Score"
                                      className="pl-2 py-1.5 pr-1 w-[70px] text-gray-700 bg-white border border-gray-200 rounded-lg placeholder-gray-400/70 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                  </th>
                                  <th
                                    scope="col"
                                    className="flex items-center justify-around px-4 py-5    text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400"
                                  >
                                    <FaSave
                                      className="h-5 w-5 cursor-pointer"
                                      onClick={() =>
                                        handleSubmitOneStudent(index)
                                      }
                                    />
                                  </th>
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
                        : `${query.page} of ${setting && setting.page_total}`}
                    </span>
                  </div>

                  <div className="flex items-center mt-4 gap-x-4 sm:mt-0">
                    <div
                      onClick={() =>
                        setQuery((state) => ({
                          ...state,
                          page: state.page - 1,
                        }))
                      }
                      className={
                        setting && (query.page == 1 || setting.page_total == 0)
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
                        setQuery((state) => ({
                          ...state,
                          page: state.page + 1,
                        }))
                      }
                      className={
                        setting &&
                        (setting.page_total == query.page ||
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
              </div>
            ) : (
              ""
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default managerScore;
