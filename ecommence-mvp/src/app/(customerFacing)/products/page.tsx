import React, { Suspense } from "react";
import { ProductCard, ProductCardSkeleton } from "@/components/product-card";
import db from "@/db/db";
import { cache } from "@/lib/cache";

const ProductsPage = () => {
  return (
    <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"}>
      <Suspense
        fallback={
          <>
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </>
        }
      >
        <ProductSuspense />
      </Suspense>
    </div>
  );
};

export default ProductsPage;

const getProducts = cache(
  () => {
    return db.product.findMany({
      where: { isAvailableForPurchase: true },
      orderBy: { name: "asc" },
    });
  },
  ["/products", "getProduct"],
  { revalidate: 3600 * 24 },
);

const ProductSuspense = async () => {
  const products = await getProducts();
  return products.map((product) => {
    return <ProductCard key={product.id} {...product} />;
  });
};
