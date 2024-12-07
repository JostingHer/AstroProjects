import { defineCollection, reference, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content', // pata archivos markdown o mdx 
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.date(),
      description: z.string(),
      //image: z.string(),
      image: image().refine((img) => img.width < 1200, {
        message: 'Image should be lower than 1200px',
      }),

         // Relación
      // author: z.string(),
      // author: reference
      // igual al nombre de la colección del archivo de configuración
      author: reference('author'),

      // Relación
      tags: z.array(z.string()),

      // Boolean
      isDraft: z.boolean().default(false),
    }),
});

const authorCollection = defineCollection({
  type: 'data', // para archivos json
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      avatar: image().refine((img) => img.width < 1200, {
        message: 'Image should be lower than 1200px',
      }),
      twitter: z.string(),
      linkedIn: z.string(),
      github: z.string(),
      bio: z.string(),
      subtitle: z.string(),
     
    }),
});

export const collections = {
    // blog: la llave debe ser igual al nombre de la carpeta
  blog: blogCollection,
  author: authorCollection,
};