import React from "react";
import Image from "next/image";
import { formatCurrency } from "@/lib/formatters";
import { Elements } from "@stripe/react-stripe-js";
import Stripe from "stripe";
import { notFound } from "next/navigation";
import db from "@/db/db";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const SuccessPage = async ({
  searchParams,
}: {
  searchParams: { payment_intent: string };
}) => {
  const paymentIntent = await stripe.paymentIntents.retrieve(
    searchParams.payment_intent,
  );
  const product = await db.product.findUnique({
    where: { id: paymentIntent.metadata.productId },
  });
  if (product == null) return notFound();

  const isSuccess = paymentIntent.status == "succeeded";
  return (
    <div className={"max-w-5xl w-full mx-auto space-y-8"}>
      <h1 className={"text-4xl font-bold"}>
        {isSuccess ? "Success!" : "Error!"}
      </h1>
      {/*product row*/}
      <div className={"flex gap-4 items-center"}>
        <div className={"w-1/3 flex-shrink-0 aspect-video relative"}>
          <Image
            src={product.imagePath}
            alt={product.name}
            fill
            className={"object-cover"}
          />
        </div>
        <div>
          <div className={"text-lg"}>
            {formatCurrency(product.priceInCents / 100)}
          </div>
          <h1 className={"text-2xl font-bold"}>{product.id}</h1>
          <div className={"line-clamp-3 text-muted-foreground"}>
            {product.description}
          </div>
          <Button className={"mt-4"} size={"lg"} asChild>
            {isSuccess ? (
              <a
                href={`/products/download/${await createDownloadVerification(product.id)}`}
              >
                Download
              </a>
            ) : (
              <Link href={`/products/${product.id}`}>Try Again</Link>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;

export async function createDownloadVerification(productId: string) {
  return (
    await db.downloadVerification.create({
      data: {
        productId,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
      },
    })
  ).id;
}
