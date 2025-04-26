"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React from "react";
import { useLoginMutation } from "@/request/mutation";
import { Loader } from "lucide-react";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { mutate, isPending } = useLoginMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    mutate({ email, password });
  };

  return (
    <div className={cn("flex flex-col gap-6 !w-full", className)} {...props}>
      <Card className="border-none shadow-none dark:bg-transparent">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center  mb-2">
            ADMIN CRM
          </CardTitle>
          <CardDescription className="text-xl font-semibold text-center mb-4">
            Maqsad sari birinchi qadam bu yerda!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2 mb-2">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m.gmail.com"
                  required
                />
              </div>
              <div className="grid gap-2 mb-2">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="parol"
                  required
                />
              </div>
              <Button
                disabled={isPending}
                type="submit"
                className="w-full cursor-pointer"
              >
                {isPending ? <Loader className="animate-spin" /> : "Login"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
