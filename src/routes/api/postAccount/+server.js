import { supabase } from '$lib/supabase';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

export async function POST({ request, cookies }) {
  const session = JSON.parse(cookies.get("session"));
  const data = await request.json();

  const { data: response, error } = await supabase
    .from('accounts')
    .insert([
      { user_id: session.user.id, designation: data.accountName, balance: data.startingBalance },
    ]);

  if (error) {
    console.error('Failed to create account:', error);
    return new Response('Error creating account', { status: 500 });
  }

  return new Response('Account created successfully');
}
