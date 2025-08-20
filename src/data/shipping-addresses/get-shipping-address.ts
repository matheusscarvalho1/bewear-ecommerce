import { eq } from "drizzle-orm";

import { db } from "@/db";
import { shippingAddressTable } from "@/db/schema";
import { auth } from "@/lib/auth";

export const getShippingAddressData = async (
  session: Awaited<ReturnType<typeof auth.api.getSession>>,
) => {
  if (!session?.user?.id) {
    return null;
  }
  const shippingAddress = await db.query.shippingAddressTable.findMany({
    where: eq(shippingAddressTable.userId, session.user.id),
  });
  return shippingAddress;
};
