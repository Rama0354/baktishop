import {z} from 'zod'

const profileId = z.object({id: z.number().int().positive()})
const profileAvatar = z.object({avatar_url: z.string()})
const profileSchema = z.object({
    name: z.string(),
    birthdate: z.string(),
    phone_number: z.string(),
    avatar_url: z.string()
})
const userSchema = z.object({
    username: z.string(),
    email: z.string()
})

export const UserProfile = userSchema.merge(profileId)
export const Profile = profileSchema.merge(profileId).merge(profileAvatar)
export const FullProfile = profileSchema.extend({user:UserProfile}).merge(profileId).merge(profileAvatar)

export type UserProfile = z.infer<typeof UserProfile>
export type Profile = z.infer<typeof Profile>
export type FullProfile = z.infer<typeof FullProfile>