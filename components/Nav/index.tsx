"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { IoBugSharp } from "react-icons/io5";
import classNames from "classnames";

const Nav = () => {
  const currentPath = usePathname();

  const menuOpt = [
    {
      label: "Dashboard",
      path: "/",
    },
    {
      label: "Issues",
      path: "/issues",
    },
  ];
  return (
    <nav className="flex border-b space-x-6 mb-5 px-5 h-16 items-center justify-between">
      <div className="logo">
        <IoBugSharp />
      </div>
      <ul className="flex space-x-6">
        {menuOpt.map((item) => (
          <li key={item.label}>
            <Link
              className={classNames({
                "text-zinc-900": item.path === currentPath,
                "text-zinc-500": item.path != currentPath,
                "transition-colors, hover:text-zinc-800": true,
              })}
              href={item.path}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
