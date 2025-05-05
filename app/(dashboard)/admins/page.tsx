import AdminsTableComponent from "@/components/admins-table";
import { Myaxios } from "@/request/axios";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import React from "react";

const Admins = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["admins"],
    queryFn: () =>
      Myaxios.get("/api/staff/all-admins").then((res) => console.log(res.data)),
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <div className="p-4  rounded-xl shadow-sm py-5">
      <HydrationBoundary state={dehydratedState}>
        <AdminsTableComponent />
      </HydrationBoundary>
    </div>
  );
};

export default Admins;
