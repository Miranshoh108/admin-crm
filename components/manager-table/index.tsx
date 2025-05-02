"use client";
import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../ui/badge";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/request";
import { Loader } from "lucide-react";

const ManagerTable = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["managers"],
    queryFn: async () => {
      const res = await api.get("/api/staff/all-managers");
      return res.data.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <ScrollArea className="w-full">
      <table className="min-w-full text-sm text-left table-auto">
        <thead className="bg-gray-100 dark:bg-zinc-900 text-gray-700 dark:text-white border-b">
          <tr>
            <th className="px-4 py-3">#</th>
            <th className="px-4 py-3">First Name</th>
            <th className="px-4 py-3">Last Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Created</th>
            <th className="px-4 py-3">Last Active</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((manager: any, index: number) => (
            <tr key={manager._id} className="border-b hover:bg-muted">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{manager.first_name}</td>
              <td className="px-4 py-2">{manager.last_name}</td>
              <td className="px-4 py-2">{manager.email}</td>
              <td className="px-4 py-2">
                <Badge
                  variant={manager.status === "faol" ? "default" : "secondary"}
                >
                  {manager.status}
                </Badge>
              </td>
              <td className="px-4 py-2">
                {format(new Date(manager.createdAt), "yyyy-MM-dd")}
              </td>
              <td className="px-4 py-2">
                {manager.last_active_date
                  ? format(
                      new Date(manager.last_active_date),
                      "yyyy-MM-dd HH:mm"
                    )
                  : "No Activity"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </ScrollArea>
  );
};

export default ManagerTable;
