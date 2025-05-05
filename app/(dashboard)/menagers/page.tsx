import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Myaxios } from "@/request/axios";
import TableComponent from "@/components/table";

const Managers = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["managers"],
    queryFn: () =>
      Myaxios.get("/api/staff/all-managers").then((res) => res.data.data),
  });
 
  const dehydratedState = dehydrate(queryClient);
  return (
    <div className="p-4  rounded-xl shadow-sm  py-5">
      <HydrationBoundary state={dehydratedState}>
        <TableComponent />
      </HydrationBoundary>
    </div>
  );
};
export default Managers;
