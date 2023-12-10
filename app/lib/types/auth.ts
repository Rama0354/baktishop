import {z} from 'zod'

const LoginSchema = z.object({
    email: z.string().email('email tidak sesuai').nonempty('email harus di isi'),
    password: z.string().nonempty('password tidak boleh kosong').min(6,'password terlalu pendek')
})

export const LoginFom = LoginSchema
export type LoginForm = z.infer<typeof LoginSchema>