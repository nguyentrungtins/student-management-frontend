"use client";
import React, { useEffect, useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import {
  FaPencilAlt,
  FaTrash,
  FaRegCheckCircle,
  FaRegCircle,
} from "react-icons/fa";
import axios from "axios";
import Toastify, { success, warn } from "@/components/toastify";

const manageSubject = () => {
  const [isForm, setIsForm] = useState({
    isOpen: false,
    buttonOpen: 0,
  });
  const [newSubject, setNewSubject] = useState({
    id: null,
    id_subject: "",
    subject_name: "",
    credit: 1,
    learn: 1,
    marjor_learn: [],
    lab_required: false,
  });
  const [filterQuey, setFilterQuey] = useState({
    page: 1,
    limit: 10,
    search: "",
  });

  const [allSubject, setAllSubject] = useState();
  const [allMarjor, setAllMarjor] = useState();
  const [setting, setSetting] = useState();
  const [isCheckAll, setIsCheckAll] = useState(false);

  useEffect(() => {
    axios
      .post("http://localhost:3030/subject/get", filterQuey, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        setSetting({
          page_total: res.data.page_total,
          totalSubject: res.data.totalSubject,
        });
        setAllSubject(res.data.subject);
        setAllMarjor(res.data.marjor);
      })
      .catch(function (err) {
        warn(err.response.data.message);
      });
  }, [filterQuey]);
  // thêm 1 môn học mới
  const handleSubmitSubject = (e) => {
    const urlQuery = `http://localhost:3030/subject/add?page=${filterQuey.page}&limit=${filterQuey.limit}&search=${filterQuey.search}`;
    //console.log(data)
    axios
      .post(urlQuery, newSubject, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        success("Complete!");
        setFilterQuey({
          page: 1,
          limit: 10,
          search: "",
        });
        setNewSubject({
          id: null,
          id_subject: "",
          subject_name: "",
          credit: 0,
          learn: 0,
          marjor_learn: [],
          lab_required: false,
        });
      })
      .catch(function (err) {
        warn(err.response.data.message) || warn("Fail!");
      });
    //console.log(newSubject);
    e.preventDefault();
  };

  // mở cửa sổ update
  const handleUpdateClick = (subject) => {
    setNewSubject(subject);
    setIsForm({
      isOpen: true,
      buttonOpen: 2,
    });
  };

  // update 1 môn học
  const handleSubmitUpdate = () => {
    //console.log(newSubject)
    const urlQuery = `http://localhost:3030/subject/update?page=${filterQuey.page}&limit=${filterQuey.limit}&search=${filterQuey.search}`;
    axios
      .post(urlQuery, newSubject, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        //console.log(res.data);
        success("Complete!");
        setAllSubject(res.data.subject);
        setNewSubject({
          id: null,
          id_subject: "",
          subject_name: "",
          credit: 0,
          learn: 0,
          marjor_learn: [],
          lab_required: false,
        });
      })
      .catch(function (err) {
        console.log(err)
        warn(err.response.data.message) || warn("Fail!");
      });
  };

  // xóa 1 môn học
  const handleDeleteSubject = (id) => {
    const data = {
      id_subject: id,
    };
    axios
      .post("http://localhost:3030/subject/delete", data, {
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
        //console.log("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!");
      });
  };

  const handleCheckBox = (value) => {
    if (newSubject.marjor_learn.includes(value)) {
      setNewSubject((state) => ({
        ...state,
        marjor_learn: newSubject.marjor_learn.filter((item) => item != value),
      }));
    } else {
      setNewSubject((state) => ({
        ...state,
        marjor_learn: [...newSubject.marjor_learn, value],
      }));
    }
  };

  const handleCheckAllBox = (value) => {
    setIsCheckAll(!isCheckAll);
    const arr = allMarjor.map((marjor) => marjor.id_marjor);

    //console.log(arr);
    if (!isCheckAll) {
      setNewSubject((state) => ({
        ...state,
        marjor_learn: arr,
      }));
    } else {
      setNewSubject((state) => ({
        ...state,
        marjor_learn: [],
      }));
    }
  };

  const handleCancelClick = () => {
    setNewSubject({
      id: null,
      id_subject: "",
      subject_name: "",
      credit: 1,
      learn: 1,
      marjor_learn: [],
      lab_required: false,
    });
    setIsForm({
      isOpen: true,
      buttonOpen: 1,
    });
  };
  return (
    <div className="px-4 py-2 sm:ml-64">
      <Toastify />
      {allSubject ? (
        <div className="p-2">
          <h2 className="mt-8 sm:pl-20 text-xl text-gray-900 font-semibold">
            Quản lý danh sách môn học
          </h2>
          <div className="w-10/12 mt-20 mx-auto">
            <section className="container px-4 mx-auto">
              <div className="sm:flex sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-x-3">
                    <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                      Môn học
                    </h2>
                    <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
                      {setting && setting.totalSubject}
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                    Cùng khám phá thế giới qua những trang sách!
                  </p>
                </div>

                <div className="flex items-center mt-4 gap-x-3">
                  <button
                    onClick={() =>
                      setIsForm((preState) => ({
                        ...preState,
                        isOpen: !preState.isOpen,
                        buttonOpen: 1,
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

                    <span>Thêm môn học</span>
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
                <h3 className="font-medium">Thông tin chi tiết</h3>
                <form onSubmit={handleSubmitSubject}>
                  <div className="flex items-center justify-around">
                    <div className="w-1/3 px-4 mt-4">
                      <div className="flex mt-3 items-center mb-8 ">
                        <h3 className="w-2/4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                          Mã môn học
                        </h3>
                        <input
                          type="text"
                          value={newSubject.id_subject}
                          onChange={(event) =>
                            setNewSubject((state) => ({
                              ...state,
                              id_subject: event.target.value,
                            }))
                          }
                          required
                          readOnly={isForm.buttonOpen == 2 ? true : false}
                          placeholder="Ex: XX000"
                          className="block py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-70 placeholder-gray-400/70 pl-5 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                      </div>
                      <div className="flex mt-3 items-center">
                        <h3 className="w-3/4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                          Tên môn học
                        </h3>
                        <input
                          type="text"
                          required
                          value={newSubject.subject_name}
                          onChange={(event) =>
                            setNewSubject((state) => ({
                              ...state,
                              subject_name: event.target.value,
                            }))
                          }
                          placeholder="Nhập text..."
                          className="block py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-70 placeholder-gray-400/70 pl-5 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                      </div>
                    </div>
                    <div className="w-1/3 px-4 mt-4">
                      <div className="flex mt-3 items-center mb-8 ">
                        <h3 className="w-3/4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                          Số tín chỉ
                        </h3>
                        <input
                          type="number"
                          required
                          min={1}
                          value={newSubject.credit}
                          onChange={(event) =>
                            setNewSubject((state) => ({
                              ...state,
                              credit: event.target.value,
                            }))
                          }
                          placeholder="Nhập text..."
                          className="block py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-30 placeholder-gray-400/70 pl-5 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                      </div>
                      <div className="flex mt-3 items-center">
                        <h3 className="w-3/4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                          Số buổi học
                        </h3>
                        <input
                          type="number"
                          required
                          min={1}
                          value={newSubject.learn}
                          onChange={(event) =>
                            setNewSubject((state) => ({
                              ...state,
                              learn: event.target.value,
                            }))
                          }
                          placeholder="Nhập text..."
                          className="block py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-70 placeholder-gray-400/70 pl-5 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                      </div>
                    </div>
                    <div className="w-1/3 px-4">
                      <div className="flex items-center mb-10">
                        <input
                          id="link-radio"
                          type="checkbox"
                          checked={newSubject.lab_required}
                          onChange={() =>
                            setNewSubject((state) => ({
                              ...state,
                              lab_required: !newSubject.lab_required,
                            }))
                          }
                          //value={newSubject.lab_required}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="link-radio"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Thực hành trong môn học.
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="mb-4 font-medium">Các ngành đào tạo</h3>
                    <div className="flex flex-wrap">
                      <div className="flex w-1/5 px-2 py-4">
                        <div className="flex items-center h-5">
                          <input
                            id="helper-radio"
                            aria-describedby="helper-radio-text"
                            type="checkbox"
                            onChange={(e) => handleCheckAllBox(e.target.value)}
                            value="1"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                        </div>
                        <div className="ml-2 text-sm">
                          <label
                            htmlFor="helper-radio"
                            className="font-medium text-gray-900 dark:text-gray-300"
                          >
                            000{" "}
                          </label>
                          <p
                            id="helper-radio-text"
                            className="text-xs font-normal text-gray-500 dark:text-gray-300"
                          >
                            Tất cả{" "}
                          </p>
                        </div>
                      </div>
                      {allMarjor.map((marjor) => {
                        return (
                          <div
                            className="flex w-1/5 px-2 py-4"
                            key={marjor.id_marjor}
                          >
                            <div className="flex items-center h-5">
                              <input
                                id="helper-radio"
                                onChange={(e) => handleCheckBox(e.target.value)}
                                aria-describedby="helper-radio-text"
                                type="checkbox"
                                checked={newSubject.marjor_learn.includes(
                                  marjor.id_marjor
                                )}
                                value={marjor.id_marjor}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              />
                            </div>
                            <div className="ml-2 text-sm">
                              <label
                                htmlFor="helper-radio"
                                className="font-medium text-gray-900 dark:text-gray-300"
                              >
                                {marjor.id_marjor}
                              </label>
                              <p
                                id="helper-radio-text"
                                className="text-xs font-normal text-gray-500 dark:text-gray-300"
                              >
                                {marjor.name_marjor}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex mt-12 justify-end w-full">
                    <button
                      onClick={handleSubmitUpdate}
                      type="button"
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
                              className=" py-3.5 px-4 text-sm font-medium text-center rtl:text-right text-gray-900 dark:text-gray-500"
                            >
                              Mã môn học
                            </th>
                            <th
                              scope="col"
                              className=" py-3.5 px-4 text-sm font-medium text-center rtl:text-right text-gray-900 dark:text-gray-500"
                            >
                              Tên môn học
                            </th>
                            <th
                              scope="col"
                              className=" py-3.5 px-4 text-sm font-medium text-center rtl:text-right text-gray-900 dark:text-gray-500"
                            >
                              Ngành đào tạo
                            </th>
                            <th
                              scope="col"
                              className=" py-3.5 px-4 text-sm font-medium text-center rtl:text-right text-gray-900 dark:text-gray-500"
                            >
                              Thực hành
                            </th>
                            <th
                              scope="col"
                              className=" py-3.5 px-4 text-sm font-medium text-center rtl:text-right text-gray-900 dark:text-gray-500"
                            >
                              Số tín chỉ
                            </th>

                            <th
                              scope="col"
                              className=" py-3.5 px-4 text-sm font-medium text-center rtl:text-right text-gray-900 dark:text-gray-500"
                            >
                              Số tiết học
                            </th>
                            <th
                              scope="col"
                              className=" py-3.5 px-4 text-sm font-medium text-center rtl:text-right text-gray-900 dark:text-gray-500"
                            >
                              Tùy chọn
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                          {allSubject &&
                            allSubject.map((subject, index) => {
                              return (
                                <tr key={index}>
                                  <th
                                    scope="col"
                                    className=" py-3.5 px-4 text-sm font-medium text-center rtl:text-right text-gray-500 dark:text-gray-400"
                                  >
                                    {subject.id_subject}
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                  >
                                    {subject.subject_name}
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400"
                                  >
                                    {subject.marjor_learn
                                      ? subject.marjor_learn.map(
                                          (item) => item + " "
                                        )
                                      : "Không xác định!"}
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-4 py-3.5 text-sm font-normal flex items-center justify-center rtl:text-right text-gray-500 dark:text-gray-400"
                                  >
                                    {subject.lab_required ? (
                                      <FaRegCheckCircle className="h-5 w-5 text-green-600" />
                                    ) : (
                                      <FaRegCircle className="h-5 w-5 text-slate-800" />
                                    )}
                                  </th>
                                  <th
                                    scope="col"
                                    className=" px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400"
                                  >
                                    <div className="flex items-center justify-center">
                                      <p className="p-3 flex items-center justify-center w-6 h-6 -mx-1 text-xs text-blue-600 bg-blue-100 border-2 border-white rounded-full">
                                        {subject.credit}
                                      </p>
                                    </div>
                                  </th>

                                  <th
                                    scope="col"
                                    className=" px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400"
                                  >
                                    <div className="flex items-center justify-center">
                                      <p className="p-3 flex items-center justify-center w-6 h-6 -mx-1 text-xs text-blue-600 bg-blue-100 border-2 border-white rounded-full">
                                        {subject.learn}
                                      </p>
                                    </div>
                                  </th>
                                  <th
                                    scope="col"
                                    className="flex items-center justify-around px-4 py-5 text-sm font-normal text-center rtl:text-right text-gray-500 dark:text-gray-400"
                                  >
                                    <FaPencilAlt
                                      className="h-4 w-4 cursor-pointer"
                                      onClick={() => handleUpdateClick(subject)}
                                    />
                                    <FaTrash
                                      onClick={() =>
                                        handleDeleteSubject(subject._id)
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

export default manageSubject;
