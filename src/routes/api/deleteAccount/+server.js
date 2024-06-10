// import { supabase } from '$lib/supabase';

// export async function DELETE({ request, cookies }) {
//   const session = JSON.parse(cookies.get("session"));
//   const data = await request.json();

//   const { data: response, error } = await supabase
//     .from('accounts')
//     .delete()
//     .eq('user_id', session.user.id)
//     .eq('id', data.id);

//   if (error) {
//     console.error('Failed to delete account:', error);
//     return new Response('Error deleting account', { status: 500 });
//   }

//   return new Response('Account deleted successfully');
// }