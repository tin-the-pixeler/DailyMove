import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

export const POST: APIRoute = async ({ request, redirect }) => {
  const form = await request.formData();
  const email = form.get('email')?.toString() ?? '';
  const password = form.get('password')?.toString() ?? '';
  const confirm = form.get('confirm')?.toString() ?? '';

  if (password !== confirm) {
    return redirect('/register?error=Passwords+do+not+match', 302);
  }

  const supabase = createClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY
  );

  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return redirect(`/register?error=${encodeURIComponent(error.message)}`, 302);
  }

  return redirect('/', 302);
};
