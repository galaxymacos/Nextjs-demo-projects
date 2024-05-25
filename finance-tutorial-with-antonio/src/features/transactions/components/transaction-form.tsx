"use client";
import { insertCategorySchema, insertTransactionSchema } from "@/db/schema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useConfirm } from "@/hooks/use-confirm";
import { Select } from "@/components/select";
import { DatePicker } from "@/components/date-picker";

const formSchema = z.object({
  date: z.coerce.date(),
  accountId: z.string(),
  categoryId: z.string().nullable().optional(),
  payee: z.string(),
  amount: z.string(),
  notes: z.string().nullable().optional(),
});

const apiSchema = insertTransactionSchema.omit({ id: true });

type FormValues = z.input<typeof formSchema>;
type ApiFormValues = z.input<typeof apiSchema>;

type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: ApiFormValues) => void;
  onDelete?: () => void;
  disabled: boolean;
  accountOptions: { label: string; value: string }[];
  categoryOptions: { label: string; value: string }[];
  onCreateAccount: (name: string) => void;
  onCreateCategory: (name: string) => void;
};

export const TransactionForm = ({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled,
  accountOptions,
  categoryOptions,
  onCreateAccount,
  onCreateCategory,
}: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this transaction.",
  );

  const handleSubmit = (values: FormValues) => {
    console.log({ values });
  };

  const handleDelete = () => {
    onDelete?.();
  };

  return (
    <Form {...form}>
      <form
        className={
          "relative flex w-full max-w-md flex-col gap-4 px-4 md:mx-0 md:px-2"
        }
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        {/* date */}
        <FormField
          control={form.control}
          name={"date"}
          render={({ field }) => {
            return (
              <FormItem className="w-full">
                <FormControl>
                  <DatePicker
                    value={field.value}
                    onChange={field.onChange}
                    disabled={disabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name={"accountId"}
          render={({ field }) => {
            return (
              <FormItem className="w-full">
                <FormLabel>Account</FormLabel>
                <FormControl>
                  <Select
                    placeholder="Select an account"
                    options={accountOptions}
                    onCreate={onCreateAccount}
                    value={field.value}
                    onChange={field.onChange}
                    disabled={disabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name={"categoryId"}
          render={({ field }) => {
            return (
              <FormItem className="w-full">
                <FormLabel>Account</FormLabel>
                <FormControl>
                  <Select
                    placeholder="Select an category"
                    options={categoryOptions}
                    onCreate={onCreateCategory}
                    value={field.value}
                    onChange={field.onChange}
                    disabled={disabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button className={"w-full"} disabled={disabled}>
          {id ? "Save Change" : "Create Category"}
        </Button>
        {!!id && (
          <Button
            type={"button"}
            className={"w-full"}
            onClick={handleDelete}
            disabled={disabled}
            variant={"outline"}
          >
            <Trash className={"mr-2 size-4"} />
            Delete Category
          </Button>
        )}
      </form>
    </Form>
  );
};
