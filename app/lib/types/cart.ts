export type CartType = {
    cart_id: string;
    product_id: number;
    product_name: string;
    product_image: string;
    varian_id?: number;
    varian_name?: string;
    product_weight: number;
    product_quantity: number;
    product_price: number;
  }

  export type CartDataType = {
    id: string,
    item_gifts: {
        id: number,
        item_gift_code: string,
        item_gift_name: string,
        item_gift_slug: string,
        category: {
            id: number,
            category_code: string,
            category_name: string,
            category_slug: string,
            category_image: string,
            category_sort: number,
            category_status: string,
            category_image_url: string
        },
        brand: {
            id: number,
            brand_name: string,
            brand_slug: string,
            brand_logo: string,
            brand_sort: number,
            brand_logo_url: string
        },
        item_gift_description: string,
        item_gift_spesification: [
            {
                key: string,
                value: string
            }
        ],
        item_gift_point: number,
        fitem_gift_point: string,
        item_gift_weight: number,
        fitem_gift_weight: string,
        item_gift_status: string,
        item_gift_images: [
            {
                item_gift_id: number,
                variant_id: number | null,
                item_gift_image_url: string,
                item_gift_image_thumbnail_url: string
            }
        ]
    },
    variants: {
        id: number,
        variant_name:string,
        variant_slug: string,
        variant_quantity: number,
        variant_point: number,
        fvariant_point: string,
        variant_weight: number,
        fvariant_weight: string,
        variant_image: {
            id: number,
            image: string,
            image_url: string,
            image_thumb_url: string
        }
    } | null,
    cart_quantity: 1
}