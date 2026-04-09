import { createClient } from '@supabase/supabase-js';
import type { AstroCookies } from 'astro';

export function createServerClient(cookies: AstroCookies) {
  const supabase = createClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY
  );

  const accessToken = cookies.get('sb-access-token')?.value;
  const refreshToken = cookies.get('sb-refresh-token')?.value;

  if (accessToken && refreshToken) {
    supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
  }

  return supabase;
}

export async function getUser(cookies: AstroCookies) {
  const supabase = createServerClient(cookies);
  const { data } = await supabase.auth.getUser();
  return data.user;
}
