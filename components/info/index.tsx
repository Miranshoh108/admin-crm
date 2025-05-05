"use client";
import { Myaxios } from "@/request/axios";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Card, CardContent } from "../ui/card";
import { TeacherType } from "@/types";
import { Loader, TrendingUp } from "lucide-react";
import Image from "next/image";
import { MdGroups3, MdOutlineAttachMoney } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";

interface Id {
  id: string;
}
const InfoComponents = ({ id }: Id) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["admins"],
    queryFn: () =>
      Myaxios.get(`/api/teacher/get-teacher/${id}`).then(
        (res: { data: { data: TeacherType } }) => res.data.data
      ),
  });
  console.log(data);
  // useEffect(() => {
  //   if (!Object(data)) {
  //     console.error("Expected data to be an array, got:", data);
  //     refetch();
  //     <div>Error: Data is not in array format</div>;
  //   }
  // }, [data]);

  return (
    <div className="p-4 ">
      {!isLoading && !isError && data ? (
        <div className="flex gap-4 items-start ">
          <div>
            <div>
              <Card className="bg-background rounded-2xl  border-non w-fit">
                <CardContent className="p-4 space-y-5">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {data?.image ? (
                        <div>
                          <Image
                            width={50}
                            height={50}
                            src={data?.image}
                            alt={`${data?.first_name}`}
                          />
                        </div>
                      ) : (
                        <div className="bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold">
                          {(data?.first_name?.[0] || "") +
                            (data?.last_name?.[0] || "")}
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-[17px] font-semibold w-[169px] truncate">
                            {data!.first_name} {data!.last_name}
                          </h2>
                          <span className="bg-yellow-600  text-xs px-2 py-0.5 rounded-md">
                            Ustoz
                          </span>
                        </div>
                        <p className="text-sm ">{data!.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 text-sm">
                    {/* <div>
                    <div className="text-gray-400 uppercase text-xs">Ism</div>
                    <div>
                      {data!.first_name} {data!.last_name}
                    </div>
                  </div>
                  <div className="w-full h-[1px] bg-foreground/40"></div>
                 */}
                    <div>
                      <div className="text-gray-400 uppercase text-xs">
                        Email
                      </div>
                      <div>{data!.email}</div>
                    </div>
                    <div className="w-full h-[1px] bg-foreground/40"></div>
                    <div>
                      <div className="text-gray-400 uppercase text-xs">
                        Telefon raqami
                      </div>
                      <div>{data!.phone}</div>
                    </div>
                    <div className="w-full h-[1px] bg-foreground/40"></div>
                    <div>
                      <div className="text-gray-400 uppercase text-xs">
                        Field
                      </div>
                      <div>{data!.field}</div>
                    </div>
                    <div className="w-full h-[1px] bg-foreground/40"></div>
                    <div>
                      <div className="text-gray-400 uppercase text-xs">
                        Status
                      </div>
                      <div>{data!.status}</div>
                    </div>
                    <div className="w-full h-[1px] bg-foreground/40"></div>
                    <div>
                      <div className="text-gray-400 uppercase text-xs">
                        Work Date
                      </div>
                      <div>{new Date(data!.work_date).toLocaleString()}</div>
                    </div>
                    <div className="w-full h-[1px] bg-foreground/40"></div>
                    <div>
                      <div className="text-gray-400 uppercase text-xs">
                        Work End
                      </div>
                      <div>
                        {data!.work_end
                          ? new Date(data!.work_end).toLocaleString()
                          : "N/A"}
                      </div>
                    </div>
                    <div className="w-full h-[1px] bg-foreground/40"></div>
                    <div>
                      <div className="text-gray-400 uppercase text-xs">
                        Created At
                      </div>
                      <div>{new Date(data!.createdAt).toLocaleString()}</div>
                    </div>
                    <div className="w-full h-[1px] bg-foreground/40"></div>
                    <div>
                      <div className="text-gray-400 uppercase text-xs">
                        Updated At
                      </div>
                      <div>{new Date(data!.updatedAt).toLocaleString()}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="flex gap-4 items-center flex-wrap   ">
            <div className=" rounded-2xl p-3 w-[188px]  shadow-md border border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-tr from-orange-400 to-pink-500 rounded-xl flex items-center justify-center">
                  <MdOutlineAttachMoney className="text-white" size={30} />
                </div>
                <div>
                  <p className="text-sm text-foreground/60">Oylik maosh</p>
                  <p className="text-2xl font-bold">{data?.salary} So&apos;m</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-foreground/10 mt-4 text-xs text-foreground/60">
                <div className="flex items-center gap-1 text-green-500 font-semibold">
                  <TrendingUp size={14} />
                  0%
                </div>
                <span>Oxirgi Oy holati</span>
              </div>
            </div>
            <div className=" rounded-2xl p-3 w-[188px]  shadow-md border border-foreground/10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-tr from-orange-400 to-pink-500 rounded-xl flex items-center justify-center">
                  <FaChalkboardTeacher className="text-white" size={30} />
                </div>
                <div>
                  <p className="text-sm text-foreground/60">Guruhlar soni</p>
                  <p className="text-2xl font-bold">{data?.groups?.length}</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-foreground/10 mt-4 text-xs text-foreground/60">
                <div className="flex items-center gap-1 text-green-500 font-semibold">
                  <TrendingUp size={14} />
                  0%
                </div>
                <span>Oxirgi Oy holati</span>
              </div>
            </div>
            <div className=" rounded-2xl p-3 w-[188px]  shadow-md border border-foreground/10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-tr from-orange-400 to-pink-500 rounded-xl flex items-center justify-center">
                  <MdGroups3 className="text-white" size={30} />
                </div>
                <div>
                  <p className="text-sm text-foreground/60">Studentlar soni</p>
                  <p className="text-2xl font-bold">10</p>
                  {/* {data?.groups.length} */}
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-foreground/10 mt-4 text-xs text-foreground/60">
                <div className="flex items-center gap-1 text-green-500 font-semibold">
                  <TrendingUp size={14} />
                  0%
                </div>
                <span>Oxirgi Oy holati</span>
              </div>
            </div>
            <div className=" rounded-2xl p-3 w-[188px]  shadow-md border border-foreground/10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-tr from-orange-400 to-pink-500 rounded-xl flex items-center justify-center">
                  <MdGroups3 className="text-white" size={30} />
                </div>
                <div>
                  <p className="text-sm text-foreground/60">Studentlar soni</p>
                  <p className="text-2xl font-bold">10</p>
                  {/* {data?.groups.length} */}
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-foreground/10 mt-4 text-xs text-foreground/60">
                <div className="flex items-center gap-1 text-green-500 font-semibold">
                  <TrendingUp size={14} />
                  0%
                </div>
                <span>Oxirgi Oy holati</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center ">
          <Loader className=" animate-spin " size={30} />
        </div>
      )}
    </div>
  );
};

export default InfoComponents;
