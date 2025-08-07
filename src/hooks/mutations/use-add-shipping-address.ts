import { useMutation } from "@tanstack/react-query";

import { addShippingAddress } from "@/actions/add-shipping-address";
import { AddShippingAddressSchema } from "@/actions/add-shipping-address/schema";

export const getAddShippingAddressMutationKey = () =>
  ["add-shipping-address"] as const;

export const useAddShippingAddress = () => {
  return useMutation({
    mutationKey: getAddShippingAddressMutationKey(),
    mutationFn: (data: AddShippingAddressSchema) => addShippingAddress(data),
  });
};
