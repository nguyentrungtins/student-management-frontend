"use client";
import { GrNotification, AiOutlineSetting, GiChaingun } from "../icons.js";
function HeaderNavigation({ title = "Title", desc = "Descriptions" }) {
  return (
    <>
      <div className="flex justify-between px-8 py-4 bg-white rounded-b-xl h-[84px]">
        <div className="">
          <h1 className="text-xl mb-1 font-bold text-gray-900">{title}</h1>
          <p className="text-sm font-medium text-gray-500">{desc}</p>
        </div>
        <div className="flex gap-5 items-center h-full">
          <div>
            <div>
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-80 p-3 pl-10 text-sm text-gray-900 rounded-lg bg-gray-100 focus:ring-gray-500 focus:border-gray-100"
                  placeholder="Type something..."
                  required
                />
                <button
                  type="submit"
                  className="flex items-center gap-1 text-gray-700 absolute right-2.5 bottom-1.5 bg-white hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-[6px]"
                >
                  <GiChaingun className="w-4 h-4" />
                  <span className="pt-[1px]">Enter</span>
                </button>
              </div>
            </div>
          </div>
          <GrNotification className="flex-shrink-0 w-5 h-5 p-[1px] transition duration-75 dark:text-gray-400 cursor-pointer" />
          <AiOutlineSetting className="flex-shrink-0 w-5 h-5 transition duration-75 dark:text-gray-400 cursor-pointer" />
        </div>
      </div>
    </>
  );
}

export default HeaderNavigation;
