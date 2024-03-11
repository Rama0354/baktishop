import * as z from "zod";

const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  image: z.string(),
  image_url: z.string(),
  sort: z.number(),
  status: z.string(),
});
const categoriesSchema = z.array(categorySchema);
const metaSchema = z.object({
  meta: z.object({
    current_page: z.number(),
    from: z.number(),
    last_page: z.number(),
    per_page: z.number(),
    to: z.number(),
    total: z.number(),
  }),
});
export const categoriesList = z
  .object({
    data: categoriesSchema,
  })
  .merge(metaSchema);
export type categoriesList = z.infer<typeof categoriesList>;

export const singleCategory = categorySchema;
export type singleCategory = z.infer<typeof singleCategory>;

const GiftImageByCategorySchema = z.object({
  id: z.number(),
  item_gift_id: z.number(),
  variant_id: z.number().nullable(),
  item_gift_image_url: z.string(),
  item_gift_image_thumb_url: z.string(),
});

const GiftByCategory = z.object({
  id: z.number(),
  item_gift_code: z.string(),
  item_gift_name: z.string(),
  item_gift_slug: z.string(),
  fitem_gift_point: z.string(),
  item_gift_quantity: z.number(),
  item_gift_status: z.string(),
  total_reviews: z.number(),
  total_rating: z.number(),
  total_redeem: z.number(),
  is_wishlist: z.number(),
});

export const GiftCardByCategory = GiftByCategory.extend({
  item_gift_images: z.array(GiftImageByCategorySchema),
});
export const GiftCardsByCategory = z.array(GiftCardByCategory);

export type GiftCardByCategory = z.infer<typeof GiftCardByCategory>;
export type GiftCardsByCategory = z.infer<typeof GiftCardsByCategory>;
