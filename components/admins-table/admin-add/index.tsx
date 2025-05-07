"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from "../../ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAddAdminMutaion } from "@/request/mutation";
const formSchema = z.object({
  email: z.string().email("To‘g‘ri email kiriting").min(5),
  last_name: z.string().min(5),
  first_name: z.string().min(5),
  role: z.string(),
  password: z.string().min(8),
  work_date: z.string().min(5),
  active: z.boolean(),
  is_deleted: z.boolean(),
});
export interface AddType {
  first_name: string;
  last_name: string;
  role: string;
  email: string;
  password: string;
  work_date: string;
  active: boolean;
  is_deleted: boolean;
}
const Admin_tools = () => {
  const { mutate } = useAddAdminMutaion();
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      role: "",
      email: "",
      password: "",
      work_date: new Date().toISOString().split("T")[0].toString(),
      active: true,
      is_deleted: false,
    },
  });
  const addAdmin = (values: z.infer<typeof formSchema>) => {
    mutate(values, {
      onSuccess() {
        setOpen(false);
        form.reset();
      },
    });
  };
  return (
    <div className="flex items-center gap-4">
      <Button
        onClick={() => setOpen(!open)}
        className="mb-4 flex items-center justify-center gap-2 "
        size="sm"
      >
        <Plus className="w-4 h-4" />
        <span className="max-[620px]:hidden">Admin Qo'shish</span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="rounded-xl shadow-lg max-w-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center">
              Yangi Admin Qo‘shish
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(addAdmin)}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {/* First Name */}
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Ism</FormLabel>
                    <FormControl>
                      <Input placeholder="Ism" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              {/* Last Name */}
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Familiya</FormLabel>
                    <FormControl>
                      <Input placeholder="Familiya" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel className="font-semibold">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="admin@example.com" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              {/* Role */}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Role</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Birini tanlang" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="manager">Manager</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Parol</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="*******" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              <div className="md:col-span-2 flex justify-end mt-4">
                <DialogFooter>
                  <Button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Saqlash
                  </Button>
                </DialogFooter>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin_tools;
