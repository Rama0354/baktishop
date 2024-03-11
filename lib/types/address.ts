import { z } from "zod";

const AddressId = z.object({ id: z.number().int().positive() });
const AddressMainSet = z.object({ is_main: z.enum(["yes", "no"]) });
const AddressMain = z.object({ is_main: z.number().int() });

// address
const AddressSchema = z.object({
  person_name: z.string(),
  person_phone: z.string(),
  province: z.object({
    id: z.number().int().positive(),
    name: z.string(),
  }),
  city: z.object({
    id: z.number().int().positive(),
    name: z.string(),
  }),
  subdistrict: z.object({
    id: z.number().int().positive(),
    name: z.string(),
  }),
  postal_code: z.string(),
  street: z.string(),
});
const AddressUser = z.object({
  id: z.number().int().positive(),
  username: z.string(),
  email: z.string(),
  main_address_id: z.number().int().positive().nullable(),
});

const FormAddressSchema = z.object({
  user_id: z.number().int().positive().optional(),
  person_name: z.string().nonempty("Nama tidak boleh kosong"),
  person_phone: z.string().nonempty("Nomor tidak boleh kosong"),
  province_id: z.number().int().positive(),
  city_id: z.number().int().positive(),
  subdistrict_id: z.number().int().positive(),
  postal_code: z.string().nonempty("Kode Pos tidak boleh kosong"),
  street: z.string().nonempty("Alamat tidak boleh kosong"),
});

// province
const ProvinceSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
});
const ProvincesSchema = z.array(ProvinceSchema);
// city
const CitySchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
});
const CitiesSchema = z.array(CitySchema);
// subdistrict
const SubdistrictSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
});
const SubdistrictsSchema = z.array(SubdistrictSchema);

// export address
export const FullAddress = AddressSchema.extend({ users: AddressUser })
  .merge(AddressId)
  .merge(AddressMain);
export const FullAddressArray = z.array(FullAddress);
export const AddressData = AddressSchema.merge(AddressId).merge(AddressMain);
export const AddressArray = z.array(AddressData);

export type FullAddressArray = z.infer<typeof FullAddressArray>;
export type AddressArray = z.infer<typeof AddressArray>;
export type FullAddressData = z.infer<typeof FullAddress>;
export type AddressData = z.infer<typeof AddressData>;

export const FormAddAddressSchema = FormAddressSchema;
export const FormEditAddressSchema = FormAddressSchema.merge(AddressId);
export const FormDeleteAddressSchema = AddressId;

export type FormAddAddress = z.infer<typeof FormAddAddressSchema>;
export type FormEditAddress = z.infer<typeof FormEditAddressSchema>;
export type FormDeleteAddress = z.infer<typeof FormDeleteAddressSchema>;

// export province
export const Province = ProvinceSchema;
export const ProvinceArray = ProvincesSchema;
export type Province = z.infer<typeof ProvinceSchema>;
export type ProvinceArray = z.infer<typeof ProvincesSchema>;

// export city
export const City = CitySchema;
export const CityArray = CitiesSchema;
export type City = z.infer<typeof CitySchema>;
export type CityArray = z.infer<typeof CitiesSchema>;

// export subdistrict
export const Subdistrict = SubdistrictSchema;
export const SubdistrictArray = SubdistrictsSchema;
export type Subdistrict = z.infer<typeof SubdistrictSchema>;
export type SubdistrictArray = z.infer<typeof SubdistrictsSchema>;
