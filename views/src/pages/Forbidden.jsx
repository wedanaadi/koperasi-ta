import React from "react";
import { Link, Navigate } from "react-router-dom";

export default function Forbidden() {
  return (
    <main className="h-screen w-full flex flex-col justify-center items-center bg-second">
      <h1 className="text-9xl font-extrabold text-primary tracking-widest">
        403
      </h1>
      <div className="bg-four px-2 text-sm rounded rotate-12 absolute">
        You don't have permission access
      </div>
      <button className="mt-5">
        <Link to={'/'} className="relative inline-block text-sm font-medium text-primary group active:text-primary focus:outline-none focus:ring">
          <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-primary group-hover:translate-y-0 group-hover:translate-x-0" />
          <span className="relative block px-8 py-3 bg-second border border-current">
            Go Home
          </span>
        </Link>
      </button>
    </main>
  );
}
