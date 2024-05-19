import React from "react";
import { PageHeader } from "@/app/admin/_components/page-header";
import ProductForm from "@/app/admin/products/_components/product-form";
import db from "@/db/db";

const EditProductPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const product = await db.product.findUnique({
    where: { id },
  });
  return (
    <>
      <PageHeader>Edit Product</PageHeader>
      <ProductForm product={product} />
    </>
  );
};

export default EditProductPage;
