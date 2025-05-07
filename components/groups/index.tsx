// GroupComponents.tsx
"use client";
import { Myaxios } from "@/request/axios";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { GroupType } from "@/types";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import Group_add_tool from "./group_add";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

const GroupComponents = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["groups"],
    queryFn: () =>
      Myaxios.get("/api/group/get-all-group").then((res) => res.data.data),
  });

  return (
    <div className="p-5">
      <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
        <h2 className="text-2xl font-semibold tracking-tight">
          Guruhlar ro&apos;yxati
        </h2>
        <Group_add_tool />
      </div>

      <div className="w-full overflow-x-auto rounded-xl border border-neutral-300">
        <table className="w-full text-left text-sm font-medium border-separate border-spacing-y-2">
          <thead>
            <tr className=" uppercase tracking-wider text-xs">
              <th className="px-4 py-2 text-center">#</th>
              <th className="px-4 py-2">Guruh nomi</th>
              <th className="px-4 py-2">Ustoz</th>
              <th className="px-4 py-2 text-center">O'quvchilar</th>
              <th className="px-4 py-2">Boshlanish</th>
              <th className="px-4 py-2">Tugash</th>
              <th className="px-4 py-2 text-center">Amal</th>
            </tr>
          </thead>
          <tbody>
            {!isLoading && !isError
              ? data?.map((group: GroupType, idx: number) => (
                  <tr
                    key={group._id || idx}
                    className="border border-neutral-300 rounded-lg shadow-sm"
                  >
                    <td className="px-4 py-3 text-center">{idx + 1}</td>
                    <td className="px-4 py-3">{group.name}</td>
                    <td className="px-4 py-3">
                      {group.teacher.first_name + " " + group.teacher.last_name}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {group.students?.length ?? 0}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {new Date(group.started_group).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {group.end_group
                        ? new Date(group.end_group).toLocaleDateString()
                        : "Davom etmoqda"}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Tahrirlash</DropdownMenuItem>
                          <DropdownMenuItem>O&apos;chirish</DropdownMenuItem>
                          <DropdownMenuItem>Info</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              : Array(8)
                  .fill(1)
                  .map((_, idx) => (
                    <tr
                      key={idx}
                      className="border border-neutral-200 rounded-lg"
                    >
                      {Array(7)
                        .fill(0)
                        .map((_, i) => (
                          <td key={i} className="px-4 py-3">
                            <Skeleton className="h-5 w-full" />
                          </td>
                        ))}
                    </tr>
                  ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GroupComponents;
