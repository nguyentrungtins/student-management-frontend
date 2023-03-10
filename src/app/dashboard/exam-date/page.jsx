"use client";

import React, { useState, useEffect, componentDidMount } from "react";
import HeaderNavigation from "@/app/components/HeaderNavigation";
import Calendar from "@/app/components/Calendar";
import WeekCalendar from "@/app/components/WeekCalendar";
import axios from "axios";
import { redirect } from "next/navigation";
import { HiChevronLeft, HiChevronRight } from "../../icons.js";
import { getMonth, getYear, monthsToQuarters, startOfToday } from "date-fns";
const ExamDate = () => {
  const [schedule, setSchedule] = useState([]);
  const today = startOfToday();
  const weekDay = [];
  const quater = monthsToQuarters(getMonth(today));
  let examMonth = getMonth(today);

  if (quater == 1) {
    examMonth = 5;
  } else {
    examMonth = 12;
  }
  useEffect(() => {
    const url = "http://localhost:3030/scheduling/user";
    if (sessionStorage.getItem("access_token")) {
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
    } else {
      return redirect("/auth/login");
    }
  }, []);
  return (
    <div className="ml-64">
      <HeaderNavigation
        title="Lịch Thi"
        desc="Lịch thi cho học kỳ I 2022-2203"
      />
      <div className="flex mt-4 h-screen w-full ">
        <div className="w-9/12 h-screen rounded-xl p-4">
          <div className="flex justify-between items-center pt-2 pb-6 px-4">
            <h2 className="text-xl text-gray-800 font-semibold">
              Lịch Thi - Tháng {examMonth}
            </h2>
            <div className="flex justify-between items-center h-full w-20 border-orange-50">
              <HiChevronLeft
                className="cursor-pointer font-normal text-gray-500"
                size={25}
              />
              <HiChevronRight
                className="cursor-pointer font-normal text-gray-500"
                size={25}
              />
            </div>
          </div>
          <WeekCalendar schedule={schedule} isExam={true} />
        </div>
        <div className="bg-white flex-1 rounded-xl px-4 pt-6">
          <Calendar />
        </div>
      </div>
    </div>
  );
};

export default ExamDate;
