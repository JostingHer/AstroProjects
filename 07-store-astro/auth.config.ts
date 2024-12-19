// import GitHub from '@auth/core/providers/github';
import { User, db, eq } from 'astro:db';
import { defineConfig } from 'auth-astro';
import Credentials from '@auth/core/providers/credentials';
import bcrypt from 'bcryptjs';
import type { AdapterUser } from '@auth/core/adapters';

export default defineConfig({
  providers: [
    //TODO:
    // GitHub({
    //   clientId: import.meta.env.GITHUB_CLIENT_ID,
    //   clientSecret: import.meta.env.GITHUB_CLIENT_SECRET,
    // }),

    // se puede modificar la pantalla de auth por default
    Credentials({
      credentials: {
        email: { label: 'Correo', type: 'email' },
        password: { label: 'Contraseña', type: 'password' },
      },
      authorize: async ( credentials ) => {
        const { email, password } = credentials;

        const [ user ] = await db
          .select()
          .from(User)
          .where(eq(User.email, `${email}`));

        if (!user) {
          throw new Error('User not found');
        }

        if (!bcrypt.compareSync(password as string, user.password)) {
          throw new Error('Invalid password');
        }

        const { password: _, ...rest } = user;



        return rest;
      },
    }),
  ],

  callbacks: {
    jwt: (objeto) => {
      const { token, user } = objeto;

      if (user) {
        token.user = user;
      }

      return token;
    },

    session: (objeto) => {

      console.log('session2 = session, token', objeto);
      
      const { session, token } = objeto;
      session.user = token.user as AdapterUser;

      return session;
    },
  },
});