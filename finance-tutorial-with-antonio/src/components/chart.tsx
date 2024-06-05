import { AreaVariant } from "@/components/area-variant";
import { BarVariant } from "@/components/bar-variant";
import { LineVariant } from "@/components/line-variant";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileSearch } from "lucide-react";
import React from "react";

type Props = {
  data?: {
    income: number;
    expenses: number;
    date: string;
  }[];
};

/**
 * A component that accepts an array of data and displays a chart.
 * @param param0
 * @returns
 */
export const Chart = ({ data = [] }: Props) => {
  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="flex justify-between space-y-2 lg:flex-row lg:items-center lg:space-y-0">
        <CardTitle className="line-clamp-1 text-xl">Transactions</CardTitle>
        {/* TODO: Add select */}
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="flex h-[350px] w-full flex-col items-center justify-center gap-y-4">
            <FileSearch className="size-6 text-muted-foreground" />
            <p>No data for this period</p>
          </div>
        ) : (
          // <AreaVariant data={data} /> // Data is passed in DataChart component
          <LineVariant data={data} /> // Data is passed in DataChart component
        )}
      </CardContent>
    </Card>
  );
};
