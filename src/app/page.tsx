
import Image from "next/image";

import CategorySelector from "@/components/common/category-selector";
import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import ProductList from "@/components/common/products-list";
import { getCategories } from "@/data/categories/get-categories";
import { getNewlyCreatedProducts, getProductsWithVariants } from "@/data/products/get-products";


export default async function Home() {
 const [products, newlyCreatedProducts, categories] = await Promise.all([
  getProductsWithVariants(),
  getNewlyCreatedProducts(),
  getCategories(),
 ])

  // Os logs saem no servidor pois é todo componente em next por padrão é um server component
  //console.log(products);

  return (
    <>
      <Header />
      <div className="space-y-6">
        <div className="px-5">
          <Image
            src="/banner-01.png"
            alt="Leve uma vida com estilo"
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>

        <ProductList title="Mais vendidos" products={products} />

        <div className="px-5">
          <CategorySelector categories={categories} />
        </div>
        <div className="px-5">
          <Image
            src="/banner-02.png"
            alt="Leve uma vida com estilo"
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>
        <ProductList title="Novos produtos" products={newlyCreatedProducts} />
        <Footer />
      </div>
    </>
  );
}
