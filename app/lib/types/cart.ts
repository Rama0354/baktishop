import {z} from 'zod'

const CartSchema = z.object({
    item_gifts: z.object({
        id: z.number().int().positive(),
        item_gift_name: z.string(),
        item_gift_slug: z.string(),
        item_gift_point: z.number(),
        fitem_gift_point: z.string(),
        item_gift_weight: z.number(),
        fitem_gift_weight: z.string(),
        item_gift_status: z.string(),
        item_gift_images: z.array(
            z.object({
                item_gift_id: z.number().int().positive(),
                variant_id: z.number().int().positive().nullable(),
                item_gift_image_url: z.string(),
                item_gift_image_thumbnail_url: z.string()
            }),
        )
    }),
    variants: z.object({
        id: z.number().int().positive(),
        variant_name: z.string(),
        variant_slug: z.string(),
        variant_quantity: z.number().int().positive(),
        variant_point: z.number().int(),
        fvariant_point: z.string(),
        variant_weight: z.number().int().positive(),
        fvariant_weight: z.string(),
        variant_image: z.object({
            id: z.number().int().positive(),
            image_url: z.string(),
            image_thumb_url: z.string()
        })
    }).nullable()
})

const FormAddCartSchema = z.object({
    item_gift_id:z.number().int().positive(),
    variant_id:z.number().int().positive().nullable(),
    cart_quantity:z.number().int().positive()
})

const CartId = z.object({id: z.string()})
const CartQuantity = z.object({cart_quantity: z.number().int().positive()})

export const Cart = CartSchema.merge(CartQuantity).merge(CartId)
export const CartArray = z.array(CartSchema.merge(CartQuantity).merge(CartId))

export type Cart = z.infer<typeof Cart>
export type CartArray = z.infer<typeof CartArray>

export const FormAddCart = FormAddCartSchema
export const FormEditCart = CartId.merge(CartQuantity)
export const FormDeleteCart = CartId

export type FormAddCart = z.infer<typeof FormAddCart>
export type FormEditCart = z.infer<typeof FormEditCart>
export type FormDeleteCart = z.infer<typeof FormDeleteCart>

export type CartType = {
    cart_id: string;
    product_id: number;
    product_name: string;
    product_image: string;
    varian_id?: number;
    varian_name?: string;
    product_weight: number;
    product_quantity: number;
    product_price: number;
}