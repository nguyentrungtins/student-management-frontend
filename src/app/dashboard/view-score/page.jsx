"use client";
import HeaderNavigation from "@/app/components/HeaderNavigation";
import axios from "axios";
import { useEffect, useState } from "react";
const ViewScore = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const url = "http://localhost:3030/score/student/get";
    if (sessionStorage.getItem("access_token")) {
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
          },
        })
        .then((res) => {
          console.log("data", res);
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return redirect("/auth/login");
    }
  }, []);
  let avg = 0;
  if (data) {
    const avgList = [];
    data.map((s, i) => {
      const { score } = s;
      if (score) {
        avgList.push(score);
      }
    });

    if (avgList.length > 0) {
      avg = avgList.reduce((partialSum, a) => partialSum + a, 0) / avgList.length;
    }
  }
  return (
    <div className="ml-64">
      <HeaderNavigation title="Điểm Số" desc="Học kỳ II 2022-2203" />
      <table className="w-full my-6 border-collapse rounded-lg bg-white text-left text-base text-gray-500">
        <thead className="">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Mã môn học
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Môn học
            </th>

            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Trạng thái
            </th>

            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Số chỉ
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Điểm
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {data &&
            data.map((s) => (
              <tr className="hover:bg-gray-100">
                <td className="px-6 py-4">{s.subject.id_subject}</td>
                <td className="px-6 py-4">{s.subject.subject_name}</td>
                <td className="px-6 py-4">
                  {s.score && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-sm font-semibold text-green-600">
                      <span className="h-1.5 w-1.5 text-base rounded-full bg-green-600"></span>
                      Đã có điểm
                    </span>
                  )}
                  {!s.score && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-sm font-semibold text-red-500">
                      <span className="h-1.5 w-1.5 mr-1 text-base rounded-full bg-red-500"></span>
                      Chưa có điểm
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">{s.subject.credit}</td>

                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-sm font-semibold text-blue-600">
                      {s.score ? s.score : "Empty"}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="bg-white flex p-6">
        <span className="text-base text-gray-700 font-semibold mr-6">
          Điểm trung bình học kì :
        </span>
        <span className="text-blue-500 font-bold">{avg}</span>
      </div>
    </div>
  );
};
export default ViewScore;
