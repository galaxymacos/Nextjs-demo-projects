import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { ImportTable } from "@/app/(dashboard)/transactions/import-table";

const dateFormat = "yyyy-MM-dd HH:mm:ss";
const outputFormat = "yyyy-MM-dd";

const requiredOptions = ["amount", "date", "payee"];

interface SelectedColumnsState {
  [key: string]: string | null; // an object with the key as string and the value as string | null
}

type Props = {
  data: string[][];
  onCancel: () => void;
  onSubmit: (data: any) => void;
};

/**
 * The card when the user clicks on the "import" button in the transactions page
 * @param param0
 * @returns
 */
export const ImportCard = ({ data, onCancel, onSubmit }: Props) => {
  const headers = data[0];
  const body = data.slice(1);
  const [selectedColumns, setSelectedColumns] = useState<SelectedColumnsState>(
    {},
  );
  return (
    <>
      <div className="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
        <Card className="border-none drop-shadow-sm">
          <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
            <CardTitle className="line-clamp-1 text-xl">
              Import Transactions
            </CardTitle>
            <div className="flex items-center gap-x-2">
              <Button size={"sm"} onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ImportTable
              headers={headers}
              body={body}
              selectedColumns={selectedColumns}
              onTableHeadSelectChange={() => {}}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
};
