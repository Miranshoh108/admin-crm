"use client";
import { Myaxios } from "@/request/axios";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { GroupType } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import Group_add_tool from "./group_add";

const GroupComponents = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["groups"],
    queryFn: () =>
      Myaxios.get("/api/group/get-all-group").then((res) => res.data.data),
  });
  return (
    <div>
      <div>
        <div className="flex items-center justify-between  gap-2 ">
          <h2 className="text-xl font-semibold mb-4 max-[525px]:text-lg max-[385px]:text-[16px] max-[355px]:hidden truncate">
            Guruhlar ro&apos;yxati
          </h2>
          <div className="flex items-center gap-4 max-[470px]:gap-2 max-[460px]:  ">
            <Group_add_tool />

            {/* {(params.search?.length ?? 0) > 0 && (
              <Button size="sm" className="mb-4">
                {searchValue !== "" && (
                  <p className="font-medium truncate max-w-[40px]  ">
                    {searchValue}
                  </p>
                )}
                <div
                  onClick={() => {
                    setSearchValue("");
                  }}
                >
                  <X />
                </div>
              </Button>
            )} */}
            {/* <Button
              size="sm"
              className="mb-4"
              onClick={() => setSearch(!search)}
            >
              <Search size={30} />
            </Button> */}
            {/* <div className="mb-4">
              <Select onValueChange={handleSelectChange} value={selectedStatus}>
                <SelectTrigger className="w-fit">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="ta'tilda">Tatilda</SelectItem>
                    <SelectItem value="ishdan bo'shatilgan">Nofaol</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div> */}
          </div>
        </div>
        <Table>
          <TableHeader className="">
            <TableRow>
              <TableHead className=" text-center">No</TableHead>
              <TableHead>Guruh nomi</TableHead>
              <TableHead>Ustoz</TableHead>
              <TableHead className=" text-center">
                O&apos;quvchilar soni
              </TableHead>
              <TableHead>Boshlangan vaqti</TableHead>
              <TableHead>Tugagan vaqti</TableHead>
              <TableHead className=" text-center">Amallar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!isLoading || isError
              ? data?.map((group: GroupType, idx: number) => (
                  <TableRow key={group._id ? group._id : idx}>
                    <TableCell className="text-center">{idx + 1}</TableCell>
                    <TableCell className="">{group.name}</TableCell>
                    <TableCell>
                      {group.teacher.first_name + " " + group.teacher.last_name}
                    </TableCell>
                    <TableCell className="capitalize text-center ">
                      {group.students?.length ?? 0}
                    </TableCell>
                    <TableCell>
                      {new Date(group.started_group).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {group.end_group == null
                        ? "Davom etmoqda"
                        : new Date(group.end_group).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-center space-x-2 flex justify-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild className="">
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              // setSelectedUser(user);
                              // form.setValue("email", user.email);
                              // form.setValue("last_name", user.last_name);
                              // form.setValue("first_name", user.first_name);
                              // setOpen(true);
                            }}
                          >
                            Tahrirlash
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {}}>
                            O&apos;chirish
                          </DropdownMenuItem>
                          {/* {user.status == "ta'tilda" && (
                            <DropdownMenuItem
                              onClick={() => tatildanChiqish(user._id)}
                            >
                              Tatildan chiqrish
                            </DropdownMenuItem>
                          )} */}
                          {/* <DropdownMenuItem
                            className={`${user.status == "faol" && "hidden"} ${
                              user.status == "ta'tilda" && "hidden"
                            }`}
                            onClick={() => Hiring(user._id)}
                          >
                            Ishga qaytarish
                          </DropdownMenuItem> */}
                          <DropdownMenuItem
                            onClick={() => {
                              // Info({ _id: user._id });
                            }}
                          >
                            Info
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              : Array(10)
                  .fill(1)
                  .map((_, idx) => (
                    <TableRow key={idx}>
                      <TableCell>
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild className="">
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Tahrirlash</DropdownMenuItem>
                            <DropdownMenuItem>O&apos;hirish</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default GroupComponents;
