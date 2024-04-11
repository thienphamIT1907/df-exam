"use client";

import { Project, SigninResponse } from "@/app/types/common";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Homepage = () => {
  const { push } = useRouter();
  const [accessToken, setAccessToken] = useState("");
  const [data, setData] = useState<Project[] | []>([]);

  useEffect(() => {
    const loginStoraged = localStorage.getItem("login");
    const auth: SigninResponse =
      (loginStoraged && JSON.parse(loginStoraged)) || null;
    if (!auth) {
      push("/signin");
    }
    setAccessToken(auth?.access_token);
  }, [push]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/getProjects", {
        method: "GET",
        headers: {
          accessToken,
        },
      });

      const data = await response.json();
      setData(data.results);
    };
    fetchData();
  }, [accessToken]);

  return (
    <div className="">
      {data?.length > 0 &&
        data?.map((item) => <div key={item?.id}>{item.project_name}</div>)}
    </div>
  );
};

export default Homepage;
