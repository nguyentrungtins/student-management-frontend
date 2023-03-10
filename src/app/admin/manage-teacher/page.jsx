"use client";
import React, { useState, useEffect } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { FaUserEdit, FaTrash } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import axios from "axios";
import Toastify, { success, warn } from "@/components/toastify";
import { BsSearch } from "react-icons/bs";
import { AiOutlineUserAdd } from "react-icons/ai";

const manageTeacher = () => {
  const [isForm, setIsForm] = useState({
    isOpen: false,
    buttonOpen: 0,
  });
  const [newTeacher, setNewTeacher] = useState({
    id_teacher: "",
    degree: "Giáo viên",
    teacher_name: "",
    teacher_age: 22,
    teacher_address: "",
    teacher_email: "",
    teacher_phone: "",
  });
  const [filterQuey, setFilterQuey] = useState({
    page: 1,
    limit: 10,
    search: "",
  });
  const [allTeacher, setAllTeacher] = useState();
  const [setting, setSetting] = useState();

  useEffect(() => {
    axios
      .post("http://localhost:3030/teacher/get", filterQuey, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        setSetting({
          page_total: res.data.page_total,
          totalTeacher: res.data.totalSubject,
        });
        setAllTeacher(res.data.teacher);
      })
      .catch(function (err) {
        console.log(err);
        //console.log("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!");
      });
  }, [filterQuey]);

  const handleSubmitTeacher = (e) => {
    axios
      .post("http://localhost:3030/teacher/add", newTeacher, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        //console.log(res.data);
        success("Success!");
        setFilterQuey({
          page: 1,
          limit: 10,
          search: "",
        });
        setNewTeacher({
          degree: "Giáo viên",
          teacher_name: "",
          teacher_age: "",
          teacher_address: "",
          teacher_email: "",
          teacher_phone: "",
        });
        //setAllTeacher(res.data.teacher);
      })
      .catch(function (err) {
        //console.log(err);
        warn(err.response.data.message);

        //console.log("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!");
      });
    e.preventDefault();
  };

  const handleUpdateClick = (teacher) => {
    setIsForm({
      isOpen: true,
      buttonOpen: 2,
    });
    setNewTeacher(teacher);
  };

  const handleSubmitUpdateTeacher = () => {
    //console.log(newTeacher);
    const urlQuery = `http://localhost:3030/teacher/update?page=${filterQuey.page}&limit=${filterQuey.limit}&search=${filterQuey.search}`;
    //e.preventDefault();
    axios
      .post(urlQuery, newTeacher, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        success("Success!");

        setAllTeacher(res.data.teacher);
        setNewTeacher({
          id_teacher: "",
          degree: "Giáo viên",
          teacher_name: "",
          teacher_age: 22,
          teacher_address: "",
          teacher_email: "",
          teacher_phone: "",
        });
      })
      .catch(function (err) {
        console.log(err);
        warn(err.response.data.message) || warn("Fail!");

        //console.log("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!");
      });
  };

  const handleCancelClick = () => {
    setNewTeacher({
      degree: "Giáo viên",
      teacher_name: "",
      teacher_age: "",
      teacher_address: "",
      teacher_email: "",
      teacher_phone: "",
    });
    setIsForm({
      isOpen: true,
      buttonOpen: 1,
    });
  };

  const handleDeleteTeacher = (id) => {
    const data = {
      id_teacher: id,
    };
    axios
      .post("http://localhost:3030/teacher/delete", data, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        success("Success!");
        setFilterQuey({
          page: 1,
          limit: 10,
          search: "",
        });
        //setAllTeacher(res.data.teacher);
      })
      .catch(function (err) {
        console.log(err);
        warn(err.response.data.message);
        //console.log("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!");
      });
  };

  return (
    <div className="p-4 sm:ml-64 flex flex-row">
      {allTeacher ? (
        <div className="container max-w-7xl mx-auto mt-8">
          <section className="container px-4 mx-auto">
            <Toastify />
            <h2 className=" text-xl mb-3 text-gray-900 font-semibold">
              Quản lý danh sách giáo viên
            </h2>
            <div className="sm:flex sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-x-3">
                  <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                    Giáo viên
                  </h2>
                  <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
                    {setting.totalTeacher}
                  </span>
                </div>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                  Những vị giáo viên đầy tài năng và nhiệt huyết!
                </p>
              </div>

              <div className="flex items-center mt-4 gap-x-3">
                {/* <span className="absolute px-2"><AiOutlineUserAdd/></span> */}
                <button
                  onClick={() =>
                    setIsForm((preState) => ({
                      ...preState,
                      isOpen: !preState.isOpen,
                      buttonOpen: 1,
                    }))
                  }
                  className="px-4 py-2 mr-5 rounded-md bg-primary text-sky-100 hover:bg-sky-600"
                >
                  Add teacher
                </button>
                <div className="relative flex items-center mt-4 md:mt-0">
                  <span className="absolute pl-3">
                    <BsSearch />
                  </span>

                  <input
                    type="text"
                    value={filterQuey.search}
                    onChange={(event) =>
                      setFilterQuey((state) => ({
                        ...state,
                        search: event.target.value,
                      }))
                    }
                    placeholder="Search"
                    className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
              </div>
            </div>

            <div
              className={
                isForm.isOpen
                  ? "mt-12 transition-all duration-1000 border-2 rounded-tl-2xl rounded-br-2xl border-gray-700 p-6"
                  : "mt-12 hidden"
              }
            >
              <form onSubmit={handleSubmitTeacher}>
                <h3>Thông tin chi tiết</h3>
                <div className="flex">
                  <div className="w-1/3 px-4 mt-8">
                    <div className="flex mt-3 items-center mb-8 ">
                    <h3 className="w-2/4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                      Trình độ
                    </h3>
                      <div className="rounded-lg w-full relative border border-gray-300 text-gray-800 bg-white shadow-lg">
                        <select
                          className="px-4 rounded-lg appearance-none w-full py-1 bg-white"
                          value={newTeacher.degree}
                          onChange={(event) =>
                            setNewTeacher((state) => ({
                              ...state,
                              degree: event.target.value,
                            }))
                          }
                          id="frm-whatever"
                        >
                          <option value="Giáo viên">Giáo viên</option>
                          <option value="Cao học">Cao học</option>
                          <option value="Thạc sĩ">Thạc sĩ</option>
                          <option value="Tiến sĩ">Tiến sĩ</option>
                          <option value="Tiến sĩ khoa học">
                            Tiến sĩ khoa học
                          </option>
                        </select>
                        <div className="rounded-lg pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-gray-700 border-l">
                          <svg
                            className="h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="flex mt-3 items-center mb-8">
                      <h3 className="w-3/4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Mã giáo viên
                      </h3>
                      <input
                        required
                        readOnly={isForm.buttonOpen == 2 ? true : false}
                        value={newTeacher.id_teacher}
                        onChange={(event) =>
                          setNewTeacher((state) => ({
                            ...state,
                            id_teacher: event.target.value.toUpperCase(),
                          }))
                        }
                        type="text"
                        placeholder="Ex: S000"
                        className="block py-1 pr-2 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-70 placeholder-gray-400/70 pl-5 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="flex mt-3 items-center">
                      <h3 className="w-3/4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Tên giáo viên
                      </h3>
                      <input
                        required
                        value={newTeacher.teacher_name}
                        onChange={(event) =>
                          setNewTeacher((state) => ({
                            ...state,
                            teacher_name: event.target.value,
                          }))
                        }
                        type="text"
                        placeholder="Nhập text..."
                        className="block py-1 pr-2 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-70 placeholder-gray-400/70 pl-5 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                  </div>
                  <div className="w-1/3 px-4 mt-8">
                    <div className="flex mt-3 items-center mb-8 ">
                      <h3 className="w-3/4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Tuổi
                      </h3>
                      <input
                        type="number"
                        min={22}
                        value={newTeacher.teacher_age}
                        onChange={(event) =>
                          setNewTeacher((state) => ({
                            ...state,
                            teacher_age: Number(event.target.value),
                          }))
                        }
                        required
                        placeholder="Nhập text..."
                        className="block py-1 pr-2 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-70 placeholder-gray-400/70 pl-5 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="flex mt-3 items-center">
                      <h3 className="w-3/4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Số điện thoại
                      </h3>
                      <input
                        type="text"
                        value={newTeacher.teacher_phone}
                        onChange={(event) =>
                          setNewTeacher((state) => ({
                            ...state,
                            teacher_phone: event.target.value,
                          }))
                        }
                        required
                        placeholder="Nhập text..."
                        className="block py-1 pr-2 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-70 placeholder-gray-400/70 pl-5 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                  </div>
                  <div className="w-1/3 px-4 mt-8">
                    <div className="flex mt-3 items-center mb-8 ">
                      <h3 className="w-1/4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Email
                      </h3>
                      <input
                        type="text"
                        value={newTeacher.teacher_email}
                        onChange={(event) =>
                          setNewTeacher((state) => ({
                            ...state,
                            teacher_email: event.target.value,
                          }))
                        }
                        required
                        placeholder="Nhập text..."
                        className="block py-1 pr-2 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-70 placeholder-gray-400/70 pl-5 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="flex mt-3 items-center">
                      <h3 className="w-1/4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Địa chỉ
                      </h3>
                      <input
                        type="text"
                        value={newTeacher.teacher_address}
                        onChange={(event) =>
                          setNewTeacher((state) => ({
                            ...state,
                            teacher_address: event.target.value,
                          }))
                        }
                        required
                        placeholder="Nhập text..."
                        className="block py-1 pr-2 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-70 placeholder-gray-400/70 pl-5 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                  </div>
                </div>

                <div className="flex mt-12 justify-end w-full">
                  <button
                    type="button"
                    onClick={handleSubmitUpdateTeacher}
                    className={
                      isForm && isForm.buttonOpen == 2
                        ? "mx-8 peer flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
                        : "pointer-events-none mx-8 peer flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
                    }
                  >
                    <GrUpdate className="w-4 h-4" />
                    <span>Cập nhật</span>
                  </button>
                  <button
                    type="submit"
                    className={
                      isForm && isForm.buttonOpen == 1
                        ? "mx-8 peer flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
                        : "pointer-events-none mx-8 peer flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
                    }
                  >
                    <IoMdAddCircle className="w-5 h-5" />
                    <span>Thêm</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelClick}
                    className="mx-8 flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-red-400 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-red-600 dark:hover:bg-red-500 dark:bg-red-600"
                  >
                    <MdCancel className="w-5 h-5" />
                    <span>Hủy</span>
                  </button>
                </div>
              </form>
            </div>

            <div className="flex flex-col mt-8">
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
                            className="py-3.5 px-4 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400"
                          >
                            Tên giáo viên
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                          >
                            Trình độ
                          </th>

                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400"
                          >
                            Tuổi
                          </th>

                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400"
                          >
                            Số điện thoại
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400"
                          >
                            Email
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400"
                          >
                            Địa chỉ
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400"
                          >
                            Tùy chọn
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                        {allTeacher.map((teacher, index) => {
                          return (
                            <tr key={index}>
                              <th
                                scope="col"
                                className="w-8 py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                              >
                                <span>
                                  {teacher.id_teacher
                                    ? teacher.id_teacher
                                    : index}
                                </span>
                              </th>
                              <th
                                scope="col"
                                className="py-3.5 px-4 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400"
                              >
                                {teacher.teacher_name}
                              </th>
                              <th
                                scope="col"
                                className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                              >
                                {teacher.degree}
                              </th>

                              <th
                                scope="col"
                                className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400"
                              >
                                <div className="flex items-center justify-center">
                                  <p className="p-3 flex items-center justify-center w-6 h-6 -mx-1 text-xs text-blue-600 bg-blue-100 border-2 border-white rounded-full">
                                    {teacher.teacher_age}
                                  </p>
                                </div>
                              </th>

                              <th
                                scope="col"
                                className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400"
                              >
                                {teacher.teacher_phone}
                              </th>
                              <th
                                scope="col"
                                className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400"
                              >
                                {teacher.teacher_email}
                              </th>
                              <th
                                scope="col"
                                className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400"
                              >
                                {teacher.teacher_address}
                              </th>
                              <th
                                scope="col"
                                className="flex items-center justify-around px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400"
                              >
                                <FaUserEdit
                                  className="h-5 w-5 cursor-pointer"
                                  onClick={() => handleUpdateClick(teacher)}
                                />
                                <FaTrash
                                  onClick={() =>
                                    handleDeleteTeacher(teacher._id)
                                  }
                                  className="h-4 w-4 cursor-pointer text-orange-700"
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
                  {setting && setting.page_total == 0 && filterQuey
                    ? "Không tìm thấy kết quả!"
                    : `${filterQuey.page} of ${setting && setting.page_total}`}
                </span>
              </div>

              <div className="flex items-center mt-4 gap-x-4 sm:mt-0">
                <div
                  onClick={() =>
                    setFilterQuey((state) => ({
                      ...state,
                      page: state.page - 1,
                    }))
                  }
                  className={
                    setting &&
                    (filterQuey.page == 1 || filterQuey.page_total == 0)
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
                    setFilterQuey((state) => ({
                      ...state,
                      page: state.page + 1,
                    }))
                  }
                  className={
                    setting &&
                    (setting.page_total == filterQuey.page ||
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
      ) : (
        ""
      )}
    </div>
  );
};

export default manageTeacher;
