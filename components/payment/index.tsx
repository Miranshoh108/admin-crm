// PaymentsModal.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader, Plus, X } from "lucide-react";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import useDebounce from "@/shared/generics/debounse";
import { Myaxios } from "@/request/axios";
import { toast } from "sonner";

const formSchema = z.object({
  student_id: z.string().min(1, "Talaba tanlanishi kerak"),
  group_id: z.string().min(1, "Guruh tanlanishi kerak"),
  payment_price: z.string().min(1, "To'lov miqdori kiritilishi kerak"),
  month: z.string().min(1, "Oy tanlanishi kerak"),
  method: z.enum(["naqd", "karta"]),
  paidAt: z.string().min(1, "Sana tanlanishi kerak"),
});

interface StudentType {
  _id: string;
  first_name: string;
  last_name: string;
  phone: string;
}

interface GroupType {
  _id: string;
  name: string;
  course: {
    name: string;
  };
  price: number;
}

export const PaymentsModal = ({ refetch }: { refetch: () => void }) => {
  const [open, setOpen] = useState(false);
  const [studentSearch, setStudentSearch] = useState("");
  const [groupSearch, setGroupSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<StudentType | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<GroupType | null>(null);
  const debouncedStudentSearch = useDebounce(studentSearch, 500);
  const debouncedGroupSearch = useDebounce(groupSearch, 500);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      student_id: "",
      group_id: "",
      payment_price: "",
      month: format(new Date(), "yyyy-MM"),
      method: "naqd",
      paidAt: format(new Date(), "yyyy-MM-dd"),
    },
  });

  const { data: students = [], isLoading: isStudentsLoading } = useQuery<StudentType[]>({
    queryKey: ["search-student", debouncedStudentSearch],
    queryFn: async () => {
      if (!debouncedStudentSearch) return [];
      const response = await Myaxios.get("/api/payment/search-student", {
        params: { name: debouncedStudentSearch },
      });
      return response.data.data;
    },
    enabled: !!debouncedStudentSearch,
  });

  const { data: groups = [], isLoading: isGroupsLoading } = useQuery<GroupType[]>({
    queryKey: ["search-group", debouncedGroupSearch],
    queryFn: async () => {
      if (!debouncedGroupSearch) return [];
      const response = await Myaxios.get("/api/student/search-group", {
        params: { name: debouncedGroupSearch },
      });
      return response.data.data;
    },
    enabled: !!debouncedGroupSearch,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) =>
      Myaxios.post("/api/payment/payment-student", values),
    onSuccess: () => {
      setOpen(false);
      form.reset();
      setSelectedStudent(null);
      setSelectedGroup(null);
      setStudentSearch("");
      setGroupSearch("");
      refetch();
      toast.success("payment-susces")
    },
    onError: (error) => {
      console.error("Error creating payment:", error);
        toast.error("payment-error")
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)} className="flex items-center gap-2 mt-5">
        <Plus size={16} />
        <p className="max-[620px]:hidden">To‘lov qo‘shish</p>
      </Button>


      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Yangi to‘lov qo‘shish</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Student Selection */}
              <FormField
                control={form.control}
                name="student_id"
                render={() => (
                  <FormItem>
                    <FormLabel>Talaba</FormLabel>
                    <FormControl>
                      <div>
                        {selectedStudent ? (
                          <div className="flex items-center justify-between gap-2">
                            <Input
                              className="w-full"
                              readOnly
                              value={`${selectedStudent.first_name} ${selectedStudent.last_name} (${selectedStudent.phone})`}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setSelectedStudent(null);
                                setStudentSearch("");
                                form.setValue("student_id", "");
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <Input
                              placeholder="Talaba ismi bilan qidiring..."
                              value={studentSearch}
                              onChange={(e) => setStudentSearch(e.target.value)}
                            />
                            {isStudentsLoading && studentSearch && (
                              <div className="text-sm text-muted-foreground p-2">
                                Qidirilmoqda...
                              </div>
                            )}
                            {students && students.length > 0 && (
                              <div className="border rounded-md max-h-60 overflow-y-auto">
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>Ism</TableHead>
                                      <TableHead>Familiya</TableHead>
                                      <TableHead>Telefon</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {students.map((student) => (
                                      <TableRow
                                        key={student._id}
                                        onClick={() => {
                                          setSelectedStudent(student);
                                          form.setValue("student_id", student._id);
                                          setStudentSearch("");
                                        }}
                                        className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                                      >
                                        <TableCell>{student.first_name}</TableCell>
                                        <TableCell>{student.last_name}</TableCell>
                                        <TableCell>{student.phone}</TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </div>
                            )}

                            {!isStudentsLoading && studentSearch && students.length === 0 && (
                              <div className="text-sm text-muted-foreground p-2">
                                Talaba topilmadi
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Group Selection */}
              <FormField
                control={form.control}
                name="group_id"
                render={() => (
                  <FormItem>
                    <FormLabel>Guruh</FormLabel>
                    <FormControl>
                      <div>
                        {selectedGroup ? (
                          <div className="flex items-center justify-between gap-2">
                            <Input
                              className="w-full"
                              readOnly
                              value={`${selectedGroup.name}`}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setSelectedGroup(null);
                                setGroupSearch("");
                                form.setValue("group_id", "");
                                form.setValue("payment_price", "");
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <Input
                              placeholder="Guruh nomi bilan qidiring..."
                              value={groupSearch}
                              onChange={(e) => setGroupSearch(e.target.value)}
                            />
                            {isGroupsLoading && groupSearch && (
                              <div className="text-sm text-muted-foreground p-2">
                                Qidirilmoqda...
                              </div>
                            )}
                            {groups && groups.length > 0 && (
                              <div className="border rounded-md max-h-60 overflow-y-auto">
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>Nomi</TableHead>
                                      <TableHead>Kurs</TableHead>
                                      <TableHead>Narxi</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {groups.map((group) => (
                                      <TableRow
                                        key={group._id}
                                        onClick={() => {
                                          setSelectedGroup(group);
                                          form.setValue("group_id", group._id);
                                          form.setValue("payment_price", group.price.toString());
                                          setGroupSearch("");
                                        }}
                                        className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                                      >
                                        <TableCell>{group.name}</TableCell>
                                        <TableCell>{group.course.name}</TableCell>
                                        <TableCell>{group.price} so‘m</TableCell>
                                      </TableRow>

                                    ))}
                                  </TableBody>
                                </Table>
                              </div>
                            )}
                            {!isGroupsLoading && groupSearch && groups.length === 0 && (
                              <div className="text-sm text-muted-foreground p-2">
                                Guruh topilmadi
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Payment Details */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="payment_price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>To‘lov miqdori</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="To'lov miqdori"
                          type="number"
                          {...field}
                          disabled={!!selectedGroup}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="month"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Oy</FormLabel>
                      <FormControl>
                        <Input type="month" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="method"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>To‘lov usuli</FormLabel>
                      <FormControl>
                        <select
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          {...field}
                        >
                          <option value="naqd">Naqd</option>
                          <option value="click">Click</option>
                          <option value="payme">Payme</option>
                          <option value="bank">Bank orqali</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="paidAt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sana</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>


              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setOpen(false);
                    setSelectedStudent(null);
                    setSelectedGroup(null);
                    setStudentSearch("");
                    setGroupSearch("");
                  }}
                >
                  Bekor qilish
                </Button>
                <Button type="submit" disabled={isPending}>
                  {isPending ? (
                    <span className="flex items-center gap-2">
                      <Loader className="animate-spin h-4 w-4" />
                      Saqlanmoqda...
                    </span>
                  ) : (
                    "Saqlash"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
