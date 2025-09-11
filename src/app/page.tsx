import Image from "next/image";

import BrandsList from "@/components/brands-list";
import CategorySelector from "@/components/common/category-selector";
import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import ProductList from "@/components/common/products-list";
import { getCategories } from "@/data/categories/get-categories";
import {
  getNewlyCreatedProducts,
  getProductsWithVariants,
} from "@/data/products/get-products";

export default async function Home() {
  const [products, newlyCreatedProducts, categories] = await Promise.all([
    getProductsWithVariants(),
    getNewlyCreatedProducts(),
    getCategories(),
  ]);

  return (
    <>
      <Header />
      <div className="space-y-6">
        <div className="mx-auto max-w-6xl px-5">
          <div className="block md:hidden">
            <Image
              src="/banner-01.png"
              alt="Leve uma vida com estilo"
              height={0}
              width={0}
              sizes="100vw"
              className="h-auto w-full"
            />
          </div>
          <div className="hidden md:block">
            <Image
              src="/banner-01-desktop.png"
              alt="Leve uma vida com estilo"
              height={0}
              width={0}
              sizes="100vw"
              className="h-auto w-full"
            />
          </div>
        </div>

        <BrandsList />

        <ProductList title="Mais vendidos" products={products} />

        <div className="px-5">
          <CategorySelector categories={categories} />
        </div>
        <div className="mx-auto max-w-6xl px-5">
          <div className="block md:hidden">
            <Image
              src="/banner-02.png"
              alt="Leve uma vida com estilo"
              height={0}
              width={0}
              sizes="100vw"
              className="h-auto w-full"
            />
          </div>
          <div className="hidden md:block">
            <Image
              src="/banner-02-desktop.png"
              alt="Leve uma vida com estilo"
              height={0}
              width={0}
              sizes="100vw"
              className="h-auto w-full"
            />
          </div>
        </div>
        <ProductList title="Novos produtos" products={newlyCreatedProducts} />
        <Footer />
      </div>
    </>
  );
}
