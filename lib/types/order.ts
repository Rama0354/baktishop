import * as z from "zod";

const OrderProducts = z.object({
  order_products: z.array(
    z.object({
      order_id: z.number(),
      quantity: z.number(),
      point: z.number(),
      fpoint: z.string(),
      products: z.object({
        id: z.number(),
        code: z.string(),
        name: z.string(),
        slug: z.string(),
        category: z
          .object({
            id: z.number(),
            name: z.string(),
            slug: z.string(),
          })
          .nullable(),
        brand: z
          .object({
            id: z.number(),
            name: z.string(),
            slug: z.string(),
          })
          .nullable(),
        point: z.number(),
        fpoint: z.string(),
        weight: z.number(),
        fweight: z.string(),
        status: z.string(),
        reviews: z
          .array(
            z.object({
              id: z.number(),
              users: z.object({
                id: z.number(),
                name: z.string(),
                username: z.string(),
                avatar_url: z.string().nullable(),
              }),
              order_id: z.number(),
              product_id: z.number(),
              text: z.string(),
              rating: z.number(),
              date: z.string(),
              fdate: z.string(),
            })
          )
          .default([]),
        product_images: z
          .array(
            z.object({
              product_id: z.number(),
              variant_id: z.number().nullable(),
              image_url: z.string(),
              image_thumbnail_url: z.string(),
            })
          )
          .default([]),
        total_review: z.number(),
        total_rating: z.number(),
        total_order: z.number(),
        is_reviewed: z.number(),
      }),
      variants: z
        .object({
          id: z.number(),
          name: z.string(),
          slug: z.string(),
          quantity: z.number(),
          point: z.number(),
          fpoint: z.string(),
          weight: z.number(),
          fweight: z.string(),
          variant_images: z.object({
            id: z.number(),
            image: z.string(),
            image_url: z.string(),
            image_thumbnail_url: z.string(),
          }),
        })
        .nullable(),
    })
  ),
});

const OrderMetadata = z.object({
  metadata: z.object({
    note: z.string(),
    user_id: z.string(),
    address_id: z.number(),
    redeem_code: z.string(),
    redeem_date: z.string(),
    total_point: z.number(),
    shipping_fee: z.number(),
    total_amount: z.number(),
    redeem_item_gifts: z.array(
      z.object({
        variant_id: z.string(),
        item_gift_id: z.number(),
        redeem_point: z.number(),
        redeem_quantity: z.number(),
      })
    ),
  }),
});

const OrderPayments = z.object({
  payments: z
    .object({
      id: z.number(),
      type: z.string(),
      raw_response: z.object({
        acquirer: z.string().optional(),
        va_numbers: z
          .array(
            z.object({
              bank: z.string(),
              va_number: z.string(),
            })
          )
          .optional(),
        status_code: z.string(),
        fraud_status: z.string(),
        gross_amount: z.string(),
        payment_type: z.string(),
        transaction_time: z.string(),
        transaction_status: z.string(),
      }),
      status: z.string(),
    })
    .nullable(),
});

const OrderShippings = z.object({
  shippings: z.object({
    id: z.number(),
    origin: z.object({
      id: z.number(),
      city: z.string(),
    }),
    destination: z.object({
      id: z.number(),
      city: z.string(),
    }),
    weight: z.number(),
    fweight: z.string(),
    courier: z.string(),
    description: z.string(),
    cost: z.number(),
    etd: z.string(),
    resi: z.string().nullable(),
    status: z.enum(["on progress", "on delivery", "delivered", "cancelled"]),
  }),
});

const OrderUsers = z.object({
  users: z.object({
    id: z.number(),
    username: z.string(),
    email: z.string(),
    profile: z.object({
      id: z.number(),
      name: z.string(),
      avatar_url: z.string().nullable(),
    }),
    address: z.object({
      id: z.number(),
      person_name: z.string(),
      person_phone: z.string(),
      province: z.object({
        id: z.number(),
        name: z.string(),
      }),
      city: z.object({
        id: z.number(),
        name: z.string(),
      }),
      subdistrict: z.object({
        id: z.number(),
        name: z.string(),
      }),
      postal_code: z.string(),
      street: z.string(),
      is_main: z.number(),
    }),
  }),
});

const OrderSchema = z
  .object({
    id: z.number(),
    code: z.string(),
    total_point: z.number(),
    ftotal_point: z.string(),
    shipping_fee: z.number(),
    fshipping_fee: z.string(),
    total_amount: z.number(),
    ftotal_amount: z.string(),
    note: z.string(),
    date: z.string(),
    fdate: z.string(),
    snap_token: z.string(),
    snap_url: z.string(),
    status: z.enum(["pending", "shipped", "cancelled", "success"]),
  })
  .merge(OrderProducts)
  .merge(OrderShippings)
  .merge(OrderPayments)
  .merge(OrderUsers);

const OrdersSchema = z.array(OrderSchema);

const OrdersMeta = z.object({
  current_page: z.number(),
  from: z.number(),
  last_page: z.number(),
  per_page: z.number(),
  to: z.number(),
  total: z.number(),
});

export const OrdersData = OrderSchema;
export const OrdersDataFull = z.object({
  data: OrdersSchema,
  meta: OrdersMeta,
});

export type OrdersData = z.infer<typeof OrdersData>;
export type OrdersDataFull = z.infer<typeof OrdersDataFull>;
