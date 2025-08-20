import { db } from "@/db";
import { auth } from "@/lib/auth";

export const getCartData = async (
  session: Awaited<ReturnType<typeof auth.api.getSession>>,
) => {
  if (!session?.user?.id) {
    return null;
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
  return cart;
};
