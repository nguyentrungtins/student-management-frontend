"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import jwt_decode from "jwt-decode";
import BeatLoader from "react-spinners/BeatLoader";
import axios from "axios";

function AppWrap({ children }) {
  const router = useRouter();
  const [isAuthentication, setIsAuthentication] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = sessionStorage.getItem("access_token");
    if (!token && router.pathname !== "auth/login") {
      router.push("/auth/login");
    } else {
      const { exp } = jwt_decode(token);
      var dateNow = new Date();
      if (exp * 1000 > dateNow.getTime()) {
        if (
          sessionStorage.getItem("role") == "Admin" &&
          !window.location.pathname.includes("admin")
        ) {
          router.push("/admin");
        } else {
          if (
            sessionStorage.getItem("role") == "Student" &&
            !window.location.pathname.includes("dashboard")
          ) {
            router.push("/dashboard");
          } else {
            setLoading(false);
          }
        }
        //console.log(window.a)
        if (!window.a) {
          window.a = setInterval(() => {
            //const { exp } = jwt_decode(response.data.access_token);
            var dateNow = new Date();
            if (false) {
              console.log("Còn hạn sử dụng...");
            } else {
              // gọi axios tìm đến chỗ dể lấy token mới
              /*axios
              .get("http://localhost:3030/auth/refresh", {
                headers: {
                  Authorization: `Bearer ${sessionStorage.getItem(
                    "refresh_token"
                  )}`,
                },
              })
              .then((res) => {
                console.log(res.data);
                sessionStorage.setItem("access_token", res.data.access_token);
                sessionStorage.setItem("refresh_token", res.data.refresh_token);
              });*/
              console.log("Hết hạn dùng")
            }
          }, 5200);
        }
      } else {
        router.push("/auth/login");
      }
    }
  }, [isAuthentication]);
  return (
    <div>
      {!loading ? (
        children
      ) : (
        <BeatLoader
          color="#36d7b7"
          size={25}
          loading={loading}
          cssOverride={{
            margin: "25% 47%",
            display: "block",
          }}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
    </div>
  );
}

export default AppWrap;
