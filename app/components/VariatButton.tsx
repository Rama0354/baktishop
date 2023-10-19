import { useState } from "react";
import { RadioGroup } from "@headlessui/react";

type Variants = [
  {
      id: number,
      item_gift_id: number,
      variant_name: string,
      variant_point: number,
      variant_quantity: number
  },
]
interface VariantButtonProps {
  variants: Variants;
  onVariantSelect: (selectedVariantId: number) => void;
}

export default function VariantButton({ variants, onVariantSelect }: VariantButtonProps) {
  const [variantId, setVariantId] = useState<number | null>(null);

  const handleVariantSelection = (e: number) => {
    setVariantId(e);
    onVariantSelect(e); // Call the callback function with the selected variant ID
  };

  return (
      <div className="w-full mx-auto">
        <RadioGroup value={variantId} id="1" onChange={handleVariantSelection}>
          <RadioGroup.Label id="1" className="sr-only">
            Rating
          </RadioGroup.Label>
          <div className="flex gap-3">
            {variants.map((variant, rateIndex) => (
              <RadioGroup.Option
                key={variant.id}
                id={`${variant.id}`}
                value={variant.id}
                className={({ active, checked }) =>
                  `${
                    active
                      ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-purple-300"
                      : ""
                  }
                  ${
                    checked
                      ? "bg-purple-900 bg-opacity-75 text-white"
                      : "bg-white"
                  }
                    relative flex cursor-pointer rounded-lg px-3 py-2 border border-purple-900 shadow-md focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            id={`${variant.id}`}
                            className={`font-medium line-clamp-1  ${
                              checked ? "text-white" : "text-slate-700"
                            }`}
                          >
                            {variant.variant_name}
                          </RadioGroup.Label>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
  );
}
