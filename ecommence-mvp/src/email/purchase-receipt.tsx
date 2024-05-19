import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Tailwind,
  Text,
} from "@react-email/components";
import { OrderInformation } from "@/email/components/order-information";

type PurchaseReceiptEmailProps = {
  product: {
    name: string;
    description: string;
    imagePath: string;
  };
  order: { id: string; createdAt: Date; pricePaidInCents: number };
  downloadVerificationId: string;
};

PurchaseReceiptEmail.PreviewProps = {
  product: {
    name: "Product name",
    description: "Product description",
    imagePath:
      "/products/9bb8e260-be01-447e-8373-15cd64656be9 - CleanShot 2024-05-03 at 00.18.09@2x.png",
  },
  order: {
    id: crypto.randomUUID(),
    createdAt: new Date(),
    pricePaidInCents: 10000,
  },
  downloadVerificationId: crypto.randomUUID(),
} satisfies PurchaseReceiptEmailProps;

export default function PurchaseReceiptEmail({
  product,
  order,
  downloadVerificationId,
}: PurchaseReceiptEmailProps) {
  return (
    <Html>
      <Preview>Download {product.name} and view receipt</Preview>
      <Tailwind>
        <Head />

        <Body className={"font-sans bg-white"}>
          <Container className={"max-w-xl"} />
          <Text className={"text-3xl"}>Purchase Receipt</Text>
          <OrderInformation
            order={order}
            product={product}
            downloadVerificationId={downloadVerificationId}
          />
        </Body>
      </Tailwind>
    </Html>
  );
}
