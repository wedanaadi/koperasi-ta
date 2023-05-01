import React from "react";
import { NavLink } from "react-router-dom";
import useStore from "../../../store/useStore";
import NavItemHeader from "./NavItemHeader";

export default function NavItem(props) {
  const dataLogin = useStore((state) => state.dataLogin);
  const { label, icon, to, children, role } = props.item;
  if(!role.includes(dataLogin?.jabatan)) {
    return false;
  }
  if (children) {
    return <NavItemHeader item={props.item} />;
  }

  return (
    <NavLink
      exact="true"
      to={to}
      className={`flex rounded-md p-2 text-white text-sm gap-x-4 items-center hover:bg-third`}
    >
        {icon}
        <span className="flex-1">{label}</span>
    </NavLink>
  );
}
