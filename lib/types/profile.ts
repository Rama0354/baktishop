import { z } from "zod";

const profileId = z.object({ id: z.number().int().positive() });
const profileAvatar = z.object({ avatar_url: z.string() });
const profileSchema = z.object({
  name: z.string().nonempty("Nama tidak boleh kosong"),
  birthdate: z.string().nonempty("Tanggal Lahir harus di atur"),
  phone_number: z
    .string()
    .nonempty("Noor telepon harus di isi")
    .max(12, "Tidak boleh lebih dari 12 Karakter"),
});
const userSchema = z.object({
  username: z.string(),
  email: z.string(),
});

export const UserProfile = userSchema.merge(profileId);
export const Profile = profileSchema.merge(profileId).merge(profileAvatar);
export const FullProfile = profileSchema
  .extend({ user: UserProfile })
  .merge(profileId)
  .merge(profileAvatar);

export const FormEditProfile = profileSchema.merge(profileId);

export type UserProfile = z.infer<typeof UserProfile>;
export type Profile = z.infer<typeof Profile>;
export type FullProfile = z.infer<typeof FullProfile>;

export type FormEditProfile = z.infer<typeof FormEditProfile>;

// const ChangeAvatarSchema = z.object({
//   profileId: z.number().min(1, { message: "Name is required" }),
//   avatar: z.custom<File>((v) => v instanceof File, {
//     message: "Image is required",
//   }),
// });

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const ACCEPTED_IMAGE_TYPES = ["jpeg", "jpg", "png", "webp"];
const ChangeAvatarSchema = z.object({
  id: z.number(),
  avatar: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, `Max image size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

export const FormChangeAvatar = ChangeAvatarSchema;

export type FormChangeAvatar = z.infer<typeof FormChangeAvatar>;
