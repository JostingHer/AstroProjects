import { defineAction } from 'astro:actions';
import { db, User } from 'astro:db';
import { z } from 'astro:schema';
import { v4 as UUID } from 'uuid';
import bcrypt from 'bcryptjs';

export const registerUser = defineAction({
  accept: 'form',
  input: z.object({
    id: z.string().default(UUID),
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(4),
    role: z.string().default('user'),
  }),
  handler: async ( input, context ) => {

    const {id, name, email, password, role } = input;
    const { request, cookies } = context;


    try {

      const hashPassword = bcrypt.hashSync(password);
      const newUser = {id, name, email, password: hashPassword, role};

      const insertUser = await db.insert(User).values(newUser);

      return { ok: true };
      
    } catch (error) {
      console.log(error);
      throw new Error("algo salio mal");
    }


  },
});
