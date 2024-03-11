import { Button } from "@/components/ui/button";
import { cancelCheckout } from "@/lib/utils/action/CheckoutActions";
import React, { useTransition } from "react";
import toast from "react-hot-toast";

const CancelTransButton = ({ checkoutId }: { checkoutId: number }) => {
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      variant={"destructive"}
      disabled={isPending}
      onClick={async () => {
        startTransition(
          async () =>
            await cancelCheckout(checkoutId).then((res) => {
              console.log(res);
              if (!res.error) {
                console.log(res);
                toast.success(res.message);
              } else {
                toast.error(res.error.message);
              }
            })
        );
      }}
    >
      {isPending ? "Proses..." : "Konfirmasi"}
    </Button>
  );
};

export default CancelTransButton;
