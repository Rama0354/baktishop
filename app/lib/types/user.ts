export type UserData = {
    id: number,
    roles: [
        string,
        string
    ],
    username: string,
    email: string
    email_verified_at: string,
    profile: {
        id: number,
        name: string,
        birthdate: string,
        phone_number: string,
        avatar: string,
        avatar_url:string
    },
    main_address: {
        id: number,
        person_name: string,
        person_phone: string,
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
        postal_code: string,
        address: string
    },
    address: [
        {
            id: number,
            person_name: string,
            person_phone: string,
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
            postal_code: string,
            address: string,
            is_main: number
        },
        {
            id: number,
            person_name: string,
            person_phone: string,
            province: {
                id: number,
                province_name:string
            },
            city: {
                id: number,
                city_name:string
            },
            subdistrict: {
                id: number,
                subdistrict_name:string
            },
            postal_code: string,
            address: string,
            is_main: number
        }
    ]
}