import Table from "@/app/ui/customers/table";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { Metadata } from "next";
import { fetchFilteredCustomers } from "@/app/lib/data";

export const metadata: Metadata = {
  title: "Customers",
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const filteredCustomers = await fetchFilteredCustomers(query, currentPage);
  return (
    <div className="w-full">
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table customers={filteredCustomers} />
      </Suspense>
    </div>
  );
}
