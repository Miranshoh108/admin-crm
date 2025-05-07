"use client";
import { SidebarType } from "@/types";
import { other_links, sidebarLinks } from "@/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { LogOut } from "lucide-react";
import Cookie from "js-cookie";
import { notificationApi } from "@/shared/generics/notification";
import { SidebarTrigger } from "../ui/sidebar";

const SideBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const notify = notificationApi();

  useEffect(() => {
    const token = Cookie.get("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);
  return (
    <div className=" border-r border-foreground/40 h-full bg-background max-[350px]:">
      <div className="p-4 flex items-center justify-between">
        <h1 className=" font-bold">Admin CRM</h1>
        <SidebarTrigger className="hidden max-[400px]:flex" />
      </div>
      <div className={`p-4 `}>
        <h2 className="font-semibold  mb-4">Menu</h2>
        <ul className="space-y-2">
          {sidebarLinks.map((link: SidebarType) => (
            <li key={link.name} className="cursor-pointer ">
              <Link
                href={link.path}
                className={`flex items-center gap-3 p-2 rounded-lg transition-all border border-transparent cursor-pointer ${
                  pathname === link.path
                    ? "!border-foreground/40  "
                    : "hover:!border-foreground/70 "
                }`}
              >
                <span className="text-xl">{link.icon}</span>
                <span>{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
        <h2 className="font-semibold  my-4">Boshqalar</h2>
        <ul className="space-y-2">
          {other_links.map((link: SidebarType) => (
            <li key={link.name} className="cursor-pointer">
              <Link
                href={link.path}
                className={`flex items-center gap-3 p-2 rounded-lg transition-all border border-transparent cursor-pointer ${
                  pathname === link.path
                    ? "!border-foreground/40  "
                    : "hover:!border-foreground/70 "
                }`}
              >
                <span className="text-xl">{link.icon}</span>
                <span>{link.name}</span>
              </Link>
            </li>
          ))}
          <div
            onClick={() => {
              router.push("/login");
              Cookie.remove("token");
              Cookie.remove("user");
              notify("LogOut");
            }}
            className={`flex items-center cursor-pointer gap-3 p-2 rounded-lg transition-all border border-transparent hover:!border-foreground/70`}
          >
            <LogOut />
            Chiqish
          </div>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
