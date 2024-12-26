import { Role, User, Product, ProductImage, db } from 'astro:db';
import { v4 as UUID } from 'uuid';
import bcrypt from 'bcryptjs';
import { seedProducts } from './seed-data';

// https://astro.build/db/seed
export default async function seed() {
  const roles = [
    { id: 'admin', name: 'Administrador' },
    { id: 'user', name: 'Usuario de sistema' },
  ];

  const johnDoe = {
    id: UUID(),
    name: 'John Doe',
    email: 'john.doe@google.com',
    password: bcrypt.hashSync('123456'),
    role: 'admin',
  };

  const janeDoe = {
    id: UUID(),
    name: 'Jane Doe',
    email: 'jane.doe@google.com',
    password: bcrypt.hashSync('123456'),
    role: 'user',
  };

  await db.insert(Role).values(roles);
  await db.insert(User).values([johnDoe, janeDoe]);


  const queries : any = [];
  seedProducts.forEach(el => {

    const product = {
      ...el,
      sizes: el.sizes.join(','),
      tags: el.tags.join(','),
      id: UUID(),
      user: johnDoe.id,
    }
    queries.push(db.insert(Product).values(product));

    const imageListForProduct = el.images;
    imageListForProduct.forEach(image => {
      const productImage = {
        id: UUID(),
        productId: product.id, // product.id is the id of the product we just inserted
        image,
      }

      queries.push(db.insert(ProductImage).values(productImage));
    });

  });

  await db.batch(queries);




}
