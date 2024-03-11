import * as z from "zod";

const wishSchema = z.object({
  id: z.string(),
  products: z.object({
    id: z.number(),
    code: z.string(),
    name: z.string(),
    slug: z.string(),
    category: z
      .object({
        name: z.string(),
        slug: z.string(),
      })
      .nullable(),
    brand: z
      .object({
        name: z.string(),
        slug: z.string(),
      })
      .nullable(),
    fpoint: z.string(),
    fweight: z.string(),
    quantity: z.number(),
    status: z.string(),
    product_images: z.array(
      z
        .object({
          product_id: z.number(),
          variant_id: z.number().nullable(),
          image_url: z.string(),
          image_thumbnail_url: z.string(),
        })
        .nullable()
    ),
    total_review: z.number(),
    total_rating: z.number(),
    total_order: z.number(),
    is_wishlist: z.number(),
  }),
});

const metaSchema = z.object({
  current_page: z.number(),
  from: z.number(),
  last_page: z.number(),
  per_page: z.number(),
  to: z.number(),
  total: z.number(),
});

const wishListSchema = z.array(wishSchema);

export const wishData = wishSchema;
export const wishList = z.object({
  data: wishListSchema,
  meta: metaSchema,
});
export type wishData = z.infer<typeof wishData>;
export type wishList = z.infer<typeof wishList>;
