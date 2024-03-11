"use client";
import {
  editAddress,
  getAllCity,
  getAllProvince,
  getAllSubdistrict,
} from "@/lib/utils/action/AddressActions";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";
import {
  AddressData,
  CityArray,
  FormEditAddress,
  FormEditAddressSchema,
  ProvinceArray,
  SubdistrictArray,
} from "@/lib/types/address";
import toast from "react-hot-toast";
import ModalContent from "@/components/ModalContent";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function EditAddressForm({
  onClose,
  data,
}: {
  onClose: () => void;
  data: AddressData | null;
}) {
  const [provinces, setProvinces] = useState<ProvinceArray>([]);
  const [cities, setCities] = useState<CityArray>([]);
  const [subdistricts, setSubdistricts] = useState<SubdistrictArray>([]);
  const [provinceSelected, setProvinceSelected] = useState<number>(0);
  const [citySelected, setCitySelected] = useState<number>(0);

  const form = useForm<FormEditAddress>({
    resolver: zodResolver(FormEditAddressSchema),
  });
  const isLoading = form.formState.isLoading;

  useEffect(() => {
    if (data !== null) {
      form.setValue("id", data.id);
      form.setValue("person_name", data.person_name);
      form.setValue("person_phone", data.person_phone);
      if (provinceSelected !== 0) {
        form.setValue("province_id", provinceSelected);
      } else {
        form.setValue("province_id", data.province.id);
      }
      form.setValue("postal_code", data.postal_code);
      form.setValue("street", data.street);
      if (cities.length !== 0 && provinceSelected === 0 && citySelected === 0) {
        form.setValue("city_id", data.city.id);
      } else {
        form.setValue("city_id", citySelected);
      }
      if (
        subdistricts.length !== 0 &&
        provinceSelected === 0 &&
        citySelected === 0
      ) {
        form.setValue("subdistrict_id", data.subdistrict.id);
      } else {
        form.setValue("subdistrict_id", 0);
      }
    }
  }, [cities, subdistricts, provinceSelected, citySelected, data, form]);

  useEffect(() => {
    getAllProvince()
      .then((res) => {
        if (res !== undefined) {
          setProvinces(res);
        }
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    // Fetch cities based on selected province
    if (data !== null && data.province.id !== 0) {
      getAllCity(data.province.id)
        .then((res) => {
          if (res !== undefined) {
            setCities(res);
          }
        })
        .catch((error) => console.log(error));
    }
    if (provinceSelected) {
      getAllCity(provinceSelected)
        .then((res) => {
          if (res !== undefined) {
            setCities(res);
          }
        })
        .catch((error) => console.log(error));
    } else {
      setCities([]);
    }
  }, [data, provinceSelected]);

  useEffect(() => {
    // Fetch subdistricts based on selected city
    if (data !== null && data.city.id !== 0) {
      getAllSubdistrict(data.city.id)
        .then((res) => {
          if (res !== undefined) {
            setSubdistricts(res);
          }
        })
        .catch((error) => console.log(error));
    }
    if (citySelected) {
      getAllSubdistrict(citySelected)
        .then((res) => {
          if (res !== undefined) {
            setSubdistricts(res);
          }
        })
        .catch((error) => console.log(error));
    } else {
      setSubdistricts([]);
    }
  }, [data, citySelected]);
  const onSubmit = async (data: FormEditAddress) => {
    await editAddress(data)
      .then(() => {
        toast.success("Berhasil Diubah");
        onClose();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Ada Masalah");
      });
  };

  return (
    <ModalContent closeModal={onClose} title="Edit Alamat">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="person_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} placeholder="Budi" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="person_phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>No. Telp</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="0813123123123"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="province_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Provinsi</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? provinces.find(
                                (province) => province.id === field.value
                              )?.name
                            : "Pilih Provinsi"}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent side="bottom" className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Cari Provinsi..."
                          className="h-9"
                        />
                        <CommandEmpty>Provinsi tidak ada.</CommandEmpty>
                        <CommandGroup>
                          {provinces.length !== 0 ? (
                            <ScrollArea className="h-48">
                              {provinces.map((province) => (
                                <CommandItem
                                  value={province.id as any}
                                  key={province.id}
                                  onSelect={() => {
                                    form.setValue("province_id", province.id);
                                    setProvinceSelected(
                                      parseInt(province.id as any)
                                    );
                                    form.setValue("city_id", 0);
                                    form.setValue("subdistrict_id", 0);
                                  }}
                                >
                                  {province.name}
                                  <CheckIcon
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      province.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </ScrollArea>
                          ) : (
                            <CommandItem> Loading...</CommandItem>
                          )}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kota/Kabupaten</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? cities.find((city) => city.id === field.value)
                                ?.name
                            : "Pilih Kota"}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent side="bottom" className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Cari Kota..."
                          className="h-9"
                        />
                        <CommandEmpty>Tidak ada Kota/Kab.</CommandEmpty>
                        <CommandGroup>
                          {cities.length !== 0 ? (
                            <ScrollArea className="h-48">
                              {cities.map((city) => (
                                <CommandItem
                                  value={city.id as any}
                                  key={city.id}
                                  onSelect={() => {
                                    form.setValue("city_id", city.id);
                                    setCitySelected(parseInt(city.id as any));
                                    form.setValue("subdistrict_id", 0);
                                  }}
                                >
                                  {city.name}
                                  <CheckIcon
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      city.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </ScrollArea>
                          ) : (
                            <CommandItem> Loading...</CommandItem>
                          )}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subdistrict_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kecamatan</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? subdistricts.find(
                                (subdistrict) => subdistrict.id === field.value
                              )?.name
                            : "Pilih Kecamatan"}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opasubdistrict-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent side="bottom" className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Cari Kecamatan..."
                          className="h-9"
                        />
                        <CommandEmpty>Tidak ada Kecamatan.</CommandEmpty>
                        <CommandGroup>
                          {subdistricts.length !== 0 ? (
                            <ScrollArea className="h-48">
                              {subdistricts.map((subdistrict) => (
                                <CommandItem
                                  value={subdistrict.id as any}
                                  key={subdistrict.id}
                                  onSelect={() => {
                                    form.setValue(
                                      "subdistrict_id",
                                      subdistrict.id
                                    );
                                  }}
                                >
                                  {subdistrict.name}
                                  <CheckIcon
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      subdistrict.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </ScrollArea>
                          ) : (
                            <CommandItem> Loading...</CommandItem>
                          )}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postal_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kode Pos</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="60000"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alamat Lengkap</FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
                    disabled={isLoading}
                    placeholder="Jl. Raya harapan No. 0, RT 00 RW 00"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            size={"lg"}
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Proses" : "Simpan"}
          </Button>
        </form>
      </Form>
      {/* <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <input
            type="text"
            {...register("id")}
            className="hidden pointer-events-none"
          />
          <div>
            <label
              htmlFor="person_name"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Nama Penerima
            </label>
            <input
              type="text"
              id="person_name"
              {...register("person_name")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="John"
            />
            {errors.person_name && (
              <p className="text-xs italic text-red-500 mt-2">
                {" "}
                {errors.person_name?.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="person_phone"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Nomor Telp
            </label>
            <input
              type="text"
              id="person_phone"
              {...register("person_phone")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="081300000000"
            />
            {errors.person_phone && (
              <p className="text-xs italic text-red-500 mt-2">
                {" "}
                {errors.person_phone?.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="province"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Provinsi
            </label>
            <select
              id="province"
              {...register("province_id", { valueAsNumber: true })}
              onChange={(e) => {
                setProvinceSelected(parseInt(e.target.value));
                setValue("city_id", 0);
                setValue("subdistrict_id", 0);
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              <option value="0">Pilih Provinsi</option>
              {provinces && provinces.length !== 0
                ? provinces.map((province, idx: number) => (
                    <option key={idx} value={province.province_id}>
                      {province.province_name}
                    </option>
                  ))
                : null}
            </select>
            {errors.province_id && (
              <p className="text-xs italic text-red-500 mt-2">
                {" "}
                {errors.province_id.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="city"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Kota
            </label>
            <select
              id="city"
              {...register("city_id", { valueAsNumber: true })}
              onChange={(e) => {
                setCitySelected(parseInt(e.target.value));
                setValue("subdistrict_id", 0);
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              <option value="0">Pilih Kota</option>
              {cities && cities.length !== 0
                ? cities.map((city, idx: number) => (
                    <option key={idx} value={city.city_id}>
                      {city.city_name}
                    </option>
                  ))
                : null}
            </select>
            {errors.city_id && (
              <p className="text-xs italic text-red-500 mt-2">
                {" "}
                {errors.city_id.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="subdistrict"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Kecamatan
            </label>
            <select
              id="subdistrict"
              {...register("subdistrict_id", { valueAsNumber: true })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              <option value="0">Pilih Kecamatan</option>
              {subdistricts && subdistricts.length !== 0
                ? subdistricts.map((subdistrict, idx: number) => (
                    <option key={idx} value={subdistrict.subdistrict_id}>
                      {subdistrict.subdistrict_name}
                    </option>
                  ))
                : null}
            </select>
            {errors.subdistrict_id && (
              <p className="text-xs italic text-red-500 mt-2">
                {" "}
                {errors.subdistrict_id.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="postal_code"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Kode Pos
            </label>
            <input
              type="text"
              id="postal_code"
              {...register("postal_code")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="61174"
            />
            {errors.postal_code && (
              <p className="text-xs italic text-red-500 mt-2">
                {" "}
                {errors.postal_code?.message}
              </p>
            )}
          </div>
        </div>
        <div className="mb-6">
          <label
            htmlFor="address"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Alamat Lengkap
          </label>
          <input
            type="text"
            id="address"
            {...register("address")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="Jl. Raya Menganti No. 133, menganti"
          />
          {errors.address && (
            <p className="text-xs italic text-red-500 mt-2">
              {" "}
              {errors.address?.message}
            </p>
          )}
        </div>
        <div className="w-full flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="text-white bg-primary-dark hover:bg-secondary-dark focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:bg-slate-500 font-medium rounded-lg text-sm w-full sm:max-w-xs px-5 py-2.5 text-center "
          >
            {isSubmitting ? "Menyimpan" : "Simpan"}
          </button>
        </div>
      </form>
      <DevTool control={control} /> */}
    </ModalContent>
  );
}
