import type { MiddlewareNext } from "astro";
import { defineMiddleware } from "astro:middleware";


const privateRoutes = ['/protected'];
// `context` y `next` son automáticamente tipados
export const onRequest = defineMiddleware(async (context, next) => {

   console.log('Middleware onRequest');

    // tenemos información de la petición que se está realizando desde el cliente
    // console.log("context", context);
    // console.log(context.request);
    // console.log(context.url);

    // return new Response(
    //     JSON.stringify({
    //         message: 'Middleware onRequest HELLO WORL- REDIRECCIONANDO'
    //     })
    // )
    const { request, url } = context;

    const authHeaders = request.headers.get('authorization') ?? '';

    if (privateRoutes.includes(url.pathname)) {
      return checkLocalAuth(authHeaders, next);
    }
  
    return next();

});


const checkLocalAuth = (authHeaders: string, next: MiddlewareNext) => {
    if (authHeaders) {
      const authValue = authHeaders.split(' ').at(-1) ?? 'user:pass';
      const decodedValue = atob(authValue).split(':');
      const [user, password] = decodedValue;
      console.log(decodedValue);
  
      if (user === 'admin' && password === 'admin') {
        return next();
      }
    }
  
    return new Response('Auth Necesaria', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic real="Secure Area"',
      },
    });
  };