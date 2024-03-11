import { z } from "zod";

const EmailSchema = z.object({
  email: z.string().email("email tidak sesuai").nonempty("email harus di isi"),
});
const PasswordSchema = z.object({
  password: z
    .string()
    .nonempty("password tidak boleh kosong")
    .min(6, "password terlalu pendek"),
});
const ConfirmPassword = z.object({
  password: z.string().min(8, "Password minimal 8 karakter"),
  password_confirmation: z.string().min(6, "Password minimal 6 karakter"),
});

// login
const LoginSchema = z.object({
  email: z.string().email("email tidak sesuai").nonempty("email harus di isi"),
  password: z
    .string()
    .nonempty("password tidak boleh kosong")
    .min(6, "password terlalu pendek"),
});

// register
const FormRegisterSchema = z.object({
  name: z.string().nonempty("Nama harus di isi"),
  username: z
    .string()
    .nonempty("Username harus di isi")
    .regex(/^[a-z0-9]+$/, "hanya boleh angka dan huruf kecil saja"),
  email: z.string().email().nonempty("Email harus di isi"),
  birthdate: z.string({ required_error: "Tanggal Lahir harus di Isi" }),
  "g-recaptcha-response": z.string(),
});
const RegisterSchema = z.object({
  name: z.string().nonempty("Nama harus di isi"),
  username: z
    .string()
    .nonempty("Username harus di isi")
    .regex(/^[a-z0-9]+$/, "hanya boleh angka dan huruf kecil saja"),
  email: z.string().email().nonempty("Email harus di isi"),
  birthdate: z.string().nonempty("Tanggal Lahir Tidak Boleh kosong"),
});

export const FormRegister = FormRegisterSchema.merge(ConfirmPassword).refine(
  (data) => data.password === data.password_confirmation,
  {
    message: "Password tidak sama!",
    path: ["password_confirmation"],
  }
);
export const RegisterActionSchema = RegisterSchema.merge(
  ConfirmPassword
).refine((data) => data.password === data.password_confirmation, {
  message: "Password tidak sama!",
  path: ["password_confirmation"],
});

export const LoginFom = EmailSchema.merge(PasswordSchema);
export const FormForgotPass = EmailSchema;
export const FormResetPass = z
  .object({
    token: z.string(),
  })
  .merge(ConfirmPassword)
  .refine((data) => data.password === data.password_confirmation, {
    message: "Password tidak sama!",
    path: ["password_confirmation"],
  });

export type LoginForm = z.infer<typeof LoginSchema>;

export type FormRegister = z.infer<typeof FormRegister>;
export type RegisterActionSchema = z.infer<typeof RegisterActionSchema>;

export type FormForgotPass = z.infer<typeof FormForgotPass>;
export type FormResetPass = z.infer<typeof FormResetPass>;
