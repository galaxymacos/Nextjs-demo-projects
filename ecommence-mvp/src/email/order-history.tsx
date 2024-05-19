import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Tailwind,
  Text,
} from "@react-email/components";
import { OrderInformation } from "@/email/components/order-information";
import React from "react";

type OrderHistoryEmailProps = {
  orders: {
    id: string;
    pricePaidInCents: number;
    createdAt: Date;
    downloadVerificationId: string;
    product: {
      name: string;
      description: string;
      imagePath: string;
    };
  }[];
};

OrderHistoryEmail.PreviewProps = {
  orders: [
    {
      id: crypto.randomUUID(),
      pricePaidInCents: 10000,
      downloadVerificationId: crypto.randomUUID(),
      createdAt: new Date(),
      product: {
        name: "product name",
        description: "Some description",
        imagePath:
          "/products/9bb8e260-be01-447e-8373-15cd64656be9 - CleanShot 2024-05-03 at 00.18.09@2x.png",
      },
    },
    {
      id: crypto.randomUUID(),
      pricePaidInCents: 10000,
      downloadVerificationId: crypto.randomUUID(),
      createdAt: new Date(),
      product: {
        name: "product name 2",
        description: "Some other description",
        imagePath:
          "/products/d0ad450e-bc65-4b12-bad0-8cc9b0d202e2 - 17.x.2.jpg",
      },
    },
  ],
} satisfies OrderHistoryEmailProps;

export default function OrderHistoryEmail({ orders }: OrderHistoryEmailProps) {
  return (
    <Html>
      <Preview>Order History & Downloads</Preview>
      <Tailwind>
        <Head />

        <Body className={"font-sans bg-white"}>
          <Container className={"max-w-xl"} />
          <Text className={"text-3xl"}>Order History</Text>
          {orders.map((order, index) => (
            <React.Fragment key={index}>
              <OrderInformation
                key={order.id}
                order={order}
                product={order.product}
                downloadVerificationId={order.downloadVerificationId}
              />
              {index < orders.length - 1 && <Hr />}
            </React.Fragment>
          ))}
        </Body>
      </Tailwind>
    </Html>
  );
}
