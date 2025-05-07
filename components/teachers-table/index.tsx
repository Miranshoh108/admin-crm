"use client";
import React, { FormEvent, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Search, X } from "lucide-react";
import { User } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Myaxios } from "@/request/axios";
import { Skeleton } from "../ui/skeleton";
import Cookies from "js-cookie";
import { Dialog, DialogContent, DialogTitle, DialogHeader } from "../ui/dialog";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Teacher_tools from "./teacher-add";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Params = {
  status?: string;
  search?: string;
};
const TeachersTableComponent = () => {
  const [search, setSearch] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const params: Params = {};
  if (selectedStatus !== "all") {
    params.status = selectedStatus;
  }
  if (searchValue.trim() !== "") {
    params.search = searchValue.trim();
  }
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["admins"],
    queryFn: async () => {
      const res = await Myaxios.get(
        "/api/teacher/get-all-teachers",
        Object.keys(params).length > 0 ? { params } : {}
      );
      const teachers = res.data.data;
      return Array.isArray(teachers) ? teachers : [];
    },
   
  });
 
  const userCookie = Cookies.get("user");
  const user = userCookie ? JSON.parse(userCookie) : null;
  const delteAdmin = (id: string) => {
    Myaxios.delete("/api/teacher/fire-teacher", {
      data: { _id: id },
    }).then(() => {
      toast.success("Siz Ustozni ishdan boshatdingiz!");
      refetch();
    });
  };
  const hiring = (id: string) => {
    Myaxios.post("api/teacher/return-teacher", { _id: id }).then((res) => {
      refetch();
      console.log(res.data);
    });
  };
  //   const tatilFn = () => {};
  const handleSelectChange = (value: string) => {
    setSelectedStatus(value);
  };
  useEffect(() => {
    refetch();
  }, [selectedStatus, refetch]);

  const SearchFn = (e: FormEvent) => {
    e.preventDefault();
    setSearch(false);
    refetch();
  };
  useEffect(() => {
    if (searchValue.trim() === "") {
      refetch();
    }
  }, [searchValue, refetch]);
  return (
    <div className=" relative">
      <div className="flex !items-center justify-between  gap-2 ">
        <h2 className="text-xl font-semibold mb-4 max-[525px]:text-lg max-[385px]:text-[16px] max-[355px]:hidden truncate">
          Ustozlar ro&apos;yxati
        </h2>
        <div className="flex !items-center gap-4 max-[470px]:gap-2 max-[460px]:  ">
          {(params.search?.length ?? 0) > 0 && (
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
          )}
          <Button size="sm" className="mb-4 " onClick={() => setSearch(!search)}>
            <Search size={30} />
          </Button>
          {(user?.role == "manager" || "admin") && <Teacher_tools />}
          <div className="mb-4">
            <Select onValueChange={handleSelectChange} value={selectedStatus}>
              <SelectTrigger className="w-fit">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="ta'tilda">Tatilda</SelectItem>
                  <SelectItem value="faol">Faol</SelectItem>
                  <SelectItem value="ishdan bo'shatilgan">Nofaol</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ism</TableHead>
            <TableHead>Familiya</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Holat</TableHead>
            <TableHead className="text-center">Amallar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!isLoading && !isError && data
            ? data?.map((user: User, idx: number) => (
                <TableRow key={user?._id ? user._id : idx}>
                  <TableCell>{user.first_name}</TableCell>
                  <TableCell>{user.last_name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  {/* <TableCell className="capitalize">{user.role}</TableCell> */}
                  <TableCell>{user.status}</TableCell>
                  <TableCell className="text-right space-x-2 flex justify-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild className="">
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        
                        <DropdownMenuItem onClick={() => delteAdmin(user._id)}>
                          O&apos;chirish
                        </DropdownMenuItem>
                        
                        {user.status == "ta'tilda" && (
                          <DropdownMenuItem>Tatildan chiqrish</DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          className={`${user.status == "faol" && "hidden"} ${
                            user.status == "ta'tilda" && "hidden"
                          }`}
                          onClick={() => hiring(user._id)}
                        >
                          Ishga qaytarish
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            router.push(`/teachers/${user._id}`);
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
     

      {/* search */}
      <Dialog open={search} onOpenChange={setSearch}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={SearchFn} className="flex flex-col gap-5">
            <Input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              type="text"
            />
            <Button type="submit">Save changes</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default TeachersTableComponent;
