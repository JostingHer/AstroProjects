import { firebase } from '@/firebase/config';
import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile, type AuthError } from 'firebase/auth';

export const registerUser = defineAction({
  accept: 'form',
  input: z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
    remember_me: z.boolean().optional(),
  }),
  handler: async ( input, context ) => {

    const { name, email, password, remember_me } = input;
    const { request, cookies } = context;

    if(remember_me){
        cookies.set('email', email, {  
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), // 1 año,
            path: '/',});
    }else{
        cookies.delete('email', {
            path: '/',
        });

    }


    try {
      
      const user = await createUserWithEmailAndPassword(firebase.auth, email, password);
      //console.log("user", user.user);

     
      // actualizar el nombre del usuario 
      updateProfile(firebase.auth.currentUser!, {
        displayName: name,
      })

      // enviar correo de verificación

      await sendEmailVerification(firebase.auth.currentUser!, {
        url: `${import.meta.env.WEBSITE_URL}/protected?emailVerified=true`, // url de la página a la que se redirigirá
          // url: "http://localhost:4321/protected?emailVerified=true"
          // url: "http://localhost:4321/protected  - Informacion adicional queryParamas
      })




      return {
        uid: user.user.uid,
        email: user.user.email
      };

    } catch (error) {
      //console.log(error);
      // throw new Error('Error al registrar el usuario');

      const firebaseError = error as AuthError;
      const { code, message } = firebaseError;

      if(code === 'auth/email-already-in-use'){
        throw new Error('El correo electrónico ya está en uso');
      }

      throw new Error("algo salio mal");
    }
  
  },
});