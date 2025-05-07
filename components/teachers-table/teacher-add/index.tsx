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
import { useAddTeacherMutaion } from "@/request/mutation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  email: z.string().email("To‘g‘ri email kiriting").min(5),
  last_name: z.string().min(5),
  first_name: z.string().min(5),
  password: z.string().min(8),
  phone: z
    .string()
    .min(5)
    .startsWith("+998", { message: "Iltimos O'zbek nomeridan kiring" }),
  field: z.string(),
});

export interface AddTeacherType {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  field: string;
}

const Teacher_tools = () => {
  const { mutate } = useAddTeacherMutaion();
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      phone: "",
      field: "",
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
        className=" px-5 py-2 rounded-full flex items-center gap-2"
      >
        <Plus className="size-4" />
        <span className="max-[620px]:hidden text-sm">Ustoz Qo‘shish</span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="rounded-xl  shadow-2xl border border-gray-200">
          <DialogHeader>
            <DialogTitle className="text-center text-lg font-bold ">
              🧑‍🏫 Yangi Ustozni Qo‘shish
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(addAdmin)}
              className="grid gap-5 py-2"
            >
              {/* 2 ustunli layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ism</FormLabel>
                      <FormControl>
                        <Input
                          className="rounded-xl "
                          placeholder="Ism"
                          {...field}
                        />
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
                        <Input
                          className="rounded-xl"
                          placeholder="Familiya"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        className="rounded-xl border-gray-300 focus:border-purple-500"
                        placeholder="you@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefon raqam</FormLabel>
                    <FormControl>
                      <Input
                        className="rounded-xl border-gray-300 focus:border-purple-500"
                        placeholder="+998901234567"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="field"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Yo‘nalish</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="rounded-xl border-gray-300 focus:border-purple-500">
                          <SelectValue placeholder="Yo‘nalishni tanlang" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Frontend dasturlash">
                          Frontend
                        </SelectItem>
                        <SelectItem value="Backend dasturlash">
                          Backend
                        </SelectItem>
                        <SelectItem value="Rus tili">Rus tili</SelectItem>
                        <SelectItem value="Ingliz tili">Ingliz tili</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parol</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className="rounded-xl border-gray-300 focus:border-purple-500"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="mt-2">
                <Button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-full"
                >
                  Saqlash
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Teacher_tools;
