"use client";
import { useState } from "react";
import Details from "@/app/components/details";
import Routes from "@/app/components/routes";

export default function Home() {
  const [data, setData] = useState({
    title: "Test Page",
    description: "Test Description",
    host: "localhost:81",
    db: {
      username: "erdodo",
      password: "Erdo112233.",
      host: "nocodedb.sgb5kwt.mongodb.net",
      name: "nocodetest",
    },
    routes: [
      {
        url: "/test",
        method: "post",
        tags: "test",
        description: "",
        summary: "",
      },

      {
        url: "/test",
        method: "get",
        tags: "test",
        description: "",
        summary: "",
      },
    ],
  });
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm flex flex-col">
        <h1 className={"text-3xl"}> 🎆 Simple Node System</h1>
        <Details data={data} setData={setData} />
        <Routes data={data} setData={setData} />
        <div className="flex flex-row items-start justify-items-start text-lg gap-4"></div>
        <button className="bg-green-500 w-full inline-block rounded p-2 mt-3 text-white">
          Save
        </button>
      </div>
      {JSON.stringify(data)}
    </main>
  );
}
