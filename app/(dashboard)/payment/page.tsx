// PaymentsPage.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Myaxios } from "@/request/axios";
import { PaymentsModal } from "@/components/payment";

interface PaymentType {
  _id: string;
  student: {
    first_name: string;
    last_name: string;
  };
  group: {
    name: string;
  };
  payment_price: number;
  month: string;
  method: string;
  paidAt: string;
}

const PaymentsPage = () => {
  const { refetch } = useQuery<PaymentType[]>({
    queryKey: ["payments"],
    queryFn: async () => {
      const response = await Myaxios.get("/api/payment/get-debtors");
      return response.data.data;
    },
  });

  return (
    <div className="space-y-4 px-5">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">To‘lovlar</h1>
        <PaymentsModal refetch={refetch} />
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Talaba</TableHead>
              <TableHead>Guruh</TableHead>
              <TableHead>Miqdor</TableHead>
              <TableHead>Oy</TableHead>
              <TableHead>Usul</TableHead>
              <TableHead>Sana</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      </div>
    </div>
  );
};

export default PaymentsPage;
