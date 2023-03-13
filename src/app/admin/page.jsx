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
import Chart from "../components/Chart";
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
        <HeaderNavigation title="Dashboard" desc="Học kỳ II 2022-2203" />
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
                <Chart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
