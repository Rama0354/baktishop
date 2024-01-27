import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";

type Variants = {
  id: number;
  variant_name: string;
  variant_quantity: number;
  variant_point: number;
  fvariant_point: string;
  variant_weight: number;
  fvariant_weight: string;
};
interface VariantButtonProps {
  variants: Variants[];
  filterDetail?: any;
  onVariantSelect: (selectedVariantId: number) => void;
}

export default function VariantButton({
  variants,
  filterDetail,
  onVariantSelect,
}: VariantButtonProps) {
  const variantselected = useSelector(
    (state: RootState) => state.detail.variant
  );
  const findidx = filterDetail
    ? filterDetail
      ? variants.findIndex((f) => f.id === filterDetail.id)
      : 99
    : -1;
  const [variantselect, setVariantSelect] = useState<Variants | string>(
    findidx !== -1 ? variants[findidx] : "none"
  );
  const handleVariantSelection = (e: any) => {
    setVariantSelect(e);
    onVariantSelect(e);
  };

  return (
    <div className="w-full mx-auto">
      <RadioGroup
        value={variantselect ? variantselect : "none"}
        id="1"
        onChange={handleVariantSelection}
      >
        <RadioGroup.Label id="1" className="sr-only">
          Rating
        </RadioGroup.Label>
        <div className="flex gap-3">
          <RadioGroup.Option
            id={`0`}
            value={"none"}
            disabled={true}
            className={({ active, checked, disabled }) =>
              `${
                active
                  ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-purple-300"
                  : ""
              }
              ${checked ? "bg-purple-900 bg-opacity-75 text-white" : ""}
              ${
                disabled
                  ? "bg-slate-300 text-slate-500 border-transparent pointer-events-none select-none"
                  : ""
              }
                  relative hidden cursor-pointer rounded-lg px-3 py-2 border border-purple-900 shadow-md focus:outline-none`
            }
          >
            {({ active, checked }) => (
              <>
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center">
                    <div className="text-sm">
                      <RadioGroup.Label
                        as="p"
                        id={`0`}
                        className={`font-medium line-clamp-1 ${
                          checked ? "text-white" : "text-slate-700"
                        }`}
                      >
                        none
                      </RadioGroup.Label>
                    </div>
                  </div>
                </div>
              </>
            )}
          </RadioGroup.Option>
          {variants &&
            variants.map((variant, rateIndex) => (
              <RadioGroup.Option
                key={variant.id}
                id={`${variant.id}`}
                value={variant}
                disabled={variant.variant_quantity < 1}
                className={({ active, checked, disabled }) =>
                  `${
                    active
                      ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-purple-300"
                      : ""
                  }
              ${checked ? "bg-purple-900 bg-opacity-75 text-white" : ""}
              ${
                disabled
                  ? "bg-slate-300 text-slate-500 border-transparent pointer-events-none select-none"
                  : ""
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
                            className={`font-medium line-clamp-1 ${
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
