"use client";

import { productTable, productVariantTable } from "@/db/schema";

import ProductItem from "./product-item";

interface ProductListProps {
  title: string;
  products: (typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  })[];
}

const ProductList = ({ title, products }: ProductListProps) => {
  return (
    <div className="space-y-6">
      <h3 className="px-5 text-lg font-semibold md:text-xl lg:text-2xl">
        {title}
      </h3>

      <div className="flex w-full gap-4 overflow-x-auto scroll-smooth px-5 md:gap-6 lg:gap-8 [&::-webkit-scrollbar]:hidden">
        {products.map((product) => (
          <div key={product.id} className="w-48 flex-shrink-0 md:w-56 lg:w-64">
            <ProductItem product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
