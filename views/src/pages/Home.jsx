import React, { useState } from "react";
import Sidebar from "./Layout/Sidebar";
import Menubar from "./Layout/Menubar";
import Content from "./Layout/Content";
import Footer from "./Layout/Footer";
import useStore from "../store/useStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Home() {
  const [open, setOpen] = useState(true);
  const tokenLogin = useStore((state) => state.token);
  const navigasi = useNavigate()
  const toggleSidebar = () => {
    setOpen(!open);
  }

  return (
    <div className="flex flex-row w-full min-h-screen">
      <button
        className="fixed z-[999] bottom-10 right-8 bg-primary w-10 h-10 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-third duration-300"
        onClick={toggleSidebar}
      >
        <span>
          <svg
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="h-6 w-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
            ></path>
          </svg>
        </span>
      </button>
      <Sidebar open={open} />
      <div className={`bg-four flex flex-col w-full overflow-x-auto duration-500 ${open && 'ml-48 lg:ml-60'}`}>
        <Menubar />
        <Content />
        <Footer />
      </div>
    </div>
  );
}
