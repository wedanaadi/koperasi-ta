import React from "react";

export default function Footer() {
  return (
    <div className="bottom-0 w-full bg-second flex justify-between mt-5 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
      <div className="p-3 sm:flex sm:flex-row sm:justify-between w-full text-center">
        <div>
          <span className="text-slate-700 sm:font-medium">&copy;{new Date().getFullYear() === 2023 ? '2023' : `2023 - ${new Date().getFullYear()}`}, All Right Reserved.</span>
        </div>
        <div>
          <span className="text-slate-700 sm:font-medium">Designed By HTML Codex</span>
        </div>
      </div>
    </div>
  );
}
