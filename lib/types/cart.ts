import { z } from "zod";

const productSchema = z.object({
  products: z.object({
    id: z.number(),
    code: z.string(),
    name: z.string(),
    slug: z.string(),
    category: z
      .object({
        id: z.number(),
        name: z.string(),
        slug: z.string(),
      })
      .nullable(),
    brand: z
      .object({
        id: z.number(),
        name: z.string(),
        slug: z.string(),
      })
      .nullable(),
    point: z.number(),
    fpoint: z.string(),
    weight: z.number(),
    fweight: z.string(),
    status: z.string(),
    product_images: z
      .array(
        z.object({
          product_id: z.number(),
          variant_id: z.number().int().positive().nullable(),
          image_url: z.string(),
          // image_thumbnail_url: z.string(),
        })
      )
      .default([]),
  }),
});

const variantSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    quantity: z.number(),
    point: z.number(),
    fpoint: z.string(),
    weight: z.number(),
    fweight: z.string(),
    variant_images: z
      .object({ id: z.number(), image_url: z.string() })
      .nullable(),
  })
  .nullable();

const userSchema = z.object({
  users: z.object({
    id: z.number(),
    username: z.string(),
    email: z.string(),
    profile: z.object({
      id: z.number(),
      name: z.string(),
      avatar_url: z.string().nullable(),
    }),
  }),
});

const cartSchema = z.object({
  id: z.string(),
  quantity: z.number(),
  created_at: z.string(),
});
const metaSchema = z.object({
  current_page: z.number(),
  from: z.number(),
  last_page: z.number(),
  per_page: z.number(),
  to: z.number(),
  total: z.number(),
});

export const cartsSort = z.object({
  data: z.array(
    cartSchema.merge(productSchema).extend({ variants: variantSchema })
  ),
  meta: metaSchema,
});
export const cartListSort = z
  .array(cartSchema.merge(productSchema).extend({ variants: variantSchema }))
  .default([]);
export type cartsSort = z.infer<typeof cartsSort>;
export type cartListSort = z.infer<typeof cartListSort>;

const FormAddCartSchema = z.object({
  product_id: z.number().int().positive(),
  variant_id: z.number().int().positive().nullable(),
  quantity: z.number().int().positive(),
});

const CartId = z.object({ id: z.string() });
const CartQuantity = z.object({ cart_quantity: z.number().int().positive() });

export const FormAddCart = FormAddCartSchema;
export const CartGiftsCheckout = z.array(FormAddCartSchema);
export const FormEditCart = CartId.merge(CartQuantity);
export const FormDeleteCart = CartId;

export type FormAddCart = z.infer<typeof FormAddCart>;
export type CartGiftsCheckout = z.infer<typeof CartGiftsCheckout>;
export type FormEditCart = z.infer<typeof FormEditCart>;
export type FormDeleteCart = z.infer<typeof FormDeleteCart>;

//cart data slice
export const CartData = z.object({
  id: z.string(),
  product_id: z.number(),
  product_name: z.string(),
  product_image: z.string(),
  variant_id: z.number().optional(),
  variant_name: z.string().optional(),
  product_weight: z.number(),
  product_point: z.number(),
  quantity: z.number(),
});
export const CartsData = z.array(CartData);

export type CartData = z.infer<typeof CartData>;
export type CarstData = z.infer<typeof CartsData>;

//add cart data slice
export const FormAddCartData = z.object({
  product_id: z.number().int().positive(),
  variant_id: z.number().int().positive().nullable(),
  quantity: z.number().int().positive(),
});
export type FormAddCartData = z.infer<typeof FormAddCartData>;

export const FormAddCartFull = z.object({
  id: z.string(),
  product_id: z.number().positive(),
  product_name: z.string(),
  product_image: z.string(),
  variant_id: z.number().positive().optional(),
  variant_name: z.number().positive().optional(),
  product_weight: z.number(),
  product_point: z.number().positive(),
  quantity: z.number(),
});
export type FormAddCartFull = z.infer<typeof FormAddCartFull>;
