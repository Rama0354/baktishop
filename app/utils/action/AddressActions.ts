'use server'

import axios from "axios"

export const getAllProvince =async () => {
    try {
        const res = await axios.get(`${process.env.BACKEND_API}/province?per_page=50`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}
export const getAllCity =async (province_id:number) => {
    try {
        const res = await axios.get(`${process.env.BACKEND_API}/city?per_page=50&search_column[0]=province_id&search_text[0]=${province_id}&search_operator[0]==`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}
export const getAllSubdistrict =async (city_id:number) => {
    try {
        const res = await axios.get(`${process.env.BACKEND_API}/subdistrict?per_page=50&search_column[0]=city_id&search_text[0]=${city_id}&search_operator[0]==`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}