"use client";

import { InferResponseType } from "hono";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { client } from "@/lib/hono";
import { Actions } from "@/app/(dashboard)/accounts/actions";

export type ResponseType = InferResponseType<
  typeof client.api.accounts.$get,
  200 // noly get the success type
>["data"][0];

export const columns: ColumnDef<ResponseType>[] = [
  // * column: the checkbox for bulk operation
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // * column: showing the name of the account
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-4 size-4" />
        </Button>
      );
    },
  },
  // * column:
  {
    id: "actions",
    cell: ({ row }) => <Actions id={row.original.id} />,
  },
];
