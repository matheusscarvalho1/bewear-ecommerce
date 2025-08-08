import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addShippingAddress } from "@/actions/add-shipping-address";
import { AddShippingAddressSchema } from "@/actions/add-shipping-address/schema";
import { getuseUserAddressQueryKey } from "@/hooks/queries/use-shipping-addresses";

export const getAddShippingAddressMutationKey = () =>
  ["add-shipping-address"] as const;

export const useAddShippingAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getAddShippingAddressMutationKey(),
    mutationFn: (data: AddShippingAddressSchema) => addShippingAddress(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getuseUserAddressQueryKey(),
      });
    },
  });
};
