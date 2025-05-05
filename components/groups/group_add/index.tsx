import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from "../../ui/dialog";
import { Info, Plus, X } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Myaxios } from "@/request/axios";
import useDebounce from "@/shared/generics/debounse";
import { useQuery } from "@tanstack/react-query";
import { TeacherType } from "@/types";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAddGroupMutation } from "@/request/mutation";
const formSchema = z.object({
  name: z
    .string()
    .min(5)
    .regex(/N\d+$/, { message: "'N' bilan raqam bolishi kerak!" }),
  teacher: z.string(),
  started_group: z.string(),
});
export interface AddGroupType {
  name: string;
  teacher: string;
  started_group: string;
}
interface teacherIdType {
  name: string;
  id: string;
}
const Group_add_tool = () => {
  const { mutate } = useAddGroupMutation();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [teacherId, setTeacherId] = useState<teacherIdType>({
    name: "",
    id: "",
  });
  const [searchValue, setSearchValue] = useState<string>("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      teacher: "",
      started_group: "",
    },
  });

  const addAdmin = (values: z.infer<typeof formSchema>) => {
    mutate(
      { ...values, teacher: teacherId.id },
      {
        onSuccess() {
          setOpen(false);
          form.reset();
          setTeacherId({
            name: "",
            id: "",
          });
          setSearchValue("");
        },
      }
    );
  };

  const debounce = useDebounce<string>(searchValue, 500);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["search-teacher"],
    queryFn: () =>
      Myaxios.get("/api/group/search-teacher", { params: { name: debounce } }),
    enabled: debounce.trim() !== "",
  });
  useEffect(() => {
    if (debounce.trim() !== "") {
      refetch();
    }
  }, [debounce,refetch]);
  console.log(teacherId);

  return (
    <div className="flex items-center gap-4">
      <Button
        onClick={() => setOpen(!open)}
        className="mb-4 flex items-center justify-center "
        size="sm"
      >
        <Plus />
        <p className="max-[620px]:hidden">Guruh Qo&apos;shish</p>
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className={`min-w-[600px] ${data && "min-h-[400px] !pb-20"} ${
            teacherId.id && "min-h-[200px] !pb-0"
          } ${!data?.data?.data?.length && " !pb-0"} `}
        >
          <DialogHeader>
            <DialogTitle>Tahrirlash</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(addAdmin)}
              className="grid gap-5 py-4 items-start "
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Guruh nomi
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Frontend dasturlash N1" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="teacher"
                render={({ field }) => (
                  <FormItem className="relative ">
                    <FormLabel className="text-foreground">Ustoz</FormLabel>
                    <FormControl>
                      <div>
                        {teacherId.id ? (
                          <div className="flex items-center justify-between">
                            <Input
                              className="w-[93%]"
                              readOnly
                              value={teacherId.name}
                            />
                            <X
                              onClick={() => setTeacherId({ name: "", id: "" })}
                            />
                          </div>
                        ) : (
                          <div>
                            <Input
                              {...field}
                              value={searchValue}
                              placeholder="Davron"
                              onChange={(e) => setSearchValue(e.target.value)}
                            />
                            {data?.data?.data?.length && (
                              <div
                                className={`absolute  overflow-y-auto h-[200px] top-17 rounded-xl p-2 flex flex-col gap-3  border border-accent-foreground/40 bg-[#161514] w-full  ${
                                  !data?.data?.data?.length && "!h-[140px] !pb-0"
                                }  `}
                              >
                                <Table>
                                  <TableHeader>
                                    <TableRow className="sticky top-0 bg-[#161514] ">
                                      <TableHead className="w-[30px]">
                                        No
                                      </TableHead>
                                      <TableHead>Ism</TableHead>
                                      <TableHead>Sohasi</TableHead>
                                      <TableHead>Haqida</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {!isLoading || !isError
                                      ? data?.data?.data?.map(
                                          (
                                            teacher: TeacherType,
                                            idx: number
                                          ) => (
                                            <TableRow
                                              key={teacher._id}
                                              onClick={() =>
                                                setTeacherId({
                                                  id: teacher._id,
                                                  name: teacher.first_name,
                                                })
                                              }
                                            >
                                              <TableCell className="text-center">
                                                {idx + 1}
                                              </TableCell>
                                              <TableCell className="pl-2 font-medium">
                                                {teacher.first_name +
                                                  " " +
                                                  teacher.last_name}
                                              </TableCell>
                                              <TableCell>
                                                {teacher.field}
                                              </TableCell>
                                              <TableCell
                                                onClick={() =>
                                                  router.push(
                                                    `teachers/${teacher._id}`
                                                  )
                                                }
                                                className="pr-3"
                                              >
                                                <Info />
                                              </TableCell>
                                            </TableRow>
                                          )
                                        )
                                      : "..loading"}
                                  </TableBody>
                                </Table>
                              </div>
                              // ) : (
                              //   <div className="flex items-center justify-center  bg-[#161514] rounded-lg p-3 mt-3 !h-full !w-full ">
                              //     <p className="text-lg text-center">
                              //       Ustoz topilmadi!
                              //     </p>
                              //   </div>
                            )}
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="started_group"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="2025-05-15" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Group_add_tool;
