import {api} from "@/request"
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query"
import ManagerTable from "@/components/manager-table"

const Managers = async () => {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ["managers"],
        queryFn: async () => {
            const res = await api.get("/api/staff/all-managers")
            return res.data.data
        },
    })

    const dehydratedState = dehydrate(queryClient)

    return (
        <HydrationBoundary state={dehydratedState}>
            <div className="p-4 md:p-8 space-y-6">
                <div className="overflow-hidden">
                    <h2 className="mb-3 font-bold text-xl">Menejerlar</h2>

                    <ManagerTable />
                </div>
            </div>
        </HydrationBoundary>
    )
}

export default Managers
