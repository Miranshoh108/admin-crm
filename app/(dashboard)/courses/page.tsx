import CoursesComponents from "@/components/courses";
import { Myaxios } from "@/request/axios";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

const Courses = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["courses"],
    queryFn: async () =>
      await Myaxios.get("/api/course/get-courses").then((res) => res.data.data),
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <div className="p-4  rounded-xl shadow-sm py-5">
      <HydrationBoundary state={dehydratedState}>
        <CoursesComponents />
      </HydrationBoundary>
    </div>
  );
};

export default Courses;
