"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { formatDateRange } from "@/lib/utils";
import { useGetSummary } from "@/features/summary/api/use-get-summary";
import { FaPiggyBank } from "react-icons/fa";
import { DataCard } from "@/components/data-card";

/**
 *
 * @returns Display summary data in the path "/"
 */
export const DataGrid = () => {
  const { data } = useGetSummary();
  const params = useSearchParams();
  const to = params.get("to") || undefined;
  const from = params.get("from") || undefined;

  const dataRangeLabel = formatDateRange({ from, to });
  return (
    <div className="mb-8 grid grid-cols-1 gap-8 pb-2 lg:grid-cols-3">
      <DataCard
        title="Remaining"
        value={data?.remainingAmount}
        percentageChange={data?.remainingChange}
        icon={FaPiggyBank}
        variant="default"
        dateRange={dataRangeLabel}
      />
    </div>
  );
};
