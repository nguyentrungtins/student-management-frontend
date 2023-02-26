import React from "react";
import Image from "next/image";
import Logo from "../../../../public/Logo.svg";
import Content from "../../../../public/content.png";
import { FaUserAlt, FaLock } from "react-icons/fa";

export default function Login() {
  return (
    <div className="bg-[#F0F1F8] w-screen h-screen flex justify-center items-center">
      <div className="flex justify-center p-4 w-[1100px] h-[700px] rounded-md">
        <div className="w-1/2 p-3 bg-primary flex items-center rounded-l-2xl drop-shadow-xl">
          <Image src={Content} />
        </div>
        <div className="w-1/2 p-3 bg-white drop-shadow-xl rounded-r-2xl pt-16">
          <div className="p-5 flex justify-center">
            <Image src={Logo} alt="Logo Images" height={60} />
          </div>
          <h1 className="px-4 pt-10 flex justify-center text-3xl font-semibold">
            Chào Mừng Bạn
          </h1>
          <div className="py-5 flex justify-center text-sm text-center font-light w-4/6 m-auto mb-0">
            Bạn hãy đăng nhập bằng tài khoản của mình ở dưới đây!
          </div>
          <div className="flex flex-col w-4/6 ml-auto mr-auto">
            <div className="flex items-center relative mt-5">
              <input
                type="text"
                placeholder="Enter your username ... "
                className="rounded-xl pl-12 focus:outline-gray-900 w-full p-2.5 border-solid border-2 border-indigo-100"
              />
              <FaUserAlt className="absolute left-4 text-gray-500" />
            </div>

            <div className="flex items-center relative mt-5 mb-10">
              <input
                type="password"
                placeholder="Enter your password ... "
                className="rounded-xl pl-12 focus:outline-gray-900 w-full p-2.5 border-solid border-2 border-indigo-100"
              />
              <FaLock className="absolute left-4 text-gray-500" />
            </div>
          </div>
          <div className="rounded-xl font-semibold mb-10 p-2 bg-primary text-white w-4/6 ml-auto mr-auto text-center hover:cursor-pointer">
            Login
          </div>
          <div className="text-center text-sm font-light">
            Nếu có vấn đề thắc mắc nào
            <div className="font-medium">
              Liên hệ với chúng tôi
              <span className="text-primary font-medium"> tại đây.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
