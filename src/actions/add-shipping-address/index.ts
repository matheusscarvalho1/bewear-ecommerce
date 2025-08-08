"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { db } from "@/db";
import { shippingAddressTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import { AddShippingAddressSchema, addShippingAddressSchema } from "./schema";

export const addShippingAddress = async (data: AddShippingAddressSchema) => {
  addShippingAddressSchema.parse(data);
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  const [shippingAddress] = await db
    .insert(shippingAddressTable)
    .values({
      userId: session.user.id,
      recipientName: data.fullName,
      street: data.address,
      number: data.number,
      complement: data.complement,
      city: data.city,
      state: data.state,
      neighbourhood: data.district,
      zipCode: data.zipCode,
      country: "BR",
      phone: data.phone,
      email: data.email,
      cpfOrCnpj: data.cpf,
    })
    .returning({ id: shippingAddressTable.id });

  revalidatePath("/cart/identification");
  return shippingAddress;
};
