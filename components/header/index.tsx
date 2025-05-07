"use client";
import React, { useEffect, useState } from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { usePathname, useRouter } from "next/navigation";
import { ChevronRight, CircleUser, Users } from "lucide-react";
import { DarkMode } from "../darkModeChange";
import Cookies from "js-cookie";
import { User } from "@/types";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<User | null>(null);

  useEffect(() => {
    const cookie = Cookies.get("user");
    if (cookie) {
      try {
        const parsed = JSON.parse(cookie);
        setUserInfo(parsed);
      } catch (err) {
        console.error("Cookie parsing error", err);
      }
    }
  }, []);

  const formattedPath =
    pathname === "/"
      ? "Asosiy"
      : pathname.slice(1, 2).toUpperCase() + pathname.slice(2);

  return (
    <header className="w-full px-4 py-3 border-b border-border bg-background flex items-center justify-between shadow-sm">
      {/* Left: Navigation + Path */}
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div className="hidden sm:flex items-center gap-2 text-muted-foreground font-medium text-sm">
          <Link href="/" className="hover:text-primary transition-colors">
            Asosiy
          </Link>
          {pathname !== "/" && (
            <>
              <ChevronRight size={18} />
              <span
                onClick={() => router.back()}
                className="hover:text-primary cursor-pointer"
              >
                {formattedPath}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Right: Theme + User */}
      <div className="flex items-center gap-4">
        <DarkMode />
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-foreground max-sm:text-xs max-[370px]:hidden">
              {userInfo?.first_name} {userInfo?.last_name}
            </p>
            {userInfo?.role && (
              <p className="text-xs text-muted-foreground flex items-center justify-end gap-1 max-[370px]:hidden">
                <Users size={14} />
                {userInfo.role.charAt(0).toUpperCase() + userInfo.role.slice(1)}
              </p>
            )}
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden border border-muted">
            {userInfo?.image ? (
              <Image
                src={userInfo.image}
                alt="User avatar"
                width={40}
                height={40}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
                <CircleUser size={28} />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
