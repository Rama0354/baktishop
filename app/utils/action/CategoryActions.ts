'use server'
import axios from "axios"

export const getAllCategory =async () => {
    try {
        const res = await axios.get(`${process.env.BACKEND_API}/category`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}