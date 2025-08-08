import { headers } from "next/headers";
import { redirect } from "next/navigation";

import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/db";
import { auth } from "@/lib/auth";

import CartSummary from "../components/cart-sumary";
import FinishOrderButton from "./components/finish-order-button";

const CartConfirmation = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user.id) {
    redirect("/login");
  }
  const cart = await db.query.cartTable.findFirst({
    where: (cart, { eq }) => eq(cart.userId, session.user.id),
    with: {
      shippingAddress: true,
      items: {
        with: {
          productVariant: {
            with: {
              product: true,
            },
          },
        },
      },
    },
  });
  if (!cart || cart?.items.length === 0) {
    redirect("/");
  }
  const cartTotalInCents = cart.items.reduce(
    (acc, item) => acc + item.productVariant.priceInCents * item.quantity,
    0,
  );

  if (!cart.shippingAddress) {
    redirect("/cart/identification");
  }

  return (
    <div className="space-y-12">
      <Header />
      <div className="space-y-4 px-5">
        <Card>
          <CardHeader>
            <CardTitle>Identificação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              <p className="text-sm font-medium">
                {cart.shippingAddress.recipientName},{" "}
                {cart.shippingAddress.street}, {cart.shippingAddress.number}
                {cart.shippingAddress.complement
                  ? `, ${cart.shippingAddress.complement}`
                  : ""}
                , {cart.shippingAddress.neighbourhood}{" "}
                {cart.shippingAddress.city} - {cart.shippingAddress.state},{" "}
                {cart.shippingAddress.zipCode}
              </p>
            </div>
          </CardContent>
        </Card>
        <FinishOrderButton />
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
      </div>
      <div className="mt-12">
        <Footer />
      </div>
    </div>
  );
};

export default CartConfirmation;
