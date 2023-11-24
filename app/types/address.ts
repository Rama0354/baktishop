import {z} from 'zod'

const AddressId = z.object({id:z.number().int().positive()})
const AddressMainSet = z.object({is_main:z.enum(['yes','no'])})
const AddressMain = z.object({is_main:z.number().int()})
 
// address
const AddressSchema = z.object({
    person_name: z.string(),
    person_phone: z.string(),
    province: z.object({
        id: z.number().int().positive(),
        province_name: z.string()
    }),
    city: z.object({
        id: z.number().int().positive(),
        city_name: z.string()
    }),
    subdistrict: z.object({
        id: z.number().int().positive(),
        subdistrict_name: z.string()
    }),
    postal_code: z.string(),
    address: z.string(),
})
const AddressUser = z.object({
    id: z.number().int().positive(),
    username: z.string(),
    email: z.string(),
    main_address_id: z.number().int().positive()
})

const FormAddressSchema = z.object({
    person_name: z.string(),
    person_phone: z.string(),
    province_id: z.number().int().positive(),
    city_id: z.number().int().positive(),
    subdistrict_id: z.number().int().positive(),
    postal_code: z.string(),
    address: z.string(),
})

// province
const ProvinceSchema = z.object({
    province_id: z.number().int().positive(),
    province_name: z.string()
})
const ProvincesSchema = z.array(ProvinceSchema)
// city
const CitySchema = z.object({
    city_id: z.number().int().positive(),
    city_name: z.string()
})
const CitiesSchema = z.array(CitySchema)
// subdistrict
const SubdistrictSchema = z.object({
    sbudistrict_id: z.number().int().positive(),
    sbudistrict_name: z.string()
})
const SubdistrictsSchema = z.array(SubdistrictSchema)

// export address
export const FullAddress = AddressSchema.extend({users: AddressUser}).merge(AddressId).merge(AddressMain)
export const FullAddressArray = z.array(FullAddress)
export const AddressData = AddressSchema.extend({users:AddressId}).merge(AddressId)
export const AddressArray = z.array(AddressData)

export type FullAddressArray = z.infer<typeof FullAddressArray>
export type AddressArray = z.infer<typeof AddressArray>
export type FullAddressData = z.infer<typeof FullAddress>
export type AddressData = z.infer<typeof AddressData>

export const FormAddAddressSchema = FormAddressSchema.merge(AddressId).merge(AddressMainSet)
export const FormEditAddressSchema = FormAddressSchema.merge(AddressId)
export const FormDeleteAddressSchema = AddressId

export type FormAddAddress = z.infer<typeof FormAddAddressSchema>
export type FormEditAddress = z.infer<typeof FormEditAddressSchema>
export type FormDeleteAddress = z.infer<typeof FormDeleteAddressSchema>

// export province
export const Province = ProvinceSchema
export const ProvinceArray = ProvincesSchema
// export city
export const City = CitySchema
export const CityArray = CitiesSchema
// export subdistrict
export const Subdistrict = SubdistrictSchema
export const SubdistrictArray = SubdistrictsSchema