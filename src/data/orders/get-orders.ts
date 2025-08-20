import { eq } from "drizzle-orm";

import { checkAuthentication } from "@/app/authentication/check-authentication";
import { db } from "@/db";
import { orderTable } from "@/db/schema";

export const getOrders = async () => {
  const session = await checkAuthentication();
  const orders = await db.query.orderTable.findMany({
    where: eq(orderTable.userId, session?.user.id),
    with: {
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

  return orders;
};
