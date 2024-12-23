import { defineMiddleware } from 'astro:middleware';
import { getSession } from 'auth-astro/server';

const notAuthenticatedRoutes = ['/login', '/register'];

export const onRequest = defineMiddleware(
  async (context, next) => {

    const { url, locals, redirect, request } = context;

    const session = await getSession(request);
    console.log('session1', session); 
    const isLoggedIn = !!session;
    const user = session?.user;

    // TODO:
    // OJO para usarlo en el template de astro 
    locals.isLoggedIn = isLoggedIn;
    locals.user = null;
    locals.isAdmin = false;

    if (user) {
      // TODO:
      locals.user = {
        name: user.name!,
        email: user.email!,
      };

      // auth.d.ts para extender el tipo de usuario

      locals.isAdmin = user.role === 'admin';
    }

    // TODO: Eventualmente tenemos que controlar el acceso por roles
    if (!locals.isAdmin && url.pathname.startsWith('/dashboard')) {
      return redirect('/');
    }

    if (isLoggedIn && notAuthenticatedRoutes.includes(url.pathname)) {
      return redirect('/');
    }

    return next();
  }
);