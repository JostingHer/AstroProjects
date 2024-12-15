import { firebase } from '@/firebase/config';
import { defineAction,  } from 'astro:actions';
import { z } from 'astro:schema';
import { signInWithEmailAndPassword, type AuthError } from 'firebase/auth';

export const login = defineAction({
  accept: 'form',
  input: z.object( {
    email: z.string().email(),
    password: z.string().min(6),
    remember_me: z.boolean().optional(),
    // remember_me: z.boolean().default(false),
 }),
  handler: async (input, context) => {

    const { email, password, remember_me } = input;
    const { request, cookies } = context;

    try {
        const user = await signInWithEmailAndPassword(firebase.auth, email, password);

        // crear funcion aparte para grabar las cookies
        if(remember_me){
            cookies.set('email', email, {  
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), // 1 año,
                path: '/',});
        }else{
            cookies.delete('email', {
                path: '/',
            });
    
        }
        return {
            uid: user.user.uid,
            email: user.user.email
        } 
    } catch (error) {

        const firebaseError = error as AuthError;
          // console.log(firebaseError.code)

       if(firebaseError.code === 'auth/invalid-credential'){
            throw new Error('Contraseña incorrecta');
        }
        throw new Error('Error al iniciar SESION');
        
    }
  
  },
});