import * as z from "zod";

const OrdersSchema = z.object({
  orders: z.object({
    id: z.number(),
    code: z.string(),
    total_point: z.number(),
    date: z.string(),
    fdate: z.string(),
    note: z.string(),
    snap_token: z.string(),
    snap_url: z.string(),
    metadata: z.object({
      code: z.string(),
      date: z.string(),
      note: z.string(),
      user_id: z.number(),
      address_id: z.number(),
      total_point: z.number(),
      shipping_fee: z.number(),
      total_amount: z.number(),
      order_products: z.array(
        z.object({
          point: z.number(),
          quantity: z.number(),
          product_id: z.number(),
          variant_id: z.number().nullable(),
        })
      ),
    }),
    status: z.string(),
    order_products: z.array(
      z.object({
        order_id: z.number(),
        quantity: z.number(),
        point: z.number(),
        products: z.object({
          id: z.number(),
          code: z.string(),
          name: z.string(),
          category: z.object({ id: z.number() }).nullable(),
          brand: z.object({ id: z.number() }).nullable(),
          point: z.number(),
          fpoint: z.string(),
          weight: z.number(),
          fweight: z.string(),
          status: z.string(),
          product_images: z.array(z.object({ id: z.number() }).nullable()),
        }),
        variants: z
          .object({
            id: z.number(),
          })
          .nullable(),
      })
    ),
  }),
});

const ProductsSchema = z.object({
  products: z.object({
    id: z.number(),
    code: z.number(),
    name: z.string(),
    slug: z.string(),
    category: z.object({ id: z.number() }).nullable(),
    brand: z.object({ id: z.number() }).nullable(),
    point: z.number(),
    fpoint: z.string(),
    weight: z.number(),
    fweight: z.string(),
    quantity: z.number(),
    status: z.string(),
  }),
});

const UsersSchema = z.object({
  users: z.object({
    id: z.number(),
    username: z.string(),
    email: z.string(),
    profile: z.object({
      id: z.number(),
      name: z.string(),
      avatar: z.string().nullable(),
      avatar_url: z.string().nullable(),
    }),
  }),
});

const reviewSchema = z.object({
  id: z.number(),
  text: z.string(),
  rating: z.number(),
  date: z.string(),
  has_files: z.string(),
  review_files: z.array(
    z.object({
      id: z.number(),
      review_id: z.number(),
      file: z.string(),
      file_url: z.string(),
    })
  ),
  fdate: z.string(),
});

const reviewSchemaSort = reviewSchema.merge(UsersSchema);

const reviewsSchema = z.array(reviewSchema);
const reviewsSchemaSort = z.array(reviewSchemaSort);

const metaSchema = z.object({
  current_page: z.number(),
  from: z.number(),
  last_page: z.number(),
  per_page: z.number(),
  to: z.number(),
  total: z.number(),
});

export const formReview = z.object({
  review_rating: z.number(),
  review_text: z.string(),
});

export const formReviews = z.object({
  order_id: z.array(z.number()),
  product_id: z.array(z.number()),
  review_rating: z.array(z.number()),
  review_text: z.array(z.string()),
});

export const reviewsDataTS = z
  .object({
    data: reviewsSchemaSort,
  })
  .extend({
    meta: metaSchema,
  });

export type reviewSchema = z.infer<typeof reviewSchema>;
export type reviewsDataTS = z.infer<typeof reviewsDataTS>;
export type formReviews = z.infer<typeof formReviews>;
export type formReview = z.infer<typeof formReview>;

const reviewsData = z
  .array(
    z.object({
      id: z.number(),
      text: z.string(),
      rating: z.number(),
      date: z.string(),
      has_files: z.string(),
      review_files: z
        .array(
          z.object({
            id: z.number(),
            review_id: z.number(),
            file: z.string(),
            file_url: z.string(),
          })
        )
        .default([]),
      fdate: z.string(),
      products: z.object({
        id: z.number(),
        name: z.string(),
        slug: z.string(),
        category: z.object({ id: z.number(), name: z.string() }).nullable(),
        brand: z.object({ id: z.number(), name: z.string() }).nullable(),
        fpoint: z.string(),
        fweight: z.string(),
        status: z.string(),
        product_images: z
          .array(
            z.object({
              product_id: z.number(),
              variant_id: z.number().nullable(),
              image_url: z.string(),
            })
          )
          .default([]),
        variants: z.array(
          z.object({
            id: z.number(),
            name: z.string(),
            slug: z.string(),
            quantity: z.number(),
            fpoint: z.string(),
            fweight: z.string(),
            variant_images: z.string().nullable(),
          })
        ),
      }),
      users: z.object({
        username: z.string(),
        profile: z.object({
          name: z.string(),
          avatar: z.string().nullable(),
          avatar_url: z.string().nullable(),
        }),
      }),
    })
  )
  .default([]);

export const reviewsList = z.object({
  data: reviewsData,
  meta: metaSchema,
});

export type reviewsList = z.infer<typeof reviewsList>;
