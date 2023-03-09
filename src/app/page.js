"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";
export default function Home() {
  useEffect(() => {
    if (sessionStorage.getItem("access_token")) {
      return redirect("/dashboard");
    } else return redirect("/auth/login");
  }, []);
}
