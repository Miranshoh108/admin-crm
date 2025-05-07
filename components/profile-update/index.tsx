"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "@/components/ui/button";
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
import { useEditProfileMutaion } from "@/request/mutation";
import Cookies from "js-cookie";
import { User } from "@/types";
import { Myaxios } from "@/request/axios";
import { Loader } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email("To‘g‘ri email kiriting").min(5),
  last_name: z.string().min(5),
  first_name: z.string().min(5),
});

const edit_passwordSchema = z.object({
  current_password: z.string().min(8),
  new_password: z.string().min(8),
});

export interface EditProfileType {
  first_name: string;
  last_name: string;
  email: string;
}

interface ProfileToolsProps {
  setUserInfo: React.Dispatch<React.SetStateAction<Partial<User>>>;
  userInfo: Partial<User>;
}

const Profile_tools = ({ setUserInfo, userInfo }: ProfileToolsProps) => {
  const { mutate } = useEditProfileMutaion();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openEditPassword, setOpenEditPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
    },
  });

  const edit_form = useForm<z.infer<typeof edit_passwordSchema>>({
    resolver: zodResolver(edit_passwordSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
    },
  });

  const userCookie = Cookies.get("user");

  const addAdmin = (values: z.infer<typeof formSchema>) => {
    mutate(values, {
      onSuccess() {
        setOpen(false);
        form.reset();
      },
    });

    if (userCookie) {
      const profile = JSON.parse(userCookie);
      Cookies.set("user", JSON.stringify({ ...profile, ...values }));
      setUserInfo({
        ...userInfo,
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
      });
    }
  };

  const editPassword = (values: z.infer<typeof edit_passwordSchema>) => {
    setLoading(true);
    Myaxios.post("/api/auth/edit-password", values).then((res) => {
      toast.success(res.data?.message);
      setOpenEditPassword(false);
      edit_form.reset();
      setLoading(false);
    });
  };

  return (
    <div className="flex items-center gap-6">
      <Button
        onClick={() => {
          setOpenEditPassword(true);
        }}
        size="sm"
        className="text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md transition duration-300"
      >
        O'zgartirish
      </Button>

      <Button
        onClick={() => {
          const userCookie = Cookies.get("user");
          if (userCookie) {
            const profile = JSON.parse(userCookie); // 👈 parse cookie if it's JSON
            form.reset({
              first_name: profile.first_name || "",
              last_name: profile.last_name || "",
              email: profile.email || "",
            });
          }
          setOpen(true);
        }}
        size="sm"
        className="text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md transition duration-300"
      >
        Taxrirlash
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-white rounded-lg shadow-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Edit Profile
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(addAdmin)}
              className="grid gap-6 py-6 px-4"
            >
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-600">First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="First name"
                        {...field}
                        className="border-gray-300"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-600">Last Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Last name"
                        {...field}
                        className="border-gray-300"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-600">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="you@example.com"
                        {...field}
                        className="border-gray-300"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type="submit"
                  className="bg-gray-700 text-white hover:bg-gray-800 px-6 py-2 rounded-md transition duration-300"
                >
                  Save changes
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog open={openEditPassword} onOpenChange={setOpenEditPassword}>
        <DialogContent className="bg-white rounded-lg shadow-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Edit Password
            </DialogTitle>
          </DialogHeader>
          <Form {...edit_form}>
            <form
              onSubmit={edit_form.handleSubmit(editPassword)}
              className="grid gap-6 py-6 px-4"
            >
              <FormField
                control={edit_form.control}
                name="current_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-600">
                      Current Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Current password"
                        {...field}
                        className="border-gray-300"
                      />
                    </FormControl>

                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={edit_form.control}
                name="new_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-600">
                      New Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="New password"
                        {...field}
                        className="border-gray-300"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <DialogFooter>
                {loading ? (
                  <Button className="bg-gray-500 text-white px-6 py-2 rounded-md">
                    <Loader className="animate-spin text-white" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="bg-gray-700 text-white hover:bg-gray-800 px-6 py-2 rounded-md transition duration-300"
                  >
                    Save changes
                  </Button>
                )}
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile_tools;
