"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";

import { addProductToCart } from "@/actions/add-cart-product";
import LoginDialog from "@/components/common/login-dialog";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

interface AddToCartButtonProps {
  productVariantId: string;
  quantity: number;
}

const AddToCartButton = ({
  productVariantId,
  quantity,
}: AddToCartButtonProps) => {
  const queryClient = useQueryClient();
  const { data: session } = authClient.useSession();
  const [loginOpen, setLoginOpen] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationKey: ["addProductToCart", productVariantId, quantity],
    mutationFn: () =>
      addProductToCart({
        productVariantId,
        quantity,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const handleAddToCart = () => {
    if (!session?.user) {
      setLoginOpen(true);
      return;
    }
    mutate();
  };

  return (
    <>
      <Button
        className="rounded-full"
        size="lg"
        variant="outline"
        disabled={isPending}
        onClick={handleAddToCart}
      >
        {isPending && <Loader2 className="animate-spin" />}
        Adicionar à sacola
      </Button>
      <LoginDialog isOpen={loginOpen} onOpenChange={setLoginOpen} />
    </>
  );
};

export default AddToCartButton;
