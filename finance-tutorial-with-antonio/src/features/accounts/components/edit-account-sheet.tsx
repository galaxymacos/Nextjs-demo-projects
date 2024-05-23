import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { AccountForm } from "@/features/accounts/components/account-form";
import { insertAccountSchema } from "@/db/schema";
import { z } from "zod";
import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";
import { useGetAccount } from "@/features/accounts/api/use-get-account";
import { Loader2 } from "lucide-react";
import { useEditAccount } from "@/features/accounts/api/use-edit-account";

const formSchema = insertAccountSchema.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

const EditAccountSheet = () => {
  const { isOpen, onClose, id } = useOpenAccount();

  const accountQuery = useGetAccount(id);

  const editMutation = useEditAccount(id);

  const isPending = editMutation.isPending;

  const isLoading = accountQuery.isLoading;

  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const defaultValues = accountQuery.data
    ? {
        name: accountQuery.data.name,
      }
    : {
        name: "",
      };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className={"space-y-4"}>
        <SheetHeader>
          <SheetTitle>Edit Account</SheetTitle>
          <SheetDescription>Edit an existing account</SheetDescription>
        </SheetHeader>
        {isLoading ? ( // Guarantee defaultValues is set before rendering the form
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-4 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <AccountForm
            id={id}
            disabled={isPending}
            onSubmit={onSubmit}
            defaultValues={defaultValues}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default EditAccountSheet;
