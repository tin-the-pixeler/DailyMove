import type { APIRoute } from 'astro';
import { createServerClient } from '../../lib/supabase-server';

export const POST: APIRoute = async ({ request, cookies }) => {
  const supabase = createServerClient(cookies);
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { date, exercise_id } = await request.json();

  const { error } = await supabase
    .from('completions')
    .insert({ user_id: user.id, date, exercise_id });

  if (error) {
    return new Response(error.message, { status: 400 });
  }

  return new Response(null, { status: 201 });
};

export const DELETE: APIRoute = async ({ request, cookies }) => {
  const supabase = createServerClient(cookies);
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { date } = await request.json();

  const { error } = await supabase
    .from('completions')
    .delete()
    .eq('user_id', user.id)
    .eq('date', date);

  if (error) {
    return new Response(error.message, { status: 400 });
  }

  return new Response(null, { status: 200 });
};
