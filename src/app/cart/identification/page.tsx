import { redirect } from "next/navigation";

import { checkAuthentication } from "@/app/authentication/check-authentication";
import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import { getCartData } from "@/data/carts/get-cart";
import { getShippingAddressData } from "@/data/shipping-addresses/get-shipping-address";

import CartSummary from "../components/cart-sumary";
import Addresses from "./components/addresses";

const IdentificationPage = async () => {
  const session = await checkAuthentication();

  const [cart, shippingAddresses] = await Promise.all([
    getCartData(session),
    getShippingAddressData(session),
  ]);

  if (!cart || cart?.items.length === 0) {
    redirect("/");
  }

  const cartTotalInCents = cart.items.reduce(
    (acc, item) => acc + item.productVariant.priceInCents * item.quantity,
    0,
  );
  return (
    <div>
      <Header />
      <div className="space-y-4 px-5">
        <Addresses
          shippingAddresses={shippingAddresses ?? []}
          defaultShippingAddressId={cart.shippingAddress?.id || null}
        />
        <CartSummary
          subTotalInCents={cartTotalInCents}
          totalInCents={cartTotalInCents}
          products={cart.items.map((item) => ({
            id: item.productVariant.id,
            name: item.productVariant.product.name,
            variantName: item.productVariant.name,
            quantity: item.quantity,
            priceInCents: item.productVariant.priceInCents,
            imageUrl: item.productVariant.imageUrl,
          }))}
        />
        <div className="mt-12">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default IdentificationPage;
