import { fail } from '@sveltejs/kit';
import { AuthApiError } from '@supabase/supabase-js';


export const actions = {
    default: async ({ request, locals: { supabase } }) => {
        const { email, password } = Object.fromEntries(await request.formData())

        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) {
            console.log('Error:', error);
            if (error instanceof AuthApiError) {
                return fail(400, {
                    message: 'Invalid credentials.',
                    values: {
                        email
                    }
                });
            }
            return fail(500, {
                error,
                values: {
                    email
                }
            });
        }



        return true
    },


}