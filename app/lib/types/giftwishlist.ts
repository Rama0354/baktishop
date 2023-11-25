export type WishlistData = {
    id: string;
    item_gifts: {
      id: number;
      item_gift_name: string;
      item_gift_slug: string;
      item_gift_point: number;
      fitem_gift_point: string;
      item_gift_weight: number;
      fitem_gift_weight: string;
      item_gift_quantity: number;
      item_gift_status: string;
      total_rating: number;
      total_reviews: number;
      item_gift_images: [
        {
          item_gift_id: number;
          variant_id: number | null;
          item_gift_image_url: string;
          item_gift_image_thumbnail_url: string;
        }
      ];
    };
  };