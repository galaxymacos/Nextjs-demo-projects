import db from "@/db/db";
import Stripe from "stripe";
import { notFound } from "next/navigation";
import CheckoutForm from "@/app/(customerFacing)/products/[id]/purchase/_components/CheckoutForm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function PurchasePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await db.product.findUnique({ where: { id } });
  if (product == null) return notFound();
  const paymentIntent = await stripe.paymentIntents.create({
    amount: product.priceInCents,
    currency: "USD",
    metadata: { productId: product.id }, // used after payment processing
  });

  if (paymentIntent.client_secret == null) {
    throw Error("Stripe failed to create payment");
  }

  return (
    <CheckoutForm
      product={product}
      clientSecret={paymentIntent.client_secret}
    />
  );
}
