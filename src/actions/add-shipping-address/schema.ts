import { z } from "zod";

export const addShippingAddressSchema = z.object({
  fullName: z.string().min(1),
  address: z.string().min(1),
  number: z.string().min(1),
  complement: z.string().optional(),
  city: z.string().min(1),
  state: z.string().min(1),
  district: z.string().min(1),
  zipCode: z.string().min(1),
  phone: z.string().min(1),
  email: z.email(),
  cpf: z.string().min(14).max(14),
});

export type AddShippingAddressSchema = z.infer<typeof addShippingAddressSchema>;
