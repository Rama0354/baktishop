'use server'

import { options } from "@/app/api/auth/[...nextauth]/options"
import { CityArray, FormAddAddress, FormDeleteAddress, FormEditAddress, FullAddressArray, ProvinceArray, SubdistrictArray } from "@/app/lib/types/address"
import axios from "axios"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"

export const getAllProvince =async (): Promise<ProvinceArray | undefined> => {
    try {
        const res = await axios.get(`${process.env.BACKEND_API}/province?per_page=50`)
        const datas: ProvinceArray = await res.data.data;
        const parseData = ProvinceArray.parse(datas);
        return parseData;
    } catch (error:any) {
        if(error.response !== undefined){
            console.log(error.response.data)
        }
    }
}
export const getAllCity =async (province_id:number):Promise<CityArray | undefined> => {
    try {
        const res = await axios.get(`${process.env.BACKEND_API}/city?per_page=50&search_column[0]=province_id&search_text[0]=${province_id}&search_operator[0]==`)
        const datas: CityArray = await res.data.data;
        const parseData = CityArray.parse(datas);
        return parseData;
    } catch (error:any) {
        if(error.response !== undefined){
            console.log(error.response.data)
        }
    }
}
export const getAllSubdistrict =async (city_id:number):Promise<SubdistrictArray | undefined> => {
    try {
        const res = await axios.get(`${process.env.BACKEND_API}/subdistrict?per_page=50&search_column[0]=city_id&search_text[0]=${city_id}&search_operator[0]==`)
        const datas: SubdistrictArray = await res.data.data;
        const parseData = SubdistrictArray.parse(datas);
        return parseData;
    } catch (error:any) {
        if(error.response !== undefined){
            console.log(error.response.data)
        }
    }
}

export const getAddresses = async (): Promise<FullAddressArray | undefined> => {
    try {
        const session = await getServerSession(options);
        const res = await axios.get(`${process.env.BACKEND_API}/address`, {
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session && session.accessToken}`,
            },
        });
        const datas: FullAddressArray = await res.data.data;
        const parseData = FullAddressArray.parse(datas);
        return parseData;
    } catch (error:any) {
        if(error.response !== undefined){
            console.log(error.response.data)
        }
    }
}

export const addAddress =async (data:FormAddAddress) => {
    try {
            const session = await getServerSession(options)
            const res = await axios.post(`${process.env.BACKEND_API}/address`,{
                user_id: session && session.user.id,
                person_name: data.person_name,
                person_phone: data.person_phone,
                province_id:data.province_id,
                city_id: data.city_id,
                subdistrict_id: data.subdistrict_id,
                postal_code: data.postal_code,
                address: data.address,
            },{
                headers:{
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${session && session.accessToken}`
                }
            })
            return res.data
    } catch (error:any) {
        if(error.response !== undefined){
            console.log(error.response.data)
        }
    }finally{
        revalidatePath('/users/address')
    }
}
export const editAddress =async (data:FormEditAddress) => {
    try {
        const session = await getServerSession(options)
        const res = await axios.put(`${process.env.BACKEND_API}/address/${data.id}`,{
            person_name: data.person_name,
            person_phone: data.person_phone,
            province_id:data.province_id,
            city_id: data.city_id,
            subdistrict_id: data.subdistrict_id,
            postal_code: data.postal_code,
            address: data.address,
        },{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${session && session.accessToken}`
            }
        })
        return res.data
    } catch (error:any) {
        if(error.response !== undefined){
            console.log(error.response.data)
        }
    }finally{
        revalidatePath('/users/address')
    }
}
export const deleteAddress =async (data:FormDeleteAddress) => {
    try {
        const session = await getServerSession(options)
        const res = await axios.delete(`${process.env.BACKEND_API}/address/${data.id}`,{
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${session && session.accessToken}`
            }
        })
        return res.data
    } catch (error:any) {
        if(error.response !== undefined){   
            console.log(error.response.data)
        }
    }finally{
        revalidatePath('/users/address')
    }
}
export const changeAddress =async ({id,is_main}:{id:number,is_main:number}) => {
    try {
        if(is_main !== 1){
            const session = await getServerSession(options)
            const res = await axios.post(`${process.env.BACKEND_API}/users/set-main-address`,{
                user_id:session?.user.id,
                address_id:id
            },{
                headers:{
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${session && session.accessToken}`
                }
            })
            return res.data
        }
        return
    } catch (error:any) {
        if(error.response !== undefined){
            console.log(error.response.data)
        }
    }finally{
        revalidatePath('/users/address')
    }
}