import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

import { inArray, db, eq, Product, ProductImage } from 'astro:db';

export const loadProductsFromCart = defineAction({
  accept: 'json',
  //input: z.string(),
  input: z.array(z.object({
    productId: z.string(),
    quantity: z.number(),
    size: z.string(),
  })),
  handler: async (cart, ctx) => {
    //console.log(cart)

    // no funciona astro:cookies
    // console.log("Ctx", ctx);
    // console.log("cookies", ctx.cookies);

   // const cart = JSON.parse(ctx.cookies.get('cart')?.value ?? '[]') as CartItem[];
    if (cart.length === 0) return [];

    // Load products
    const productIds = cart.map((item) => item.productId);

    const dbProducts = await db
      .select()
      .from(Product)
      .innerJoin(ProductImage, eq(Product.id, ProductImage.productId))
      .where(inArray(Product.id, productIds));

    return cart.map((item) => {
      const dbProduct = dbProducts.find((p) => p.Product.id === item.productId);
      if (!dbProduct) {
        throw new Error(`Product with id ${item.productId} not found`);
      }

      const { title, price, slug } = dbProduct.Product;
      const image = dbProduct.ProductImage.image;

      return {
        productId: item.productId,
        title: title,
        size: item.size,
        quantity: item.quantity,
        image: image.startsWith('http')
          ? image
          : `${import.meta.env.PUBLIC_URL}/images/products/${image}`,
        price: price,
        slug: slug,
      };
    });
 },
});