"use client";
import { insertAccountSchema } from "@/db/schema";
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

const formSchema = insertAccountSchema.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  onDelete?: () => void;
  disabled: boolean;
};

export const AccountForm = ({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled,
}: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
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
        <FormField
          control={form.control}
          name={"name"}
          render={({ field }) => {
            return (
              <FormItem className="w-full">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={disabled}
                    placeholder={"e.g. Cash, Bank, Credit Card"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button className={"w-full"} disabled={disabled}>
          {id ? "Save Change" : "Create Account"}
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
            Delete Account
          </Button>
        )}
      </form>
    </Form>
  );
};
