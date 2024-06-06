import React from "react";
import { format } from "date-fns";
import { formatCurrency } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

/**
 * A tooltip component showed when hovering over the chart, rendered in the form of <Tooltip content={<CustomTooltip />} />
 * @param param0
 * @returns
 */
export const CategoryTooltip = ({ active, payload }: any) => {
  if (!active) {
    return null;
  }
  const name = payload[0].payload.name;
  const value = payload[0].value;
  return (
    <div className="overflow-hidden rounded-sm border bg-white shadow-sm">
      <div className="bg-muted px-3 py-2 text-sm text-muted-foreground">
        {name}
      </div>
      <Separator />
      <div className="space-y-1 px-3 py-2">
        <div className="flex flex-row items-center justify-between gap-x-2">
          <div className="size-1.5 rounded-full bg-rose-500" />
          <p className="text-sm text-muted-foreground">Expenses</p>
          <p className="text-right text-sm font-medium">
            {formatCurrency(value * -1)}
          </p>
        </div>
      </div>
    </div>
  );
};
