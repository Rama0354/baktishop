import {z} from 'zod'

const CheckoutDetailsSchema = z.object({
    note: z.string()
})
const ShippingSchema = z.object({
    shipping_destination: z.number().int().positive(),
    shipping_weight: z.number().int().positive(),
    shipping_courier: z.string().nonempty('tidak boleh kosong'),
    shipping_service: z.string().nonempty('tidak boleh kosong'),
    shipping_description: z.string().nonempty('tidak boleh kosong'),
    shipping_cost: z.number().int().positive(),
    shipping_etd: z.string().nonempty('tidak boleh kosong')
})

const CheckoutGiftsSchema = z.array(
    z.object({
        item_gift_id: z.number().int().positive(),
        redeem_quantity: z.number().int().positive(),
        variant_id: z.number().int().nullable().optional(),
    })
)

const CheckoutAddressSchema = z.object({
    id: z.number().int().positive(),
    person_name: z.string().nonempty('tidak boleh kosong'),
    person_phone: z.string().nonempty('tidak boleh kosong'),
    province_id: z.number().int().positive(),
    city_id: z.number().int().positive(),
    subdistrict_id: z.number().int().positive(),
    postal_code: z.string().nonempty('tidak boleh kosong'),
    address: z.string().nonempty('tidak boleh kosong')
})

export const CheckoutDetails = CheckoutDetailsSchema
export const CheckoutShipping = ShippingSchema
export const CheckoutGifts = CheckoutGiftsSchema
export const CheckoutAddress = CheckoutAddressSchema
export const CheckoutSchema = z.object({redeem_details:CheckoutDetailsSchema}).extend({redeem_item_gifts_details:CheckoutGiftsSchema}).extend({shipping_details:ShippingSchema}).extend({address_details:CheckoutAddressSchema})

export type CheckoutDetails = z.infer<typeof CheckoutDetails>
export type CheckoutShipping = z.infer<typeof CheckoutShipping>
export type CheckoutGifts = z.infer<typeof CheckoutGifts>
export type CheckoutAddress = z.infer<typeof CheckoutAddress>
export type Checkout = z.infer<typeof CheckoutSchema>