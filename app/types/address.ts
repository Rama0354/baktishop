export type AddressData = {
        id: number,
        person_name: string,
        person_phone: number,
        province: {
            id: number,
            province_name: string
        },
        city: {
            id: number,
            city_name: string
        },
        subdistrict: {
            id: number,
            subdistrict_name: string
        },
        postal_code: number,
        address: string,
        is_main: number,
        users: {
            id: 1,
            name: string,
            username: string,
            email: string,
            main_address_id: number
        }
    }