import { z } from "zod";

const CheckoutDetailsSchema = z.object({
  note: z.string(),
});
const ShippingSchema = z.object({
  destination: z.number().int().positive(),
  weight: z.number().int().positive(),
  courier: z.string().nonempty("tidak boleh kosong"),
  service: z.string().nonempty("tidak boleh kosong"),
  description: z.string().nonempty("tidak boleh kosong"),
  cost: z.number().int().positive(),
  etd: z.string().nonempty("tidak boleh kosong"),
});

const CheckoutProductsSchema = z.array(
  z.object({
    product_id: z.number().int().positive(),
    variant_id: z.number().int().nullable().optional(),
    quantity: z.number().int().positive(),
  })
);

const CheckoutAddressSchema = z.object({
  id: z.number().int().positive(),
  person_name: z.string().nonempty("tidak boleh kosong"),
  person_phone: z.string().nonempty("tidak boleh kosong"),
  province_id: z.number().int().positive(),
  city_id: z.number().int().positive(),
  subdistrict_id: z.number().int().positive(),
  postal_code: z.string().nonempty("tidak boleh kosong"),
  street: z.string().nonempty("tidak boleh kosong"),
});

export const CheckoutDetails = CheckoutDetailsSchema;
export const CheckoutShipping = ShippingSchema;
export const CheckoutProducts = CheckoutProductsSchema;
export const CheckoutAddress = CheckoutAddressSchema;
export const CheckoutSchema = z
  .object({ order_details: CheckoutDetailsSchema })
  .extend({ order_products_details: CheckoutProductsSchema })
  .extend({ shipping_details: ShippingSchema })
  .extend({ address_details: CheckoutAddressSchema });

export type CheckoutDetails = z.infer<typeof CheckoutDetails>;
export type CheckoutShipping = z.infer<typeof CheckoutShipping>;
export type CheckoutProducts = z.infer<typeof CheckoutProducts>;
export type CheckoutAddress = z.infer<typeof CheckoutAddress>;
export type Checkout = z.infer<typeof CheckoutSchema>;
