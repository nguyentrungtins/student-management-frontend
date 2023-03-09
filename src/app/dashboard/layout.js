<<<<<<< HEAD
import React, { Suspense } from "react";
=======
"use client";
import React from "react";
>>>>>>> 8f847dd6cd6332a402127b09ac2ec664df5e1880
import Link from "next/link";
import Image from "next/image";
import { GiAchievement, GiNotebook } from "react-icons/gi";
import { RxDashboard, RxCalendar } from "react-icons/rx";
import { BiSidebar, BiLogOut, BiUser } from "react-icons/bi";
import Logo from "../../../public/Logo.svg";
<<<<<<< HEAD
import Loading from "./loading";
=======
import { useRouter } from "next/navigation";
import AppWrap from "@/components/app_wrap";

>>>>>>> 8f847dd6cd6332a402127b09ac2ec664df5e1880
const DashboardLayout = ({ children }) => {
  const router = useRouter();
  const handleLogout = () => {
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
    clearInterval(window.a);
    router.push('/auth/login')
  }
  return (
<<<<<<< HEAD
    <aside className="px-6">
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-600 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>
      <div
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 bg-white w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="flex flex-col justify-between h-full px-3 py-[25px] overflow-y-auto  dark:bg-gray-800">
          <Link href={"/"}>
            <div className="relative w-8/12 ml-5 h-10">
              <Image src={Logo} alt="Logo Images" fill={true} />
            </div>
          </Link>
          <ul className="flex flex-col flex-1 gap-2 pt-14 pl-5">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-base font-normal text-gray-600 hover:text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <RxDashboard className="flex-shrink-0 w-5 h-5 text-gray-600 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ml-3 text-sm font-semibold">Trang chủ</span>
              </a>
            </li>

            <li>
              <Link
                href="/dashboard/view-score"
                className="flex items-center p-2 text-base font-normal hover:text-gray-900 text-gray-600 rounded-lg hover:bg-gray-100 "
              >
                <GiAchievement className="flex-shrink-0 w-5 h-5 text-gray-600 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ml-3 text-sm font-semibold">Điểm số</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/subject-registration"
                className="flex items-center p-2 text-base font-normal hover:text-gray-900 text-gray-600 rounded-lg hover:bg-gray-100 "
              >
                <GiNotebook className="flex-shrink-0 w-5 h-5 text-gray-600 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ml-3 text-sm font-semibold">
                  Đăng kí môn học
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/schedules"
                className="flex items-center p-2 text-base font-normal hover:text-gray-900 text-gray-600 rounded-lg hover:bg-gray-100 "
              >
                <RxCalendar className="flex-shrink-0 w-5 h-5 text-gray-600 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ml-3 text-sm font-semibold">
                  Thời khóa biểu
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/exam-date"
                className="flex items-center p-2 text-base font-normal hover:text-gray-900 text-gray-600 rounded-lg hover:bg-gray-100 "
              >
                <BiSidebar className="flex-shrink-0 w-5 h-5 text-gray-600 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ml-3 text-sm font-semibold">Lịch thi</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/student-info"
                className="flex items-center p-2 text-base font-normal hover:text-gray-900 text-gray-600 rounded-lg hover:bg-gray-100 "
              >
                <BiUser className="flex-shrink-0 w-5 h-5 text-gray-600 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ml-3 text-sm font-semibold">
                  Thông tin sinh viên
                </span>
              </Link>
            </li>
          </ul>
          <Link
            href="#"
            className="flex h-20 mx-4 gap-3 items-center pl-2 rounded-lg hover:bg-gray-100"
=======
    <AppWrap>
      <aside className="p-[25px]">
        <button
          data-drawer-target="default-sidebar"
          data-drawer-toggle="default-sidebar"
          aria-controls="default-sidebar"
          type="button"
          className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-600 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
>>>>>>> 8f847dd6cd6332a402127b09ac2ec664df5e1880
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>

        <div
          id="default-sidebar"
          className="fixed top-0 left-0 z-40 bg-white w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
          aria-label="Sidebar"
        >
          <div className="flex flex-col justify-between h-full px-3 py-[25px] overflow-y-auto  dark:bg-gray-800">
            <Link href={"/"}>
              <div className="relative w-5/6 h-14">
                <Image src={Logo} alt="Logo Images" fill={true} />
              </div>
            </Link>
            <ul className="flex flex-col flex-1 gap-2 pt-10 pl-5">
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-base font-normal text-gray-600 hover:text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <RxDashboard className="flex-shrink-0 w-5 h-5 text-gray-600 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="ml-3 text-sm font-semibold">Trang chủ</span>
                </a>
              </li>

              <li>
                <Link
                  href="/dashboard/view-score"
                  className="flex items-center p-2 text-base font-normal hover:text-gray-900 text-gray-600 rounded-lg hover:bg-gray-100 "
                >
                  <GiAchievement className="flex-shrink-0 w-5 h-5 text-gray-600 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="ml-3 text-sm font-semibold">Điểm số</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/subject-registration"
                  className="flex items-center p-2 text-base font-normal hover:text-gray-900 text-gray-600 rounded-lg hover:bg-gray-100 "
                >
                  <GiNotebook className="flex-shrink-0 w-5 h-5 text-gray-600 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="ml-3 text-sm font-semibold">
                    Đăng kí môn học
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/schedules"
                  className="flex items-center p-2 text-base font-normal hover:text-gray-900 text-gray-600 rounded-lg hover:bg-gray-100 "
                >
                  <RxCalendar className="flex-shrink-0 w-5 h-5 text-gray-600 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="ml-3 text-sm font-semibold">
                    Thời khóa biểu
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/exam-date"
                  className="flex items-center p-2 text-base font-normal hover:text-gray-900 text-gray-600 rounded-lg hover:bg-gray-100 "
                >
                  <BiSidebar className="flex-shrink-0 w-5 h-5 text-gray-600 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="ml-3 text-sm font-semibold">Lịch thi</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/student-info"
                  className="flex items-center p-2 text-base font-normal hover:text-gray-900 text-gray-600 rounded-lg hover:bg-gray-100 "
                >
                  <BiUser className="flex-shrink-0 w-5 h-5 text-gray-600 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="ml-3 text-sm font-semibold">
                    Thông tin sinh viên
                  </span>
                </Link>
              </li>
            </ul>
            <Link
              href="#"
              className="flex h-20 w-full gap-3 items-center pl-5 rounded-lg hover:bg-gray-100"
            >
              <div className="relative overflow-hidden w-11 h-11 rounded-full">
                <Image
                  src="https://marketplace.canva.com/EAFEits4-uw/1/0/1600w/canva-boy-cartoon-gamer-animated-twitch-profile-photo-oEqs2yqaL8s.jpg"
                  alt="Avatar Images"
                  fill={true}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-gray-700 font-semibold text-sm">
                  Nguyen Trung Tin
                </span>
                <span className="text-gray-400 font-semibold text-[0.8rem]">
                  Software Developer
                </span>
              </div>
            </Link>
            <div
              className="flex items-center justify-center gap-5 mt-5 mx-3 h-10 rounded-lg hover:bg-gray-200 bg-gray-100 text-gray-600 hover:text-gray-900"
              onClick={handleLogout}
            >
              <BiLogOut className="flex-shrink-0 w-5 h-5 transition duration-75 dark:text-gray-400 " />
              <span className="text-sm font-semibold">Logout</span>
            </div>
<<<<<<< HEAD
            <div className="flex flex-col">
              <span className="text-gray-700 font-semibold text-sm">
                Nguyen Trung Tin
              </span>
              <span className="text-gray-400 font-semibold text-[0.8rem]">
                Software Developer
              </span>
            </div>
          </Link>
          <a
            className="flex items-center justify-center gap-5 mt-5 mx-5 h-10 rounded-lg hover:bg-gray-200 bg-gray-100 text-gray-600 hover:text-gray-900"
            href="#"
          >
            <BiLogOut className="flex-shrink-0 w-5 h-5 transition duration-75 dark:text-gray-400 " />
            <span className="text-sm font-semibold">Logout</span>
          </a>
        </div>
      </div>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </aside>
=======
          </div>
        </div>
        <>{children}</>
      </aside>
    </AppWrap>
>>>>>>> 8f847dd6cd6332a402127b09ac2ec664df5e1880
  );
};

export default DashboardLayout;
