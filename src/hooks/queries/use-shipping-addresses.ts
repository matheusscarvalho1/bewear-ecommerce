import { useQuery } from "@tanstack/react-query";

import { getShippingAddresses } from "@/actions/get-shipping-addresses";
import { shippingAddressTable } from "@/db/schema";

export const getuseUserAddressQueryKey = () => ["shipping-addresses"] as const;

export const useUserAddress = (params?: {
  initialData?: (typeof shippingAddressTable.$inferSelect)[];
}) => {
  return useQuery({
    queryKey: getuseUserAddressQueryKey(),
    queryFn: getShippingAddresses,
    initialData: params?.initialData,
  });
};
