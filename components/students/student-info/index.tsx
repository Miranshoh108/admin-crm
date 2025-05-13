"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Myaxios } from "@/request/axios";
import { studentType } from "@/types";
import React, { useEffect, useState } from "react";

const Student_info_component = ({ id }: { id: string }) => {
  const [data, setData] = useState<studentType>();

  useEffect(() => {
    Myaxios.get(`/api/student/student/${id}`).then((res) =>
      setData(res.data.data)
    );
  }, [id]);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="p-6 space-y-6">
      <Card className="bg-background">
        <CardContent className=" flex items-center justify-between max-[440px]:flex-col max-[440px]:text-center max-[440px]:gap-3">
          <div className=" space-y-2  ">
            <h2 className="text-xl font-semibold">Student Malumotlari</h2>

            <div className="flex items-center gap-4">
              <div className="bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold">
                {(data?.first_name?.[0] || "") + (data?.last_name?.[0] || "")}
              </div>
              <div className="flex text-lg font-medium gap-2">
                <p>{data.first_name}</p>
                <p>{data.last_name}</p>
              </div>
            </div>
            <p className="max-[480px]:text-sm">
              Telefon raqam:
              {data.phone.startsWith("+") ? data.phone : "+" + data.phone}
            </p>
          </div>
          <div className="flex flex-col gap-3 items-end max-[450px]:items-center ">
            <div className="flex items-center gap-3">
              <p className="max-[450px]:flex hidden max-[330px]:!text-sm">
                Status:
              </p>
              <div
                className={`${
                  data.status == "faol"
                    ? "bg-green-500"
                    : data.status == "yakunladi"
                    ? "bg-rose-500"
                    : "bg-yellow-500"
                } rounded-lg py-1.5 px-3 w-fit max-[330px]:!text-sm text-white max-[480px]:text-sm max-[480px]:py-1 max-[480px]:px-2 `}
              >
                {data.status}
              </div>
            </div>
            <div className="flex items-center gap-3 max-[330px]:!text-sm">
              <p className="max-[450px]:flex hidden max-[330px]:!text-sm">
                Yaratilgan vaqt:
              </p>
              {data.createdAt.slice(0, 10)}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full ">
        <Card className=" overflow-hidden">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold mb-2">O&apos;qimoqda </h2>
              <p className="mr-3">{data.groups.length}</p>
            </div>

            <div className="overflow-y-auto max-h-[calc(100vh-27rem)]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No</TableHead>
                    <TableHead>Group</TableHead>
                    <TableHead>Holati</TableHead>
                    <TableHead>Qoshilgan vaqt</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.groups.map((value, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell>{value.group.name}</TableCell>
                      <TableCell>{value.status}</TableCell>
                      <TableCell>{value.joinedAt.slice(0, 10)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold mb-2">Tatil tarixi </h2>
              <p className="mr-3">{data.leave_history.length}</p>
            </div>
            {data.leave_history.length ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No</TableHead>
                    <TableHead>Kun</TableHead>
                    <TableHead>Sabab</TableHead>
                    <TableHead>Boshagan</TableHead>
                    <TableHead>Tugagan</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.leave_history.map((value, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell>{value.days}</TableCell>
                      <TableCell>{value.reason}</TableCell>
                      <TableCell>{value.start_date.slice(0, 10)}</TableCell>
                      <TableCell>{value.end_date.slice(0, 10)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p>Malumot Yo&apos;q</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Student_info_component;
