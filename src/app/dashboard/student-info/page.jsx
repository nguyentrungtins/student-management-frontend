import Image from "next/image";

const StudentInfo = () => {
 
  return (
    <>
      <div className="p-4 sm:ml-64 flex flex-row">
        <div className="basis-1/3 border-x-2">
          <div className="w-full card__media"></div>
          <div className="flex items-center p-4 mt-5"></div>
          <div className="flex items-center p-4 mt-5">
            <div className="relative flex flex-col items-center w-full">
              <div className="h-24 w-24 md rounded-full relative avatar flex items-end justify-end min-w-max absolute -top-16 flex ">
                <Image
                  className="h-24 w-24 md rounded-full relative"
                  src="https://marketplace.canva.com/EAFEits4-uw/1/0/1600w/canva-boy-cartoon-gamer-animated-twitch-profile-photo-oEqs2yqaL8s.jpg"
                  alt=""
                  fill={true}
                />
                <div className="absolute"></div>
              </div>
              <div className="flex flex-col space-y-1 justify-center items-center -mt-12 w-full">
                <div className="py-2 flex space-x-2">
                  <button
                    type="button"
                    className="inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                  >
                    Upload photo
                  </button>
                  <button
                    type="button"
                    className="inline-block rounded border-2 border-primary-100 px-6 pt-2 pb-[6px] text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:border-primary-accent-100 hover:bg-neutral-500 hover:bg-opacity-10 focus:border-primary-accent-100 focus:outline-none focus:ring-0 active:border-primary-accent-200 dark:text-primary-100 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                    data-te-ripple-init
                  >
                    Delete
                  </button>
                </div>
              </div>
              <table className="text-sm my-3">
                <tbody>
                  <tr>
                    <td className="px-2 py-2 text-gray-500 font-bold">Name</td>
                    <td className="px-2 py-2">Tin Nguyen</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 text-gray-500 font-bold">
                      Student Id
                    </td>
                    <td className="px-2 py-2">Abc123</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 text-gray-500 font-bold">Phone</td>
                    <td className="px-2 py-2">+84 6969696969</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 text-gray-500 font-bold">Email</td>
                    <td className="px-2 py-2">tinnguyen@gmail.com</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 text-gray-500 font-bold">
                      Address
                    </td>
                    <td className="px-2 py-2">Long Thanh, Dong Nai</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="basis-2/3">
          <div className="inputs w-full max-w-2xl p-6 mx-auto">
            <h2 className="text-xl text-gray-900">Student Information</h2>
            <form className="mt-6 border-t border-gray-400 pt-4">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6">
                  <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                    First name
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-1 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                    type="text"
                    value="Nguyen"
                    readonly
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6">
                  <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Last name
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-1 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                    type="text"
                    value="Tin"
                    readonly
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6">
                  <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Student Id
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-1 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                    type="text"
                    value="Abc123"
                    readonly
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6">
                  <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Phone number
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-1 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                    type="text"
                    value="+84 999999999"
                    readonly
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6">
                  <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Email
                  </label>
                  <input
                    className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-1 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                    type="text"
                    value="tinnguyen@gmail.com"
                    readonly
                  />
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6">
                  <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Password
                  </label>
                  <button className="appearance-none bg-gray-200 text-gray-900 px-2 shadow-sm border border-gray-400 rounded-md ">
                    Change your password
                  </button>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6">
                  <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Date of birth
                  </label>
                  <div className="flex-shrink w-full inline-block relative">
                    <input
                      className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-1 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                      type="text"
                      value="01/01/2001"
                      readonly
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6"> 
                  <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Address
                  </label>
                  <div className="flex-shrink w-full inline-block relative">
                    <input
                      className="appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-1 px-4 leading-tight focus:outline-none  focus:border-gray-500"
                      type="text"
                      value="Long Thanh, Dong Nai, Viet Nam"
                      readonly
                    />
                  </div>
                </div>
                
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default StudentInfo;
