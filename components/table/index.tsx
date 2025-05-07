"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { User } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Myaxios } from "@/request/axios";
import { Skeleton } from "../ui/skeleton";
import { notificationApi } from "@/shared/generics/notification";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const TableComponent = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["ashb"],
    queryFn: () =>
      Myaxios.get("/api/staff/all-managers").then((res) => res.data.data),
  });
  const notify = notificationApi();

  return (
    <div className=" p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 ">
        Foydalanuvchilar ro&apos;yxati
      </h2>

      {/* Table */}
      <Table>
        <TableHeader className="">
          <TableRow>
            <TableHead className="text-sm">Ism</TableHead>
            <TableHead className="text-sm">Familiya</TableHead>
            <TableHead className="text-sm">Email</TableHead>
            <TableHead className="text-sm">Rol</TableHead>
            <TableHead className="text-sm">Holat</TableHead>
            <TableHead className="text-sm text-center">
              Amallar
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {!isLoading && !isError
            ? data?.map((user: User) => (
                <TableRow key={user._id} className="border-b">
                  <TableCell className="py-4 text-sm ">
                    {user.first_name}
                  </TableCell>
                  <TableCell className="py-4 text-sm ">
                    {user.last_name}
                  </TableCell>
                  <TableCell className="py-4 text-sm ">
                    {user.email}
                  </TableCell>
                  <TableCell className="py-4 text-sm  capitalize">
                    {user.role}
                  </TableCell>
                  <TableCell className="py-4 text-sm ">
                    {user.status}
                  </TableCell>
                  <TableCell className="py-4 text-right flex justify-center space-x-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0 hover:bg-gray-100"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Tahrirlash</DropdownMenuItem>
                        <DropdownMenuItem>O&apos;chirish</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            : Array(10)
                .fill(1)
                .map((_, idx) => (
                  <TableRow key={idx} className="border-b hover:bg-gray-50">
                    <TableCell>
                      <Skeleton className="h-5 w-full bg-gray-200" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-full bg-gray-200" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-full bg-gray-200" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-full bg-gray-200" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-full bg-gray-200" />
                    </TableCell>
                    <TableCell className="text-right">
                      <Skeleton className="h-5 w-12 bg-gray-200" />
                    </TableCell>
                  </TableRow>
                ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableComponent;
