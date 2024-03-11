"use client";

import { useEffect, useRef, useState } from "react";
import { Listbox, RadioGroup } from "@headlessui/react";
import { MdCheck, MdLocationOn, MdPerson, MdPhone } from "react-icons/md";
import { AddressArray, FullAddressData } from "@/lib/types/address";
import { getCostsExpedition } from "@/lib/utils/action/ExpeditionActions";
import { ExpeditionArray, ExpeditionDetail } from "@/lib/types/expedition";
import { useDispatch, useSelector } from "react-redux";
import {
  setAddressDetails,
  setOrderDetails,
  setOrderProductsDetails,
  setShippingDetails,
} from "@/lib/redux/slice/checkoutSlice";
import { CheckoutProducts } from "@/lib/types/checkout";
import { debounce } from "lodash";
import Image from "next/image";
import { RootState } from "@/lib/redux/store";
import { Textarea } from "../ui/textarea";

type Expeditions = {
  id: number;
  name: string;
  label: string;
};
const Expedition: Expeditions[] = [
  { id: 1, name: "jne", label: "JNE" },
  { id: 2, name: "pos", label: "POS" },
  { id: 3, name: "tiki", label: "TIKI" },
];

export default function CheckoutClient({
  address,
  products,
  weights,
}: {
  address: AddressArray;
  products: CheckoutProducts;
  weights: number;
}) {
  const [addressSelected, setAddressSelected] = useState(address[0]);
  const [expeditionSelected, setExpeditionSelected] =
    useState<Expeditions | null>(null);
  const [couriers, setCouriers] = useState<ExpeditionArray>([]);
  const [courierSelected, setCourierSelected] =
    useState<ExpeditionDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const singleCartData = useSelector(
    (state: RootState) => state.cart.singleCart
  );
  const weightTotal =
    singleCartData && singleCartData.length
      ? singleCartData[0].quantity * singleCartData[0].product_weight
      : 0;
  const checkout = useSelector((state: RootState) => state.checkout);

  //set catatan untuk penjual
  const debouncedDetails = useRef(
    debounce(async (e) => {
      dispatch(setOrderDetails({ note: e }));
    }, 300)
  ).current;

  useEffect(() => {
    return () => {
      debouncedDetails.cancel();
    };
  }, [debouncedDetails]);

  async function handleDetailsNote(e: React.ChangeEvent<HTMLTextAreaElement>) {
    debouncedDetails(e.target.value);
  }

  //set alamat pengiriman
  useEffect(() => {
    dispatch(
      setAddressDetails({
        id: addressSelected.id,
        person_name: addressSelected.person_name,
        person_phone: addressSelected.person_phone,
        province_id: addressSelected.province.id,
        city_id: addressSelected.city.id,
        subdistrict_id: addressSelected.subdistrict.id,
        postal_code: addressSelected.postal_code,
        street: addressSelected.street,
      })
    );
  }, [addressSelected, dispatch]);

  //set item checkout
  // console.log(checkout);
  useEffect(() => {
    if (singleCartData && singleCartData.length) {
      const singleGift = [
        {
          product_id: singleCartData[0].product_id,
          variant_id: singleCartData[0].variant_id,
          quantity: singleCartData[0].quantity,
        },
      ];
      dispatch(setOrderProductsDetails(singleGift));
    } else {
      dispatch(setOrderProductsDetails(products));
    }
  }, [singleCartData, products, dispatch]);

  useEffect(() => {
    if (expeditionSelected !== null) {
      setIsLoading(true);
      getCostsExpedition({
        weight: singleCartData && singleCartData.length ? weightTotal : weights,
        courier: expeditionSelected.name,
        destination_city: addressSelected.city.id,
      })
        .then((res) => {
          res !== undefined ? setCouriers(res) : setCouriers([]);
          setIsLoading(false);
        })
        .catch(() => {
          console.log("daftar expedisi tidak ditemukan");
          setIsLoading(false);
        });
    } else {
      setCouriers([]);
      setIsLoading(false);
    }
  }, [
    addressSelected,
    expeditionSelected,
    singleCartData,
    weightTotal,
    weights,
  ]);

  const handleAddressSelected = (e: FullAddressData) => {
    setAddressSelected(e);
  };

  const handleExpeditionChange = (e: any) => {
    setExpeditionSelected(e);
  };

  const handleCourier = (e: any) => {
    if (couriers.length !== 0) {
      setCourierSelected(e);
    } else {
      setCourierSelected(null);
    }
  };

  useEffect(() => {
    if (courierSelected !== null && expeditionSelected !== null) {
      dispatch(
        setShippingDetails({
          courier: expeditionSelected.name,
          service: courierSelected.service,
          description: courierSelected.description,
          destination: addressSelected.city.id,
          cost: courierSelected.cost[0].value,
          weight:
            singleCartData && singleCartData.length ? weightTotal : weights,
          etd: courierSelected.cost[0].etd,
        })
      );
    }
    if (expeditionSelected === null) {
      dispatch(
        setShippingDetails({
          destination: 0,
          courier: "",
          service: "",
          description: "",
          cost: 0,
          weight: 0,
          etd: "",
        })
      );
    }
  }, [
    addressSelected,
    courierSelected,
    dispatch,
    expeditionSelected,
    singleCartData,
    weightTotal,
    weights,
  ]);

  function rupiahCurrency(x: number) {
    return x.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
  }

  return (
    <div className="relative w-full py-3">
      <div className="w-full">
        <label
          htmlFor="note"
          className="block py-2 px-3 text-sm font-medium text-primary-dark "
        >
          Catatan
        </label>
        <Textarea
          id="note"
          name="note"
          placeholder="Catatan untuk penjual...(Opsional)."
          onChange={handleDetailsNote}
        />
      </div>
      <div className="w-full flex flex-col gap-3 mt-3">
        <div className="w-full">
          <div className="py-2 px-3">
            <h2 className="font-medium text-sm text-primary-dark">
              Pilih Alamat
            </h2>
          </div>
          <div>
            <RadioGroup value={addressSelected} onChange={setAddressSelected}>
              <RadioGroup.Label className="sr-only">
                Address {address.length !== 0 && address[0].person_name}
              </RadioGroup.Label>
              <div className="flex overflow-y-auto gap-3 scrollbar-style pb-3">
                {address.length !== 0
                  ? address.map((address, idx: number) => (
                      <RadioGroup.Option
                        key={idx}
                        value={address}
                        className={({ active, checked }) =>
                          ` 
                  ${checked ? "bg-primary text-white" : ""}
                    relative w-full max-w-sm shrink-0 h-auto flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none border`
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <div className="flex w-full items-start justify-between">
                              <div className="flex items-center">
                                <div className="text-sm">
                                  <RadioGroup.Label
                                    as="p"
                                    className={`uppercase  ${
                                      checked ? "font-bold" : ""
                                    }`}
                                  >
                                    <span className="capitalize">
                                      {`Alamat ${
                                        address.is_main === 1 ? "Utama" : "Lain"
                                      }`}
                                    </span>
                                  </RadioGroup.Label>
                                  <RadioGroup.Description
                                    as="div"
                                    className={`flex flex-col ${
                                      checked ? "text-sky-100" : "text-gray-500"
                                    }`}
                                  >
                                    <p className="flex gap-1 items-center">
                                      <MdPerson />
                                      <span className="block truncate">
                                        {address.person_name}
                                      </span>
                                    </p>

                                    <p className="flex gap-1 items-center">
                                      <MdPhone />
                                      <span className="block truncate">
                                        {address.person_phone}
                                      </span>
                                    </p>
                                    <p className="flex gap-1 items-start">
                                      <span className="shrink-0 py-1">
                                        <MdLocationOn />
                                      </span>
                                      <span className="block flex-wrap">{`${address.street}, ${address.subdistrict.name}, ${address.city.name}, ${address.province.name}, ${address.postal_code}`}</span>
                                    </p>
                                  </RadioGroup.Description>
                                </div>
                              </div>
                              <div className="shrink-0 w-6 text-white">
                                {checked && <CheckIcon className="h-6 w-6" />}
                              </div>
                            </div>
                          </>
                        )}
                      </RadioGroup.Option>
                    ))
                  : null}
              </div>
            </RadioGroup>
            {/* <AnimatePresence>
              <Listbox value={addressSelected} onChange={handleAddressSelected}>
                <div className="relative">
                  <Listbox.Button className="w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border border-primary-dark focus:outline-none focus-visible:border-primary-dark focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-light sm:text-sm">
                    <p>
                      <span className="block truncate">
                        {`${
                          addressSelected.is_main === 1
                            ? "Alamat Utama"
                            : "Alamat Lain"
                        } A/N ${addressSelected.person_name}`}
                      </span>
                    </p>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <MdOutlineUnfoldMore
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>

                  <Listbox.Options
                    as={motion.ul}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute z-30 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                  >
                    {address !== undefined &&
                      address.map((address, Idx) => (
                        <Listbox.Option
                          key={Idx}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active
                                ? "bg-primary-light text-secondary-dark"
                                : "text-gray-900"
                            }`
                          }
                          value={address}
                        >
                          {({ selected }) => (
                            <>
                              <p
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                <span className="block truncate">
                                  {address.person_name}
                                </span>
                                <span className="block truncate">
                                  {address.person_phone}
                                </span>
                                <span className="block truncate">{`${address.province.province_name}, ${address.city.city_name}, ${address.subdistrict.subdistrict_name}, ${address.address}`}</span>
                              </p>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-dark">
                                  <MdCheck
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            </AnimatePresence> */}
          </div>
        </div>
        <div className="w-full">
          <div className="py-2 px-3">
            <h2 className="font-medium text-sm text-primary-dark">
              Pilih Expedisi
            </h2>
          </div>
          <div className="p-1">
            <RadioGroup
              value={expeditionSelected}
              onChange={handleExpeditionChange}
            >
              <RadioGroup.Label className="sr-only">
                Expedisi{" "}
                {expeditionSelected !== null && expeditionSelected.label}
              </RadioGroup.Label>
              <div className="flex items-center flex-wrap gap-3">
                {Expedition.length !== 0
                  ? Expedition.map((exp, idx: number) => (
                      <RadioGroup.Option
                        key={idx}
                        value={exp}
                        className={({ active, checked }) =>
                          `
                  ${
                    checked
                      ? "border-primary text-primary dark:bg-primary dark:text-white"
                      : ""
                  }
                    relative w-max h-auto flex cursor-pointer rounded-lg px-5 py-4 shadow-md font-bold focus:outline-none border`
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <div className="flex w-full items-start gap-3 justify-between">
                              <div className="flex items-center text-sm">
                                <RadioGroup.Label
                                  as="p"
                                  className={`font-medium uppercase flex items-center gap-3 text-primary-dark`}
                                >
                                  <Image
                                    src={`/assets/icon/${exp.name}.png`}
                                    width={50}
                                    height={50}
                                    style={{ width: "auto", height: "24px" }}
                                    alt={`${exp.name}-expedition`}
                                  />
                                  <span className="capitalize">
                                    {`${exp.label}`}
                                  </span>
                                </RadioGroup.Label>
                              </div>
                              <div className="shrink-0 w-6">
                                {checked && (
                                  <div className="w-6 h-6 flex justify-center items-center text-primary bg-primary/25 dark:text-white dark:bg-white/25 rounded-full">
                                    <MdCheck className="w-4 h-4" />
                                  </div>
                                )}
                              </div>
                            </div>
                          </>
                        )}
                      </RadioGroup.Option>
                    ))
                  : null}
              </div>
            </RadioGroup>
            {/* <Listbox
              value={expeditionSelected}
              onChange={handleExpeditionChange}
            >
              <div className="relative">
                <Listbox.Button className="w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border border-primary-dark focus:outline-none focus-visible:border-primary-dark focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-light sm:text-sm">
                  <p>
                    <span className="block truncate">
                      {expeditionSelected.label}
                    </span>
                  </p>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <MdOutlineUnfoldMore
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Listbox.Options
                  as={motion.ul}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute z-30 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                >
                  {Expedition.length !== 0 &&
                    Expedition.map((expedition, Idx) => (
                      <Listbox.Option
                        key={Idx}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active
                              ? "bg-primary-light text-secondary-dark"
                              : "text-gray-900"
                          }`
                        }
                        value={expedition}
                      >
                        {({ selected }) => (
                          <>
                            <p
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {expedition.label}
                            </p>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-dark">
                                <MdCheck
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                </Listbox.Options>
              </div>
            </Listbox> */}
          </div>
        </div>
      </div>
      <div className="w-full py-3">
        {isLoading ? (
          <div className="w-max px-3 py-2 text-base font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full flex gap-3 items-center">
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-gray-200 animate-spin fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>{" "}
            <span className="animate-pulse">loading...</span>
          </div>
        ) : (
          <div className="w-full">
            <RadioGroup value={courierSelected} onChange={handleCourier}>
              <RadioGroup.Label className="sr-only">
                Expedisi {couriers.length !== 0 && couriers[0].code}
              </RadioGroup.Label>
              <div className="flex flex-wrap gap-3">
                {couriers.length !== 0
                  ? couriers[0].costs.map((courier, idx: number) => (
                      <RadioGroup.Option
                        key={idx}
                        value={courier}
                        className={({ active, checked }) =>
                          `
                  ${
                    checked
                      ? "border-primary text-primary dark:bg-primary dark:text-white"
                      : ""
                  }
                    relative shrink-0 w-max h-auto flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none border`
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <div className="flex w-full items-center justify-between gap-1">
                              <div className="flex items-center">
                                <div className="text-sm">
                                  <RadioGroup.Label
                                    as="p"
                                    className={`uppercase  ${
                                      checked ? "font-bold" : ""
                                    }`}
                                  >
                                    {couriers.length !== 0 && couriers[0].code}{" "}
                                    /{" "}
                                    <span className="text-sm capitalize">
                                      {courier.description}
                                    </span>
                                  </RadioGroup.Label>
                                  <RadioGroup.Description
                                    as="span"
                                    className={`inline `}
                                  >
                                    <span>
                                      {courier.cost.map((cost) =>
                                        rupiahCurrency(cost.value)
                                      )}
                                    </span>{" "}
                                    <span aria-hidden="true">&middot;</span>{" "}
                                    <span>
                                      Ekstimasi {courier.cost.map((e) => e.etd)}
                                    </span>
                                  </RadioGroup.Description>
                                </div>
                              </div>
                              <div className="shrink-0 text-primary bg-primary/25 dark:text-white dark:bg-white/25 w-6 rounded-full">
                                {checked && <CheckIcon className="h-6 w-6" />}
                              </div>
                            </div>
                          </>
                        )}
                      </RadioGroup.Option>
                    ))
                  : null}
              </div>
            </RadioGroup>
          </div>
        )}
      </div>
    </div>
  );
}

function CheckIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
