import {z} from 'zod'

const GiftIdSchema = z.object({id:z.number().int().positive()})

const GiftSchema = z.object({
    item_gift_code: z.string(),
    item_gift_name: z.string(),
    item_gift_slug: z.string(),
    fitem_gift_point: z.string(),
    item_gift_quantity: z.number().int().positive(),
    item_gift_status: z.string(),
    total_reviews: z.number().int(),
    total_rating: z.number(),
    total_redeem: z.number().int(),
    is_wishlist: z.number().int()
})

const GiftOtherSchema = z.object({
    item_gift_description: z.string(),
    item_gift_spesification: z.array(
        z.object({
            key: z.string(),
            value: z.string()
        })
    ).nullable(),
    item_gift_point: z.number().int().positive(),
    item_gift_weight: z.number().int().positive(),
    fitem_gift_weight: z.string(),
})

const GiftCategorySchema = z.object({
    category_code: z.string(),
    category_name: z.string(),
    category_slug: z.string(),
    category_image: z.string(),
    category_sort: z.number().int().positive(),
    category_status: z.string(),
    category_image_url: z.string()
})

const GiftBrandSchema = z.object({
    brand_name: z.string(),
    brand_slug: z.string(),
    brand_logo: z.string(),
    brand_sort: z.number().int().positive(),
    brand_logo_url: z.string()
})
const GiftImage = z.object({
    id: z.number().int().positive(),
    item_gift_id: z.number().int().positive(),
    variant_id: z.number().int().positive().nullable(),
    item_gift_image_url: z.string(),
    item_gift_image_thumb_url: z.string()
})
const GiftImages = z.array(GiftImage)

const GiftVariant = z.object({
    variant_name: z.string(),
    variant_slug: z.string(),
    variant_quantity: z.number().int().positive(),
    variant_point: z.number().int().positive(),
    fvariant_point:z.string(),
    variant_weight: z.number().int().positive(),
    fvariant_weight: z.string(),
    variant_image: z.object({
        image_url: z.string(),
        image_thumb_url: z.string()
    })
})

const GiftsMeta = z.object({
    current_page: z.number().int(),
    from: z.number().int(),
    last_page: z.number().int(),
    per_page: z.number().int(),
    to: z.number().int(),
    total: z.number().int()
})

export const GiftCardType = GiftSchema.merge(GiftIdSchema).extend({item_gift_images: GiftImages})
export const GiftCardArray = z.array(GiftCardType)
export const GiftCardApi = z.object({data:GiftCardArray,meta:GiftsMeta})

export type GiftCardType = z.infer<typeof GiftCardType>
export type GiftCardArray = z.infer<typeof GiftCardArray>
export type GiftCardApi = z.infer<typeof GiftCardApi>