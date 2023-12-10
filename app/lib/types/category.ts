import {z} from 'zod'

const SingleCategorySchema = z.object({
    category_name: z.string(),
    category_slug: z.string(),
    category_image_url: z.string()
})

export const SingleCategory = SingleCategorySchema
export type SingleCategory = z.infer<typeof SingleCategory>

const GiftImageByCategorySchema = z.object({
    id: z.number(),
    item_gift_id: z.number(),
    variant_id: z.number().nullable(),
    item_gift_image_url: z.string(),
    item_gift_image_thumb_url: z.string()
})

const GiftByCategory = z.object({
    id: z.number(),
    item_gift_code:z.string(),
    item_gift_name: z.string(),
    item_gift_slug: z.string(),
    fitem_gift_point: z.string(),
    item_gift_quantity: z.number(),
    item_gift_status: z.string(),
    total_reviews: z.number(),
    total_rating: z.number(),
    total_redeem: z.number(),
    is_wishlist: z.number()
})

export const GiftCardByCategory = GiftByCategory.extend({item_gift_images:z.array(GiftImageByCategorySchema)})
export const GiftCardsByCategory = z.array(GiftCardByCategory)

export type GiftCardByCategory = z.infer<typeof GiftCardByCategory>
export type GiftCardsByCategory = z.infer<typeof GiftCardsByCategory>