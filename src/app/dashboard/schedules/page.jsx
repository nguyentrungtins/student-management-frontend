import React from "react";
import HeaderNavigation from "@/app/components/HeaderNavigation";
import Calendar from "@/app/components/Calendar";
import WeekCalendar from "@/app/components/WeekCalendar";
const schedules = () => {
  return (
    <div className="ml-64">
      <HeaderNavigation
        title="Thời Khóa Biểu"
        desc="Đăng ký môn học cho học kỳ I 2022-2203"
      />
      <div className="flex mt-6 bg-blue-50 gap-4 h-screen w-full ">
        <div className="bg-red-100 w-9/12 h-screen rounded-xl p-4">
          <WeekCalendar />
        </div>
        <div className="bg-yellow-50 flex-1 rounded-xl p-4">
          <Calendar />
        </div>
      </div>
    </div>
  );
};

export default schedules;
