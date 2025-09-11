import Image from "next/image";
import { notFound } from "next/navigation";

import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import ProductList from "@/components/common/products-list";
import {
  getLikelyProductsByID,
  getProductVariantWithSlug,
} from "@/data/products/get-products";
import { formatCentsToBRL } from "@/helpers/money";

import ProductActions from "../components/product-actions";
import VariantSelector from "../components/variant-selector";

interface ProductVariantPageProps {
  params: Promise<{ slug: string }>;
}

const ProductPage = async ({ params }: ProductVariantPageProps) => {
  const { slug } = await params;

  const productVariant = await getProductVariantWithSlug(slug);
  if (!productVariant) {
    return notFound();
  }

  const likelyProducts = await getLikelyProductsByID(
    productVariant.product.categoryId,
  );

  return (
    <>
      <Header />

      <main className="flex flex-col lg:flex-row lg:space-x-12 space-y-8 lg:space-y-0 px-5 max-w-[1400px] mx-auto">
        {/* Imagem do Produto */}
        <div className="lg:w-1/2 flex justify-center">
          <Image
            src={productVariant.imageUrl}
            alt={productVariant.name}
            height={0}
            width={0}
            className="w-full max-w-md lg:max-w-full h-auto rounded-lg shadow-lg"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* Informações do Produto */}
        <div className="lg:w-1/2 flex flex-col space-y-6">
          <VariantSelector
            selectedVariantSlug={productVariant.slug}
            variants={productVariant.product.variants}
          />

          <div className="space-y-2">
            <h1 className="text-2xl lg:text-3xl font-bold leading-tight">
              {productVariant.product.name}
            </h1>
            <h2 className="text-muted-foreground text-base lg:text-lg">
              {productVariant.name}
            </h2>
            <p className="text-2xl lg:text-3xl font-semibold">
              {formatCentsToBRL(productVariant.priceInCents)}
            </p>
          </div>

          <ProductActions productVariantId={productVariant.id} />

          <p className="text-gray-700 text-sm lg:text-base leading-relaxed max-w-prose">
            {productVariant.product.description}
          </p>
        </div>
      </main>

      {/* Produtos Relacionados */}
      <section className="mt-16 px-5 max-w-[1400px] mx-auto">
        <ProductList
          title="Talvez você goste"
          products={likelyProducts}
        />
      </section>

      <Footer />
    </>
  );
};

export default ProductPage;
