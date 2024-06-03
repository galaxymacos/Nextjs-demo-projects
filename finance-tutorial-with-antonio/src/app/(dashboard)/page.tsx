"use client";
import { DataGrid } from "@/components/data-grid";
// import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
// import { Button } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";

export default function Home() {
  const { onOpen } = useNewAccount();
  return (
    <div className="mx-auto -mt-24 w-full max-w-screen-2xl bg-green-100 pb-10">
      <DataGrid />
    </div>
  );
}
