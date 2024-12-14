import type { MiddlewareNext } from "astro";
import { defineMiddleware } from "astro:middleware";


const privateRoutes = ['/protected'];
// `context` y `next` son automáticamente tipados
export const onRequest = defineMiddleware(async (context, next) => {

    const { request, url } = context;

    const authHeaders = request.headers.get('authorization') ?? '';

    if (privateRoutes.includes(url.pathname)) {
      return checkLocalAuth(authHeaders, next);
    }
  
    return next();

});


const checkLocalAuth = (authHeaders: string, next: MiddlewareNext) => {
    return next();

  };