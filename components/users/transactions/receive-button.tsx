import { Button } from "@/components/ui/button";
import { receiveCheckout } from "@/lib/utils/action/CheckoutActions";
import React, { useTransition } from "react";
import toast from "react-hot-toast";

const ReceiveButton = ({
  checkoutId,
  noResi,
}: {
  checkoutId: number;
  noResi: string;
}) => {
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      disabled={isPending || noResi === null}
      onClick={async () => {
        startTransition(
          async () =>
            await receiveCheckout(checkoutId).then((res) => {
              if (!res.error) {
                console.log(res);
                toast.success(res.message);
              } else {
                toast.error(res.error.message);
              }
            })
        );
      }}
      className="w-full"
    >
      {isPending ? "Proses..." : "Konfirmasi"}
    </Button>
  );
};

export default ReceiveButton;
