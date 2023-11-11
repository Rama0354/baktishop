export interface Gifts {
  id: number;
  item_gift_code: string;
  item_gift_name: string;
  item_gift_slug: string;
  category: {
    id: number,
    category_code: string,
    category_name: string,
    category_slug: string,
    category_sort: number,
    category_status: string
  },
  brand: {
      id: number,
      brand_name: string,
      brand_slug: string,
      brand_sort: number
  },
  item_gift_description: string;
  item_gift_description: string | null;
  item_gift_images: [
    {
      id: number;
      item_gift_id: number;
      item_gift_image_url: string;
      item_gift_image_thumb_url: string;
    }
  ];
  variants: [
    {
        id: number,
        item_gift_id: number,
        variant_name: string,
        variant_point: number,
        variant_quantity: number
    },
  ]
  item_gift_point: number;
  fitem_gift_point: string;
  item_gift_quantity: number;
  item_gift_weight: number,
  fitem_gift_weight: string,
  item_gift_status: string;
  total_reviews: number;
  total_rating: number;
  is_wishlist: number;
}
