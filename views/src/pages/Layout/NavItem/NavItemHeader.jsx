import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { BsChevronDown } from "react-icons/bs";

const resolveLinkPath = (childTo, parentTo) => `${parentTo}/${childTo}`;

export default function NavItemHeader(props) {
  const { item } = props;
  const { label, icon, to: headerToPath, children } = item;

  const location = useLocation();

  const [expanded, setExpand] = useState(
    location.pathname.includes(headerToPath)
  );

  const onExpandChange = (e) => {
    e.preventDefault();
    setExpand((expanded) => !expanded);
  };

  return (
    <>
      <button
        className={`flex w-full rounded-md p-2 text-white text-sm items-center gap-x-4 hover:bg-third`}
        onClick={onExpandChange}
      >
        <div className="w-full flex gap-x-4 items-center">
          {icon}
          <span>{label}</span>
        </div>
        <BsChevronDown className={`${expanded && "rotate-180"} float-right`} />
      </button>

      {expanded && (
        <div>
          {children.map((item, index) => {
            const key = `${item.label}-${index}`;
            const { label, icon, children } = item;

            if (children) {
              return (
                <div key={key}>
                  <NavItemHeader
                    item={{
                      ...item,
                      to: resolveLinkPath(item.to, props.item.to),
                    }}
                  />
                </div>
              );
            }

            return (
              <NavLink
                key={index}
                to={resolveLinkPath(item.to, props.item.to)}
                className="flex px-5 rounded-md text-center text-sm text-gray-200 py-1 hover:bg-third"
              >
                {/* {item.icon} */}
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      )}
    </>
  );
}
