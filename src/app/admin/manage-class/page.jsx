"use client";
import React, { useState, useEffect } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import {
  FaPencilAlt,
  FaTrash,
  FaRegCheckCircle,
  FaRegCircle,
  FaRedoAlt,
} from "react-icons/fa";
import axios from "axios";
import { GrUpdate } from "react-icons/gr";
import Toastify, { success, warn } from "@/components/toastify";

const manageClass = () => {
  const [isForm, setIsForm] = useState({
    isOpen: false,
    buttonOpen: 1,
  });

  const [allClass, setAllClass] = useState();
  const [allRoom, setAllRoom] = useState();
  const [filterQuey, setFilterQuey] = useState({
    page: 1,
    limit: 10,
    search: "",
  });
  const [setting, setSetting] = useState();

  const [newClass, setNewClass] = useState({
    id: null,
    id_class: "",
    class_name: "",
    id_subject: "",
    id_teacher: "",
    id_room: "",
    limit_student: 1,
    current_student: 0,
  });

  useEffect(() => {
    axios
      .post("http://localhost:3030/class/get/admin", filterQuey, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setSetting({
          page_total: res.data.page_total,
          totalClass: res.data.totalSubject,
        });
        setAllClass(res.data.class);
        setAllRoom(res.data.room);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, [filterQuey]);

  const handleSubmitClass = (e) => {
    axios
      .post("http://localhost:3030/class/add", newClass, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        success("Success!");
        setNewClass({
          id: null,
          id_class: "",
          class_name: "",
          id_subject: "",
          id_teacher: "",
          id_room: "",
          limit_student: 0,
          current_student: 0,
        });
        setFilterQuey({
          page: 1,
          limit: 10,
          search: "",
        });
        //console.log(res.data.class);
      })
      .catch(function (err) {
        //console.log(err);
        warn(err.response.data.message) || warn("Don't correct format!");
      });
    e.preventDefault();
  };

  const handleUpdateClick = (class1) => {
    setIsForm({
      isOpen: true,
      buttonOpen: 2,
    });

    if (class1.id_teacher != null) {
      const data = {
        id: class1._id,
        id_class: class1.id_class,
        class_name: class1.class_name,
        id_subject: class1.id_subject.id_subject,
        id_teacher: class1.id_teacher.id_teacher,
        id_room: class1.id_room.id_room,
        limit_student: class1.limit_student,
        current_student: class1.current_student,
      };

      setNewClass(data);
    } else {
      const data = {
        id: class1._id,
        id_class: class1.id_class,
        class_name: class1.class_name,
        id_subject: class1.id_subject.id_subject,
        id_teacher: "",
        id_room: class1.id_room.id_room,
        limit_student: class1.limit_student,
        current_student: class1.current_student,
      };
      setNewClass(data);
    }
  };

  const handleClickCancel = () => {
    setIsForm({
      isOpen: true,
      buttonOpen: 1,
    });
    setNewClass({
      id: null,
      id_class: "",
      class_name: "",
      id_subject: "",
      id_teacher: "",
      id_room: "",
      limit_student: 0,
      current_student: 0,
    });
  };

  const handleResetClass = (id) => {
    const data = {
      id: id,
    };
    const urlQuery = `http://localhost:3030/class/reset?page=${filterQuey.page}&limit=${filterQuey.limit}&search=${filterQuey.search}`;
    axios
      .post(urlQuery, data, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        success("Success!");
        setAllClass(res.data.class);
      })
      .catch(function (err) {
        warn(err.response.data.message);
      });
  };

  const handleSubmitUpdate = () => {
    const urlQuery = `http://localhost:3030/class/update?page=${filterQuey.page}&limit=${filterQuey.limit}&search=${filterQuey.search}`;
    //console.log(newClass)
    axios
      .post(urlQuery, newClass, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        success("Success!");
        setNewClass({
          id: null,
          id_class: "",
          class_name: "",
          id_subject: "",
          id_teacher: "",
          id_room: "",
          limit_student: 0,
          current_student: 0,
        });
        setAllClass(res.data.class);
        //setFilterQuey({
        //  page: 1,
        //  limit: 10,
        //  search: "",
        //});
        //console.log(res.data.class);
      })
      .catch(function (err) {
        console.log(err);
        warn(err.response.data.message);
      });
  };

  const handleDeleteClass = (id) => {
    const data = {
      id_class: id,
    };
    axios
      .post("http://localhost:3030/class/delete", data, {
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
        //console.log(res.data);
      })
      .catch(function (err) {
        console.log(err);
        warn("Fails");
        //console.log("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!");
      });
  };
  return (
    <div className="px-4 py-2 sm:ml-64">
      {allClass ? (
        <div className="p-2">
          <Toastify />
          <h2 className="mt-8 sm:pl-20 text-xl text-gray-900 font-semibold">
            Quản lý danh sách lớp học
          </h2>
          <div className="w-10/12 mt-20 mx-auto">
            <section className="container px-4 mx-auto">
              <div className="sm:flex sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-x-3">
                    <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                      Lớp Học
                    </h2>
                    <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
                      {setting.totalClass}
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                    Những nơi tập hợp của những nhân tài đất nước!
                  </p>
                </div>

                <div className="flex items-center mt-4 gap-x-3">
                  <button
                    onClick={() =>
                      setIsForm((preState) => ({
                        ...preState,
                        isOpen: !preState.isOpen,
                      }))
                    }
                    className="peer flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_3098_154395)">
                        <path
                          d="M13.3333 13.3332L9.99997 9.9999M9.99997 9.9999L6.66663 13.3332M9.99997 9.9999V17.4999M16.9916 15.3249C17.8044 14.8818 18.4465 14.1806 18.8165 13.3321C19.1866 12.4835 19.2635 11.5359 19.0351 10.6388C18.8068 9.7417 18.2862 8.94616 17.5555 8.37778C16.8248 7.80939 15.9257 7.50052 15 7.4999H13.95C13.6977 6.52427 13.2276 5.61852 12.5749 4.85073C11.9222 4.08295 11.104 3.47311 10.1817 3.06708C9.25943 2.66104 8.25709 2.46937 7.25006 2.50647C6.24304 2.54358 5.25752 2.80849 4.36761 3.28129C3.47771 3.7541 2.70656 4.42249 2.11215 5.23622C1.51774 6.04996 1.11554 6.98785 0.935783 7.9794C0.756025 8.97095 0.803388 9.99035 1.07431 10.961C1.34523 11.9316 1.83267 12.8281 2.49997 13.5832"
                          stroke="currentColor"
                          strokeWidth="1.67"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_3098_154395">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>

                    <span>Thêm lớp học</span>
                  </button>
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
                <form onSubmit={handleSubmitClass}>
                  <h3>Thông tin chi tiết</h3>
                  <div className="flex">
                    <div className="w-1/3 px-4 mt-8">
                      <div className="flex mt-3 items-center mb-8 ">
                        <h3 className="w-2/4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                          Mã lớp học
                        </h3>
                        <input
                          value={newClass.id_class}
                          onChange={(event) =>
                            setNewClass((state) => ({
                              ...state,
                              id_class: event.target.value.toUpperCase(),
                            }))
                          }
                          readOnly={isForm.buttonOpen == 2 ? true : false}
                          type="text"
                          required
                          placeholder="Ex: ID000"
                          className="block py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-70 placeholder-gray-400/70 pl-5 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                      </div>
                      <div className="flex mt-3 items-center">
                        <h3 className="w-3/4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                          Tên lớp học
                        </h3>
                        <input
                          type="text"
                          required
                          value={newClass.class_name}
                          onChange={(event) =>
                            setNewClass((state) => ({
                              ...state,
                              class_name: event.target.value,
                            }))
                          }
                          placeholder="Nhập text..."
                          className="block py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-70 placeholder-gray-400/70 pl-5 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                      </div>
                    </div>
                    <div className="w-1/3 px-4 mt-8">
                      <div className="flex mt-3 items-center mb-8 ">
                        <h3 className="w-3/4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                          Số học sinh
                        </h3>
                        <input
                          type="number"
                          required
                          min={1}
                          value={newClass.limit_student}
                          onChange={(event) =>
                            setNewClass((state) => ({
                              ...state,
                              limit_student: event.target.value,
                            }))
                          }
                          placeholder="Nhập text..."
                          className="block py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-30 placeholder-gray-400/70 pl-5 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                      </div>
                      <div className="flex mt-3 items-center">
                        <h3 className="w-3/4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                          Mã môn học
                        </h3>
                        <input
                          type="text"
                          required
                          value={newClass.id_subject}
                          onChange={(event) =>
                            setNewClass((state) => ({
                              ...state,
                              id_subject: event.target.value.toUpperCase(),
                            }))
                          }
                          placeholder="Ex: XX000"
                          className="block py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-70 placeholder-gray-400/70 pl-5 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                      </div>
                    </div>
                    <div className="w-1/3 px-4 mt-8">
                      <div className="flex mt-3 items-center mb-8 justify-between">
                        <h3 className="w-1/4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                          Mã giáo viên
                        </h3>
                        <input
                          type="text"
                          required
                          value={newClass.id_teacher}
                          onChange={(event) =>
                            setNewClass((state) => ({
                              ...state,
                              id_teacher: event.target.value.toUpperCase(),
                            }))
                          }
                          placeholder="Ex: S000"
                          className="block py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-90 placeholder-gray-400/70 pl-5 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                      </div>
                      <div className="flex mt-3 items-center">
                        <h3 className="w-2/4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                          Mã phòng
                        </h3>
                        <div className="rounded-lg w-full relative border border-gray-300 text-gray-800 bg-white shadow-lg">
                          <select
                            className="px-8 rounded-lg appearance-none w-full py-1 bg-white"
                            value={newClass.id_room}
                            onChange={(event) =>
                              setNewClass((state) => ({
                                ...state,
                                id_room: event.target.value.toUpperCase(),
                              }))
                            }
                            id="frm-whatever"
                          >
                            <option value="">Chọn mã phòng</option>
                            {allRoom.map((room, index) => {
                              return (
                                <option value={room.id_room} key={index}>
                                  {room.id_room} - {room.name_room}
                                </option>
                              );
                            })}
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
                    </div>
                  </div>

                  <div className="flex mt-12 justify-end w-full">
                    <button
                      type="button"
                      onClick={handleSubmitUpdate}
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
                      onClick={handleClickCancel}
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
                                <span>Môn học</span>
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
                              Số tín chỉ
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-3.5 text-sm font-medium text-left rtl:text-right text-gray-500 dark:text-gray-400"
                            >
                              Lớp Học
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-3.5 text-sm font-medium text-left rtl:text-right text-gray-500 dark:text-gray-400"
                            >
                              Thông tin
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-3.5 text-sm font-medium text-center rtl:text-right text-gray-500 dark:text-gray-400"
                            >
                              Lịch dạy
                            </th>

                            <th
                              scope="col"
                              className="px-4 py-3.5 text-sm font-medium text-center rtl:text-right text-gray-500 dark:text-gray-400"
                            >
                              Số Học Sinh
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-3.5 text-sm font-medium text-center rtl:text-right text-gray-500 dark:text-gray-400"
                            >
                              Đã Tham Gia
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-3.5 text-sm font-medium text-center rtl:text-right text-gray-500 dark:text-gray-400"
                            >
                              Tùy Chọn
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                          {allClass.map((class1, index) => {
                            return (
                              <tr key={index}>
                                <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                  <div>
                                    <h2 className="font-medium text-gray-800 dark:text-white ">
                                      {class1.id_subject
                                        ? class1.id_subject.id_subject
                                        : "Không xác định!"}
                                    </h2>
                                    <p className="text-sm font-normal text-gray-600 dark:text-gray-400">
                                      {class1.id_subject
                                        ? class1.id_subject.subject_name
                                        : "Không xác định!"}
                                    </p>
                                  </div>
                                </td>
                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                  <div className="flex items-center justify-center">
                                    <p className="p-3 flex items-center justify-center w-6 h-6 -mx-1 text-xs text-blue-600 bg-blue-100 border-2 border-white rounded-full">
                                      {class1.id_subject
                                        ? class1.id_subject.credit
                                        : "Không xác định!"}
                                    </p>
                                  </div>
                                </td>

                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                  <div>
                                    <h4 className="text-gray-700 dark:text-gray-200 font-medium">
                                      {class1.id_class}
                                    </h4>
                                    <p className="text-gray-500 dark:text-gray-400">
                                      {class1.class_name}
                                    </p>
                                  </div>
                                </td>
                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                  <div>
                                    <h4 className="text-gray-700 dark:text-gray-200">
                                      {class1.id_room.id_room} -{" "}
                                      {class1.id_room.name_room}
                                    </h4>
                                    <p className="text-gray-700 dark:text-gray-200">
                                      {class1.id_teacher
                                        ? `${class1.id_teacher.degree} -
                                      ${class1.id_teacher.teacher_name}`
                                        : "Không xác định!"}
                                    </p>
                                  </div>
                                </td>
                                <th
                                  scope="col"
                                  className="px-4 py-3.5 text-sm font-normal flex items-center justify-center rtl:text-right text-gray-500 dark:text-gray-400"
                                >
                                  {class1 && class1.status ? (
                                    <FaRegCheckCircle className="h-5 w-5 text-green-600 mt-3" />
                                  ) : (
                                    <FaRegCircle className="h-5 w-5 text-slate-800 mt-3" />
                                  )}
                                </th>
                                <td className="px-4 py-4 text-sm whitespace-nowrap ">
                                  <div className="flex items-center justify-center">
                                    <p className="p-3 flex items-center justify-center w-6 h-6 -mx-1 text-xs text-blue-600 bg-blue-100 border-2 border-white rounded-full">
                                      {class1.limit_student}
                                    </p>
                                  </div>
                                </td>

                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                  <div className="flex items-center justify-center">
                                    <p className="p-3 flex items-center justify-center w-6 h-6 -mx-1 text-xs text-blue-600 bg-blue-100 border-2 border-white rounded-full">
                                      {class1.current_student}
                                    </p>
                                  </div>
                                </td>

                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                  <div className="cursor-pointer flex w-full justify-between">
                                    <FaPencilAlt
                                      className=" h-4 w-4 text-black"
                                      onClick={() => handleUpdateClick(class1)}
                                    />
                                    <FaRedoAlt
                                      onClick={() =>
                                        handleResetClass(class1._id)
                                      }
                                      className="h-4 w-4 text-green-500"
                                    />
                                    <FaTrash
                                      className="cursor-pointer h-4 w-4 text-red-600"
                                      onClick={() =>
                                        handleDeleteClass(class1._id)
                                      }
                                    />
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
                    {setting && setting.page_total == 0 && filterQuey
                      ? "Không tìm thấy kết quả!"
                      : `${filterQuey.page} of ${
                          setting && setting.page_total
                        }`}
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
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default manageClass;
