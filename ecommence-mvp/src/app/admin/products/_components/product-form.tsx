"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/formatters";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { addProduct, updateProduct } from "@/app/admin/_actions/products";
import { useFormStatus, useFormState } from "react-dom";
import { Product } from "@prisma/client";
import Image from "next/image";

const ProductForm = ({ product }: { product?: Product | null }) => {
  const [error, action] = useFormState(
    product == null ? addProduct : updateProduct.bind(null, product.id),
    {},
  );
  const [priceInCents, setPriceInCents] = useState<number | undefined>(
    product?.priceInCents,
  );
  return (
    <form className={"space-y-8"} action={action}>
      <div className={"space-y-2"}>
        <Label htmlFor={"name"}>Name</Label>
        <Input
          name={"name"}
          id={"name"}
          required
          defaultValue={product?.name || ""}
        />
        {error.name && <div className={"text-destructive"}>{error.name}</div>}
      </div>
      <div className={"space-y-2"}>
        <Label htmlFor={"priceInCents"}>Price In Cent</Label>
        <Input
          name={"priceInCents"}
          id={"priceInCents"}
          value={priceInCents}
          onChange={(e) => setPriceInCents(Number(e.target.value) || undefined)}
          required
        />
        {error.priceInCents && (
          <div className={"text-destructive"}>{error.priceInCents}</div>
        )}
        <div className={"text-muted-foreground"}>
          {formatCurrency((priceInCents || 0) / 100)}
        </div>
      </div>
      <div className={"space-y-2"}>
        <Label htmlFor={"description"}>Description</Label>
        <Textarea
          id={"description"}
          name={"description"}
          defaultValue={product?.description}
        />
        {error.description && (
          <div className={"text-destructive"}>{error.description}</div>
        )}
      </div>
      <div className={"space-y-2"}>
        <Label htmlFor={"file"}>File</Label>
        <Input
          type={"file"}
          id={"file"}
          name={"file"}
          required={product == null}
        />
        {product && (
          <div className={"text-muted-foreground"}>{product?.filePath}</div>
        )}
        {error.file && <div className={"text-destructive"}>{error.file}</div>}
      </div>
      <div className={"space-y-2"}>
        <Label htmlFor={"image"}>Image</Label>
        <Input
          type={"file"}
          id={"image"}
          name={"image"}
          required={product == null}
        />
        {product && (
          <Image
            src={product.imagePath}
            alt={"Image"}
            width={200}
            height={200}
          />
        )}
        {error.image && <div className={"text-destructive"}>{error.image}</div>}
      </div>

      <SubmitButton />
    </form>
  );
};

export default ProductForm;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type={"submit"} disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}
