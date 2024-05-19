import db from "@/db/db";
import { Product } from "@prisma/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard, ProductCardSkeleton } from "@/components/product-card";
import { Suspense } from "react";
import { cache } from "@/lib/cache";

const getMostPopularProducts = cache(
  async () => {
    return db.product.findMany({
      where: { isAvailableForPurchase: true },
      orderBy: { orders: { _count: "desc" } },
      take: 6,
    });
  },
  ["/", "getMostPopularProducts"],
  { revalidate: 3600 * 24 },
);

const getNewestProducts = cache(
  async () => {
    return db.product.findMany({
      where: { isAvailableForPurchase: true },
      orderBy: { createdAt: "desc" },
      take: 6,
    });
  },
  ["/", "getNewestProducts"],
  { revalidate: 3600 * 24 },
);

export default function HomePage() {
  return (
    <main className={"space-y-12"}>
      <ProductGridSection
        title={"Most Popular"}
        productFetcher={getMostPopularProducts}
      />
      <ProductGridSection title={"Newest"} productFetcher={getNewestProducts} />
    </main>
  );
}

type ProductGridSectionProps = {
  productFetcher: () => Promise<Product[]>;
  title: string;
};

function ProductGridSection({
  productFetcher,
  title,
}: ProductGridSectionProps) {
  return (
    <div className={"space-y-4"}>
      {/* title */}
      <div className={"flex gap-4 items-center"}>
        <h2 className={"text-2xl font-semibold"}>{title}</h2>
        <Button asChild={true} variant={"outline"}>
          <Link href={"/products"} className={"space-x-2"}>
            <span>View All</span>
            <ArrowRight className={"size-4"} />
          </Link>
        </Button>
      </div>
      {/*card grid*/}
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
          <ProductSuspense productsFetcher={productFetcher} />
        </Suspense>
      </div>
    </div>
  );
}

async function ProductSuspense({
  productsFetcher,
}: {
  productsFetcher: () => Promise<Product[]>;
}) {
  return (await productsFetcher()).map((product) => (
    <ProductCard key={product.id} {...product} />
  ));
}
