import {z} from 'zod'

// login
const LoginSchema = z.object({
    email: z.string().email('email tidak sesuai').nonempty('email harus di isi'),
    password: z.string().nonempty('password tidak boleh kosong').min(6,'password terlalu pendek')
})

export const LoginFom = LoginSchema
export type LoginForm = z.infer<typeof LoginSchema>

// register
const FormRegisterSchema = z.object({
    name:z.string().nonempty('Nama harus di isi'),
    username:z.string().nonempty('Username harus di isi').regex(/^[a-z0-9]+$/,'hanya boleh angka dan huruf kecil saja'),
    email:z.string().email().nonempty('Email harus di isi'),
    birthdate:z.string().nonempty('Tanggal lahir harus di isi'),
    password:z.string().min(8,'Password minimal 8 karakter'),
    password_confirmation:z.string().min(8,'Password minimal 8 karakter')
}).refine((data)=>data.password === data.password_confirmation,{
    message:'Password tidak sama!',
    path:['password_confirmation']
})

export const FormRegister = FormRegisterSchema
export type FormRegister = z.infer<typeof FormRegister>