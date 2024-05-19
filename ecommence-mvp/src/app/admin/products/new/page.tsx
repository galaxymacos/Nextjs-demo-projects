import React from "react";
import { PageHeader } from "@/app/admin/_components/page-header";
import ProductForm from "@/app/admin/products/_components/product-form";

const NewProductPage = () => {
  return (
    <>
      <PageHeader>Add Product</PageHeader>
      <ProductForm />
    </>
  );
};

export default NewProductPage;
