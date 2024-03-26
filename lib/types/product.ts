import { z } from "zod";

const ProductIdSchema = z.object({ id: z.number() });

const ProductSchema = z.object({
  code: z.string(),
  name: z.string(),
  slug: z.string(),
  fpoint: z.string(),
  quantity: z.number(),
  status: z.string(),
  total_review: z.number().int(),
  total_rating: z.number(),
  total_order: z.number().int(),
  is_wishlist: z.number().int(),
});

const ProductOtherSchema = z.object({
  description: z.string(),
  spesification: z
    .array(
      z.object({
        key: z.string(),
        value: z.string(),
      })
    )
    .default([]),
  point: z.number(),
  weight: z.number(),
  fweight: z.string(),
});

const ProductCategorySchema = z
  .object({
    code: z.string(),
    name: z.string(),
    slug: z.string(),
    image: z.string(),
    sort: z.number(),
    status: z.string(),
    image_url: z.string(),
  })
  .nullable();
const ProductCategoryMinSchema = z
  .object({
    name: z.string(),
    slug: z.string(),
  })
  .nullable();

const ProductBrandSchema = z
  .object({
    name: z.string(),
    slug: z.string(),
    logo: z.string(),
    sort: z.number(),
    logo_url: z.string(),
  })
  .nullable();

const ProductBrandMinSchema = z
  .object({
    name: z.string(),
    slug: z.string(),
  })
  .nullable();

const ProductImage = z.object({
  product_id: z.number(),
  variant_id: z.number().nullable(),
  image_url: z.string(),
  // image_thumb_url: z.string(),
});
const ProductImages = z.array(ProductImage).default([]);

const ProductVariant = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  quantity: z.number(),
  point: z.number(),
  fpoint: z.string(),
  weight: z.number(),
  fweight: z.string(),
  variant_images: z
    .object({
      id: z.number(),
      image_url: z.string(),
      // image_thumbnail_url: z.string(),
    })
    .nullable(),
});

const ProductVariantSolid = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  quantity: z.number(),
  point: z.number(),
  fpoint: z.string(),
  weight: z.number(),
  fweight: z.string(),
  variant_images: z
    .object({
      id: z.number(),
      image_url: z.string(),
      // image_thumb_url: z.string(),
    })
    .nullable(),
});

const ProductVariants = z.array(ProductVariant).default([]);

const ProductsMeta = z.object({
  current_page: z.number().int(),
  from: z.number().int(),
  last_page: z.number().int(),
  per_page: z.number().int(),
  to: z.number().int(),
  total: z.number().int(),
});

export const ProductCardType = ProductSchema.merge(ProductIdSchema).extend({
  product_images: ProductImages,
  category: ProductCategoryMinSchema,
  brand: ProductBrandMinSchema,
});
export const ProductCardArray = z.array(ProductCardType);
export const productMin = z.object({
  data: ProductCardArray,
  meta: ProductsMeta,
});
export const productDetail = ProductIdSchema.merge(ProductSchema)
  .merge(ProductOtherSchema)
  .extend({
    variants: ProductVariants,
  })
  .extend({
    product_images: ProductImages,
  })
  .extend({
    category: ProductCategorySchema,
  })
  .extend({
    brand: ProductBrandSchema,
  });

export const productDetailVariant = ProductIdSchema.merge(
  ProductVariantSolid
).extend({
  products: productDetail,
});

export type ProductCardType = z.infer<typeof ProductCardType>;
export type ProductCardArray = z.infer<typeof ProductCardArray>;
export type productMin = z.infer<typeof productMin>;
export type productDetail = z.infer<typeof productDetail>;
export type productDetailVariant = z.infer<typeof productDetailVariant>;
