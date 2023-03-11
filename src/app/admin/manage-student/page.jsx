"use client";

import { useRef, useState } from "react";
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineFileAdd,
} from "react-icons/ai";
import { GrUpdate } from "react-icons/gr";
import { MdCancel } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { FaFileUpload } from "react-icons/fa";
import axios from "axios";

const ManageStudent = () => {
  const [isForm, setIsForm] = useState(false);
  const [student, setStudent] = useState({
    id_student: "",
    first_name: "",
    last_name: "",
    phone: "",
    address: "",
    email: "",
    major: "",
    birth_day: "",
  });
  const [image, setImage] = useState(null);

  const handleAddUser = (e) => {
    console.log(image);

    const formStudent = new FormData();
    formStudent.append("image", image);
    formStudent.append("id_student", student.id_student);
    formStudent.append("first_name", student.first_name);
    formStudent.append("last_name", student.last_name);
    formStudent.append("address", student.address);
    formStudent.append("phone", student.phone);
    formStudent.append("email", student.email);
    formStudent.append("birth_day", student.birth_day);
    formStudent.append("major", student.major);

    console.log(formStudent);

    axios.post("http://localhost:3030/user/add", formStudent).then((res) => {
      console.log(res.data);
    });

    e.preventDefault();
  };

  // const FileUploader = ({ onFileSelect }) => {
  //   const fileInput = useRef(null);
  //   const handleFileInput = (e) => {
  //     onFileSelect(e.target.files[0]);
  //   };
  // };

  return (
    <div className="p-4 sm:ml-64 flex flex-row">
      <div className="container max-w-7xl mx-auto mt-8">
        <div className="mb-4">
          <h1 className="text-xl text-gray-900 font-semibold underline">
            {" "}
            Manage student
          </h1>

          <div className="flex justify-end items-center mt-4 gap-x-3">
            <button
              onClick={() => setIsForm((state) => !state)}
              className="px-4 py-2 mr-5 rounded-md bg-primary text-sky-100 hover:bg-sky-600"
            >
              Add student
            </button>
            <div className="relative flex items-center mt-4 md:mt-0">
              <span className="absolute pl-3">
                <BsSearch />
              </span>

              <input
                type="text"
                value=""
                placeholder="Search"
                className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
          </div>
          <div
            className={
              isForm
                ? "mt-12 transition-all duration-1000 border-2 rounded-tl-2xl rounded-br-2xl border-gray-700 p-6"
                : "mt-12 hidden"
            }
          >
            <form onSubmit="">
              <h3>Thông tin chi tiết</h3>
              <div className="flex">
                <div className="w-1/3 px-4 mt-8">
                  <div className="flex mt-3 items-center mb-8 ">
                    <h3 className="w-2/4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                      ID
                    </h3>
                    <input
                      required
                      readOnly=""
                      value={student.id_student}
                      onChange={(e) =>
                        setStudent((state) => ({
                          ...state,
                          id_student: e.target.value,
                        }))
                      }
                      type="text"
                      placeholder="Nhập text..."
                      className="block py-1 pr-2 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-70 placeholder-gray-400/70 pl-5 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <div className="flex mt-3 items-center mb-8">
                    <h3 className="w-2/4 mt-1 mr-2 text-sm text-gray-600 dark:text-gray-400">
                      First name
                    </h3>
                    <input
                      required
                      readOnly=""
                      value={student.first_name}
                      onChange={(e) =>
                        setStudent((state) => ({
                          ...state,
                          first_name: e.target.value,
                        }))
                      }
                      type="text"
                      placeholder="Nhập text..."
                      className="block py-1 pr-2 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-70 placeholder-gray-400/70 pl-5 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>

                  <div className="flex mt-3 items-center mb-8">
                    <h3 className="w-2/4 mt-1 mr-2 text-sm text-gray-600 dark:text-gray-400">
                      Last name
                    </h3>
                    <input
                      required
                      readOnly=""
                      value={student.last_name}
                      onChange={(e) =>
                        setStudent((state) => ({
                          ...state,
                          last_name: e.target.value,
                        }))
                      }
                      type="text"
                      placeholder="Nhập text..."
                      className="block py-1 pr-2 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-70 placeholder-gray-400/70 pl-5 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <div className="flex mt-3 items-center">
                    <h3 className="w-3/4 mt-1 mr-2 text-sm text-gray-600 dark:text-gray-400">
                      Address
                    </h3>
                    <input
                      required
                      value={student.address}
                      onChange={(e) =>
                        setStudent((state) => ({
                          ...state,
                          address: e.target.value,
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
                    <h3 className="w-3/4 mt-1 mr-2 text-sm text-gray-600 dark:text-gray-400">
                      Phone
                    </h3>
                    <input
                      type="text"
                      value={student.phone}
                      onChange={(e) =>
                        setStudent((state) => ({
                          ...state,
                          phone: e.target.value,
                        }))
                      }
                      required
                      placeholder="Nhập text..."
                      className="block py-1 pr-2 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-30 placeholder-gray-400/70 pl-5 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <div className="flex mt-3 items-center">
                    <h3 className="w-3/4 mt-1 mr-2 text-sm text-gray-600 dark:text-gray-400">
                      Email
                    </h3>
                    <input
                      type="text"
                      value={student.email}
                      onChange={(e) =>
                        setStudent((state) => ({
                          ...state,
                          email: e.target.value,
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
                    <h3 className="w-1/4 mt-1 mr-2 text-sm text-gray-600 dark:text-gray-400">
                      Birthday
                    </h3>
                    <input
                      type="text"
                      value={student.birth_day}
                      onChange={(e) =>
                        setStudent((state) => ({
                          ...state,
                          birth_day: e.target.value,
                        }))
                      }
                      required
                      placeholder="Nhập text..."
                      className="block py-1 pr-2 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-90 placeholder-gray-400/70 pl-5 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <div className="flex mt-3 items-center">
                    <h3 className="w-1/4 mt-1 mr-2 text-sm text-gray-600 dark:text-gray-400">
                      Major
                    </h3>
                    <input
                      type="text"
                      value={student.major}
                      onChange={(e) =>
                        setStudent((state) => ({
                          ...state,
                          major: e.target.value,
                        }))
                      }
                      required
                      placeholder="Nhập text..."
                      className="block py-1 pr-2 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-90 placeholder-gray-400/70 pl-5 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <div className="flex mt-3 items-center">
                    <h3 className="w-1/4 mt-1 mr-2 text-sm text-gray-600 dark:text-gray-400">
                      Avatar
                    </h3>
                    <input
                      type="file"
                      // value={image}
                      onChange={(e) => setImage(e.target.files[0])}
                      required
                      className="block py-1 pr-2 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-90 placeholder-gray-400/70 pl-5 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                </div>
              </div>

              <div className="flex mt-12 justify-end w-full">
                <button
                  type="button"
                  onClick=""
                  className="mx-8 peer flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
                >
                  <GrUpdate className="w-4 h-4" />
                  <span>Update</span>
                </button>
                <button
                  type="submit"
                  onClick={handleAddUser}
                  className={
                    "mx-8 peer flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
                  }
                >
                  <AiOutlineFileAdd className="w-5 h-5" />
                  <span>Add</span>
                </button>
                <button
                  type="button"
                  onClick=""
                  className="mx-8 flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-red-400 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-red-600 dark:hover:bg-red-500 dark:bg-red-600"
                >
                  <MdCancel className="w-5 h-5" />
                  <span>Cancel</span>
                </button>
              </div>
            </form>
          </div>
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
              <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        ID
                      </th>

                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Name
                      </th>

                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Address
                      </th>

                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Phone
                      </th>

                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Email
                      </th>

                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Birthday
                      </th>
                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Major
                      </th>

                      {/* <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Image
                      </th> */}

                      <th
                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                        colspan="3"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white">
                    <tr>
                      <td className="px-6 py-4 text-center text-sm whitespace-no-wrap border-b border-gray-200">
                        <p>1</p>
                      </td>

                      <td className="px-6 py-4 text-center text-sm whitespace-no-wrap border-b border-gray-200">
                        <p>Nguyen Thanh Lam</p>
                      </td>

                      <td className="px-6 py-4 text-center text-sm whitespace-no-wrap border-b border-gray-200">
                        <p>Q10, TPHCM</p>
                      </td>

                      <td className="px-6 py-4 text-center text-sm whitespace-no-wrap border-b border-gray-200">
                        <p>0969696969</p>
                      </td>

                      <td className="px-6 py-4 text-center text-sm whitespace-no-wrap border-b border-gray-200">
                        <p>thanhlam@gmail.com</p>
                      </td>

                      <td className="px-6 py-4 text-center text-sm whitespace-no-wrap border-b border-gray-200">
                        <p>26/10/99</p>
                      </td>

                      <td className="px-6 py-4 text-center text-sm whitespace-no-wrap border-b border-gray-200">
                        <p>IT</p>
                      </td>

                      {/* <td className="px-6 py-4 text-center text-lg whitespace-no-wrap border-b border-gray-200">
                        <button>
                          <FaFileUpload />
                        </button>
                      </td> */}

                      <td className="px-6 py-4 text-center text-lg whitespace-no-wrap border-b border-gray-200">
                        <button className="mx-2">
                          <AiOutlineEdit />
                        </button>
                        <button className="mx-2">
                          <AiOutlineDelete />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-6 sm:flex sm:items-center sm:justify-between ">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Page{" "}
                  <span className="font-medium text-gray-700 dark:text-gray-100"></span>
                </div>

                <div className="flex items-center mt-4 gap-x-4 sm:mt-0">
                  <div className="pointer-events-none flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
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

                  <div className="pointer-events-none flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
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
          </div>
        </div>
      </div>
    </div>
  );
};
export default ManageStudent;