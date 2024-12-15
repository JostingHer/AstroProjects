import { firebase } from '@/firebase/config';
import { defineAction,  } from 'astro:actions';
import { z } from 'astro:schema';

import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';

export const loginWithGoogle = defineAction({
  accept: 'json',
  input: z.any(),
  handler: async (credentials) => {
    const credential = GoogleAuthProvider.credentialFromResult(credentials);

    if (!credential) {
      throw new Error('Google SignIn falló');
    }

    // grabar las cookies - se pueden hacer mas cosas
    

    await signInWithCredential(firebase.auth, credential);

    return { ok: true };
  },
});

