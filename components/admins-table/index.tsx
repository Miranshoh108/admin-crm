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
import {
  deleteAdminCase,
  useEditMutation,
  useTatildaMutaion,
} from "@/request/mutation";
import Cookies from "js-cookie";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from "../ui/dialog";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Admin_tools from "./admin-add";
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
import { toast } from "sonner";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const formSchema = z.object({
  email: z.string().email("To‘g‘ri email kiriting").min(5),
  last_name: z.string().min(5),
  first_name: z.string().min(5),
});

const tatilSchema = z.object({
  start_date: z.string(),
  end_date: z.string(),
  reason: z.string().min(5),
});

type Params = {
  status?: string;
  search?: string;
};

const AdminsTableComponent = () => {
  const { mutate } = useEditMutation();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [tatil, setTatil] = useState({ bool: false, id: "" });
  const [info, setInfo] = useState<boolean>(false);
  const [userinfo, setUserInfo] = useState<User>();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const deleteAdminCas = deleteAdminCase();
  const { mutate: tatilMutate } = useTatildaMutaion();
  const userCookie = Cookies.get("user");
  const user = userCookie ? JSON.parse(userCookie) : null;
  const params: Params = {};

  if (selectedStatus !== "all") {
    params.status = selectedStatus;
  }

  if (searchValue.trim() !== "") {
    params.search = searchValue.trim();
  }

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["admins"],
    queryFn: () =>
      Myaxios.get(
        "/api/staff/all-admins",
        Object.keys(params).length > 0 ? { params } : {}
      ).then((res) => res.data.data),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      last_name: "",
      first_name: "",
    },
  });

  const tatilForm = useForm<z.infer<typeof tatilSchema>>({
    resolver: zodResolver(tatilSchema),
    defaultValues: {
      start_date: "",
      end_date: "",
      reason: "",
    },
  });

  const editAdmin = (values: z.infer<typeof formSchema>) => {
    mutate(
      {
        ...values,
        _id: selectedUser?._id,
        status: selectedUser?.status,
      },
      {
        onSuccess() {
          setOpen(false);
          form.reset();
        },
      }
    );
  };

  const delteAdmin = (data: User) => {
    Myaxios({
      url: "/api/staff/deleted-admin",
      data: { _id: data?._id },
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }).then(() => {
      deleteAdminCas(data);
      refetch();
    });
  };

  const tatilFn = (values: z.infer<typeof tatilSchema>) => {
    tatilMutate(
      { ...values, _id: tatil.id },
      {
        onSuccess() {
          setTatil({ bool: false, id: "" });
          tatilForm.reset();
          refetch();
        },
      }
    );
  };

  const tatildanChiqish = (id: string) => {
    Myaxios.post("/api/staff/leave-exit-staff", { _id: id }).then(() =>
      refetch()
    );
  };

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

  const Hiring = (id: string) => {
    Myaxios.post("/api/staff/return-work-staff", { _id: id }).then(() => {
      toast.success("Ishga qaytarishdingiz");
      refetch();
    });
  };

  const Info = ({ _id }: { _id: string }) => {
    Myaxios.get(`/api/staff/info/${_id}`)
      .then((res) => {
        setUserInfo(res.data.data);
        setInfo(true);
      })
      .catch(() => toast.error("Nimadur xato boshqatdan urinib koring!"));
  };

  return (
    <div className="p-6 space-y-6  rounded-xl shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-bold tracking-tight ">
          👨‍💼 Adminlar Ro'yxati
        </h2>

        <div className="flex flex-wrap gap-3 items-center">
          <form
            onSubmit={SearchFn}
            className="flex items-center gap-2 border rounded-full px-3 py-1 shadow-sm"
          >
            <Search className="text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Qidiruv..."
              className="outline-none bg-transparent text-sm"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            {searchValue && (
              <X
                onClick={() => setSearchValue("")}
                className="cursor-pointer text-gray-400 hover:text-red-500 transition"
                size={18}
              />
            )}
          </form>

          <Select onValueChange={handleSelectChange} value={selectedStatus}>
            <SelectTrigger className="w-[140px] rounded-full shadow-sm">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">Barchasi</SelectItem>
                <SelectItem value="ta'tilda">Ta'tilda</SelectItem>
                <SelectItem value="ishdan bo'shatilgan">Nofaol</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {user?.role === "manager" && <Admin_tools />}
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg shadow border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ism</TableHead>
              <TableHead>Familiya</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Holat</TableHead>
              <TableHead className="text-center">⚙️ Amallar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array(8)
                .fill(0)
                .map((_, idx) => (
                  <TableRow key={idx}>
                    {Array(6)
                      .fill(0)
                      .map((_, i) => (
                        <TableCell key={i}>
                          <Skeleton className="h-5 w-full" />
                        </TableCell>
                      ))}
                  </TableRow>
                ))
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={6}>Xatolik yuz berdi...</TableCell>
              </TableRow>
            ) : (
              data?.map((user: User, idx: number) => (
                <TableRow key={user._id || idx}>
                  <TableCell>{user.first_name}</TableCell>
                  <TableCell>{user.last_name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="capitalize">{user.role}</TableCell>
                  <TableCell>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.status === "faol"
                          ? "bg-green-100 text-green-700"
                          : user.status === "ta'tilda"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="text-sm">
                        <DropdownMenuItem onClick={() => delteAdmin(user)}>
                          🗑️ O'chirish
                        </DropdownMenuItem>
                        {user.status === "faol" && (
                          <DropdownMenuItem
                            onClick={() =>
                              setTatil({ bool: true, id: user._id })
                            }
                          >
                            🏖️ Ta'tilga chiqarish
                          </DropdownMenuItem>
                        )}
                        {user.status === "ta'tilda" && (
                          <DropdownMenuItem
                            onClick={() => tatildanChiqish(user._id)}
                          >
                            🔙 Tatildan chiqish
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => Info(user)}>
                          📝 Ma'lumotlar
                        </DropdownMenuItem>
                        {user.status === "ishdan bo'shatilgan" && (
                          <DropdownMenuItem onClick={() => Hiring(user._id)}>
                            💼 Ishga qaytarish
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adminni tahrirlash</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(editAdmin)} className="space-y-4">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ism</FormLabel>
                    <FormControl>
                      <Input placeholder="Ism" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Familiya</FormLabel>
                    <FormControl>
                      <Input placeholder="Familiya" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Saqlash</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Tatil Dialog */}
      <Dialog
        open={tatil.bool}
        onOpenChange={() => setTatil({ bool: false, id: "" })}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ta'tilga chiqarish</DialogTitle>
          </DialogHeader>
          <Form {...tatilForm}>
            <form
              onSubmit={tatilForm.handleSubmit(tatilFn)}
              className="space-y-4"
            >
              <FormField
                control={tatilForm.control}
                name="start_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Boshlanish sanasi</FormLabel>
                    <FormControl>
                      <Input placeholder="Boshlanish sanasi" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={tatilForm.control}
                name="end_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tugash sanasi</FormLabel>
                    <FormControl>
                      <Input placeholder="Tugash sanasi" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={tatilForm.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sabab</FormLabel>
                    <FormControl>
                      <Input placeholder="Sabab" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Ta'tilga chiqarish</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminsTableComponent;
