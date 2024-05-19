"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { emailOrderHistory } from "@/actions/orders";

export default function MyOrdersPage() {
  const [data, action] = useFormState(emailOrderHistory, {});
  return (
    <form action={action}>
      <Card>
        <CardHeader>
          <CardTitle>My Orders</CardTitle>
          <CardDescription>
            Enter your email and we will email you your order history and
            download links
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className={"space-y-2"}>
            <Label htmlFor={"email"}>Email</Label>
            <Input id={"email"} name={"email"} type={"email"} />
            {data.error && (
              <div className={"text-destructive"}>{data.error}</div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          {data.message ? <p>{data.message}</p> : <SubmitButton />}
        </CardFooter>
      </Card>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button className={"w-full"} type={"submit"} disabled={pending}>
      {pending ? "Sending..." : "Send"}
    </Button>
  );
}
