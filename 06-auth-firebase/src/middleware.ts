import type { MiddlewareNext } from "astro";
import { defineMiddleware } from "astro:middleware";
import { firebase } from "./firebase/config";



// investigar como se puede hacer para que las rutas privadas sean dinámicas
// se puede hacer con un hook que se ejecute en el layout


// rutas privadas y dinamicas [...posts] seria una ruta dinamica


const privateRoutes = ['/protected']; 
// ruta privada que solo puede ser accedida si el usuario está autenticado
const notAuthenticatedRoutes = ['/login', '/register']; 
// si el usuario esta autehticado no puede acceder a estas rutas, no es necesario que se autentique de nuevo


// `context` y `next` son automáticamente tipados
export const onRequest = defineMiddleware(async (context, next) => {

    const { request, url, locals, redirect } = context;

    const user = firebase.auth.currentUser;
    const isLoggedIn = !!user;

    locals.isLoggedIn = isLoggedIn;

    if(user){
        locals.user = {
            email: user.email || '',
            name: user.displayName!,
            avatar: user.photoURL!,
            emailVerified: user.emailVerified
        }
    }

    console.log({ isLoggedIn, user });
    if (!isLoggedIn && privateRoutes.includes(url.pathname)) {
      return redirect('/');
    }

    if (isLoggedIn && notAuthenticatedRoutes.includes(url.pathname)) {
      return redirect('/');
    }
    
    return next();

});


