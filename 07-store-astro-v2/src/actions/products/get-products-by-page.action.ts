import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

import { count, db, eq, Product, ProductImage, sql } from 'astro:db';
import type { ProductWithImages } from '@/interfaces';

export const getProductsByPage = defineAction({
  accept: 'json',
  input: z.object({
    page: z.number().optional().default(1),
    limit: z.number().optional().default(12),
  }),
  handler: async ({ page, limit }) => {
    page = page <= 0 ? 1 : page;

    const [totalRecords] = await db.select({ count: count() }).from(Product);
    const totalPages = Math.ceil(totalRecords.count / limit);

    if (page > totalPages) {
      // page = totalPages;
      return {
        products: [] as ProductWithImages[],
        totalPages: totalPages,
      };
    }

    // raw querys
    //   const productsQuery = sql`
    // select alias.*,
    // ( select GROUP_CONCAT(image,',') from 
    // 	( select * from ${ProductImage} where productId = alias.id limit 2 )
    //  ) as images
    // from ${Product} alias
    // LIMIT ${limit} OFFSET ${(page - 1) * limit};
    // `;
    //     const { rows } = await db.run(productsQuery);

    const products = await db
      .select()
      .from(Product)
      .innerJoin(ProductImage, eq(Product.id, ProductImage.productId))
      .limit(limit)
      .offset((page - 1) * 12);

      console.log('products', products);

    const productResultSerialized = products.map(({Product, ProductImage}) => {

        const imagesByProduct = products.map((image) => {
            if(image.ProductImage.productId === Product.id && image.ProductImage.image){
                    return image.ProductImage.image
            }
        });
        const imagesByProductFiltered = imagesByProduct.filter((image) => image !== undefined);

        return {
            ...Product,
            images: imagesByProductFiltered.join(','),
        };

    });

  
    return {
      // products: rows as unknown as ProductWithImages[],
      products: productResultSerialized,
      totalPages: totalPages,
    };

    
  },
});