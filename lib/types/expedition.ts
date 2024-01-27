import {z} from 'zod'

const ExpeditionSchema = z.object({
    code: z.string(),
    name: z.string(),
})

const CostsSchema = z.object({
    service: z.string(),
    description: z.string(),
})
const CostSchema = z.object({
    value: z.number().int().positive(),
    etd: z.string(),
    note: z.string()
})

const FormExpeditionSchema = z.object({
    origin_city:z.number().int().positive().min(1,'Kota asal belum dipilih').optional(),
    destination_city:z.number().int().positive().min(1,'Kota tujuan belum dipilih'),
    weight:z.number().int().positive().min(1,'berat tidak sesuai'),
    courier:z.string().toLowerCase().nonempty('kurir belum dipilih')
})

export const Expedition = ExpeditionSchema.extend({costs:z.array(CostsSchema.extend({cost:z.array(CostSchema)}))})
export const ExpeditionDetail = CostsSchema.extend({cost:z.array(CostSchema)})
export const ExpeditionArray = z.array(Expedition)
export type Expedition = z.infer<typeof Expedition>
export type ExpeditionDetail = z.infer<typeof ExpeditionDetail>
export type ExpeditionArray = z.infer<typeof ExpeditionArray>

export const FormGetExpedition = FormExpeditionSchema
export type FormGetExpedition = z.infer<typeof FormGetExpedition>