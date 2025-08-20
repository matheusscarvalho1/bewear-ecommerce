import { Header } from "@/components/common/header";
import { getOrders } from "@/data/orders/get-orders";

import Orders from "./components/orders";

const MyOrdersPage = async () => {
  const orders = await getOrders();

  return (
    <>
      <Header />
      <div className="px-5">
        <div className="px-5">
          <Orders
            orders={orders.map((order) => ({
              id: order.id,
              totalPriceInCents: order.totalPriceInCents,
              status: order.status,
              createdAt: order.createdAt,
              items: order.items.map((item) => ({
                id: item.id,
                imageUrl: item.productVariant.imageUrl,
                productName: item.productVariant.product.name,
                productVariantName: item.productVariant.name,
                priceInCents: item.productVariant.priceInCents,
                quantity: item.quantity,
              })),
            }))}
          />
        </div>
      </div>
    </>
  );
};

export default MyOrdersPage;
