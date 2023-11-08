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