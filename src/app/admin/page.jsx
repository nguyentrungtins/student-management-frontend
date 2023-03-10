"use client";

import React, { useEffect, useState } from "react";
import { HiArrowNarrowDown, HiArrowNarrowUp } from "react-icons/hi";
import { GiAbstract012, GiPaperClip } from "react-icons/gi";
import { GoPrimitiveDot } from "react-icons/go";
import { CgDetailsMore } from "react-icons/cg";
import { BsNewspaper } from "react-icons/bs";
import HeaderNavigation from "../components/HeaderNavigation";
import { redirect } from "next/navigation";
import axios from "axios";

const Dashboard = () => {
  const [data, setData] = useState([]);
  console.log(data);
  useEffect(() => {
    const url = "http://localhost:3030/dashboard/admin";
    if (sessionStorage.getItem("access_token")) {
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
          },
        })
        .then((res) => {
          console.log(res);
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return redirect("/auth/login");
    }
  }, []);
  return (
    <>
      <div className="px-2 sm:ml-60">
        <HeaderNavigation title="Dashboard" desc="Học kỳ I 2022-2203" />
        <div className="rounded-lg ml-8">
          <div className="grid grid-cols-12 gap-4 mb-4 mt-4">
            <div className="grid grid-rows-[auto-auto] gap-4 col-span-9">
              <h2 className="text-xl w-full font-semibold text-gray-700 mt-2 mb-1">
                Tổng Quan
              </h2>
              <div className="flex items-center h-36 justify-center rounded-xl  dark:bg-gray-800">
                <div className="grid grid-cols-3 gap-4 mb-4 mt-4  w-full h-full">
                  <div className="flex w-full flex-col items-start  px-6 py-4  bg-[#017AFF] rounded-xl  dark:bg-gray-800">
                    <span className="flex flex-col text-white">
                      <span className="text-base font-semibold ">
                        Sinh viên
                      </span>
                      <span className="text-xs mt-[-2px]">
                        Tổng số sinh viên trong trường
                      </span>
                    </span>
                    <span className="flex justify-between flex-1 pt-6 w-full items-center text-white font-extrabold text-4xl">
                      <span className="flex w-full justify-between items-end">
                        <div>
                          <span className="mr-2">
                            {data ? data.numUser : "0"}
                          </span>
                          <span className="text-sm">Sinh viên</span>
                        </div>
                        <span className="flex text-sm items-end font-normal">
                          <HiArrowNarrowDown className="mb-1 text-sm" />
                          5%
                        </span>
                      </span>
                    </span>
                  </div>
                  <div className="flex w-full flex-col items-start  px-6 py-4  bg-gray-200 rounded-xl ">
                    <span className="flex flex-col text-gray-900">
                      <span className="text-base font-semibold">Ngành</span>
                      <span className="text-xs mt-[-2px] text-gray-500">
                        Số ngành dạy học
                      </span>
                    </span>
                    <span className="flex justify-between flex-1 pt-6 w-full items-center text-gray-900 font-extrabold text-4xl">
                      <span className="flex w-full justify-between items-end">
                        <div>
                          <span className="text-primary mr-2">
                            {data ? data.numMajor : "0"}
                          </span>

                          <span className="text-sm text-gray-700">Ngành</span>
                        </div>
                        <span className="flex text-sm items-end font-normal">
                          <HiArrowNarrowUp className="mb-1 text-sm" />
                          0%
                        </span>
                      </span>
                    </span>
                  </div>
                  <div className="flex w-full flex-col items-start  px-6 py-4  bg-white rounded-xl ">
                    <span className="flex flex-col text-gray-900">
                      <span className="text-base font-semibold">Thành tựu</span>
                      <span className="text-xs mt-[-2px] text-gray-500">
                        2022-2023
                      </span>
                    </span>
                    <span className="flex justify-between flex-1 pt-6 w-full items-center text-gray-900 font-extrabold text-4xl">
                      <span className="flex w-full justify-between items-end">
                        <div>
                          <span className="text-primary mr-2">30</span>
                          <span className="text-sm text-gray-700">
                            Mục tiêu
                          </span>
                        </div>
                        <span className="flex text-sm items-end font-normal">
                          <HiArrowNarrowUp className="mb-1 text-sm" />
                          20%
                        </span>
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-xl w-full font-semibold text-gray-700 mt-3 mb-4">
                  Thông báo
                </h2>
                <div className="w-full bg-white p-4 flex flex-col gap-4 rounded-xl">
                  <div className="text-gray-900 w-full ">
                    <p className="text-sm text-gray-500">15 ,Tháng 3, 2023</p>
                    <div className="flex w-full justify-between p-4 pb-6 border-b-2 border-gray-50">
                      <div className="flex gap-5 items-center">
                        <div>
                          <GiAbstract012 className="text-orange-500" />
                        </div>
                        <div className="flex flex-col">
                          <p>Lịch thực tập cho khóa 2019</p>
                          <p className="text-sm text-gray-500 max-w-xs">
                            Sinh viên cập nhật lịch thực tập trong thời gian từ
                            23/5 - 26/5
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="p-[0.8px] rounded-md border-2 border-orange-400">
                          <GoPrimitiveDot className="text-orange-400" />
                        </div>
                        <div className="text-sm  text-gray-600 w-20">
                          Marketing
                        </div>
                      </div>
                      <div className="flex items-center ">
                        <span className="py-2 px-3 rounded-md cursor-pointer">
                          <GiPaperClip />
                        </span>
                      </div>
                      <div className="flex items-center ">
                        <span className="py-2 px-3 cursor-pointer hover:bg-blue-100 hover:border-2 hover:border-blue-400 rounded-md bg-blue-50">
                          <CgDetailsMore />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-gray-900 w-full ">
                    <p className="text-sm text-gray-500">4 ,Tháng 3, 2023</p>
                    <div className="flex w-full justify-between p-4 pb-6 border-b-2 border-gray-50">
                      <div className="flex gap-5 items-center">
                        <div>
                          <GiAbstract012 className="text-purple-500" />
                        </div>
                        <div className="flex flex-col">
                          <p>Lịch đăng ký môn học cho HK2 - 2023</p>
                          <p className="text-sm text-gray-500 max-w-xs">
                            Sinh viên cập nhật lịch đăng ký môn học trong thời
                            gian từ 23/5 - 26/5
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="p-[0.8px] rounded-md border-2 border-purple-400">
                          <GoPrimitiveDot className="text-purple-400" />
                        </div>
                        <div className="text-sm  text-gray-600 w-20">Khoa</div>
                      </div>
                      <div className="flex items-center ">
                        <span className="py-2 px-3 rounded-md cursor-pointer">
                          <GiPaperClip />
                        </span>
                      </div>
                      <div className="flex items-center ">
                        <span className="py-2 px-3 cursor-pointer hover:bg-blue-100 hover:border-2 hover:border-blue-400 rounded-md bg-blue-50">
                          <CgDetailsMore />
                        </span>
                      </div>
                    </div>
                    <div className="flex w-full justify-between p-4 pb-6 border-b-2 border-gray-50">
                      <div className="flex gap-5 items-center">
                        <div>
                          <GiAbstract012 className="text-emerald-300" />
                        </div>
                        <div className="flex flex-col">
                          <p>Lịch thực tập cho khóa 2019</p>
                          <p className="text-sm text-gray-500 max-w-xs">
                            Sinh viên cập nhật lịch thực tập trong thời gian từ
                            23/5 - 26/5
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="p-[0.8px] rounded-md border-2 border-emerald-300">
                          <GoPrimitiveDot className="text-emerald-300" />
                        </div>
                        <div className="text-sm  text-gray-600 w-20">Chung</div>
                      </div>
                      <div className="flex items-center ">
                        <span className="py-2 px-3 rounded-md cursor-pointer">
                          <GiPaperClip />
                        </span>
                      </div>
                      <div className="flex items-center ">
                        <span className="py-2 px-3 cursor-pointer hover:bg-blue-100 hover:border-2 hover:border-blue-400 rounded-md bg-blue-50">
                          <CgDetailsMore />
                        </span>
                      </div>
                    </div>
                    <div className="flex w-full justify-between p-4 pb-6 border-b-2 border-gray-50">
                      <div className="flex gap-5 items-center">
                        <div>
                          <GiAbstract012 className="text-red-400" />
                        </div>
                        <div className="flex flex-col">
                          <p>Lịch thực tập cho khóa 2019</p>
                          <p className="text-sm text-gray-500 max-w-xs">
                            Sinh viên cập nhật lịch thực tập trong thời gian từ
                            23/5 - 26/5
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="p-[0.8px] rounded-md border-2 border-red-400">
                          <GoPrimitiveDot className="text-red-400" />
                        </div>
                        <div className="text-sm  text-gray-600 w-20">Chung</div>
                      </div>
                      <div className="flex items-center ">
                        <span className="py-2 px-3 rounded-md cursor-pointer">
                          <GiPaperClip />
                        </span>
                      </div>
                      <div className="flex items-center ">
                        <span className="py-2 px-3 cursor-pointer hover:bg-blue-100 hover:border-2 hover:border-blue-400 rounded-md bg-blue-50">
                          <CgDetailsMore />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col mt-4 gap-4 rounded-xl dark:bg-gray-800 col-span-3">
              <div className="flex flex-col justify-between w-full h-60 bg-white py-4 px-6 rounded-xl">
                <p className="text-lg font-semibold text-gray-900">
                  <p>Tiến độ học tập</p>
                  <p className="text-[15px] font-medium text-gray-500">
                    Hoàn thành
                  </p>
                </p>
                <div class="w-full h-3 bg-blue-200 overflow-hidden rounded-full">
                  <div class="bg-blue-500 rounded-lg w-2/3 h-3"></div>
                </div>
                <p className="self-center text-center text-gray-700">
                  Số môn tín chỉ còn thiếu: <br />{" "}
                  <span className="text-blue-500 font-semibold">123 Tín</span>
                </p>
                <span className="text-center text-white font-semibold self-center bg-blue-500 rounded-xl w-full py-2">
                  Xem Chi Tiết
                </span>
              </div>
              <div className="w-full py-4 px-6 bg-white rounded-xl ">
                <p className="flex justify-between items-center text-lg mb-5 font-semibold text-gray-900">
                  <p>Tin Tức</p>
                  <span>
                    <BsNewspaper className="text-gray-700 font-thin mb-[1px]" />
                  </span>
                </p>
                <div className=" w-full bg-blue-50 px-4 py-2 rounded-lg mb-4">
                  <div className="flex justify-between text-sm mb-2 text-gray-500">
                    <p>Hot</p>
                    <p>1/3</p>
                  </div>
                  <p className="text-base font-medium mb-1">
                    Sinh viên trường TĐT
                  </p>
                  <p className="text-sm text-gray-500">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.{" "}
                  </p>
                </div>

                <div className=" w-full bg-green-50 px-4 py-2 rounded-lg mb-4">
                  <div className="flex justify-between text-sm mb-2 text-gray-500">
                    <p>Thường</p>
                    <p>1/3</p>
                  </div>
                  <p className="text-base font-medium mb-1">
                    Sinh viên trường TĐT
                  </p>
                  <p className="text-sm text-gray-500">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.{" "}
                  </p>
                </div>
                <div className=" w-full bg-yellow-50 px-4 py-2 rounded-lg mb-4">
                  <div className="flex justify-between text-sm mb-2 text-gray-500">
                    <p>Cực Hot</p>
                    <p>1/3</p>
                  </div>
                  <p className="text-base font-medium mb-1">
                    Anh Khiêm sắp cưới vợ
                  </p>
                  <p className="text-sm text-gray-500">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
