"use client";

import React, { useState, useEffect, componentDidMount } from "react";
import HeaderNavigation from "@/app/components/HeaderNavigation";
import Calendar from "@/app/components/Calendar";
import WeekCalendar from "@/app/components/WeekCalendar";
import axios from "axios";

const schedules = () => {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const url = "http://localhost:3030/scheduling/user";
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setSchedule(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="ml-64">
      <HeaderNavigation
        title="Thời Khóa Biểu"
        desc="Đăng ký môn học cho học kỳ I 2022-2203"
      />
      <div className="flex mt-6 h-screen w-full ">
        <div className="w-9/12 h-screen rounded-xl p-4">
          <div className="pt-2 pb-6 px-4">
            <h2 className="text-[18px] text-gray-800 font-semibold">
              Calendar
            </h2>
          </div>
          <WeekCalendar schedule={schedule} />
        </div>
        <div className="bg-yellow-50 flex-1 rounded-xl px-4 pt-6">
          <Calendar />
        </div>
      </div>
    </div>
  );
};

export default schedules;
