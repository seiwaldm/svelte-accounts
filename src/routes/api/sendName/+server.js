import { supabase } from '$lib/supabase';

export async function POST({ request }) {
    const rabbit = await request.json();
    // console.log(rabbit)
    if (rabbit.name[0] !== "J") {
        return new Response("I only like rabbits that start with J", { status: 400 });
    }

    const { data, error } = await supabase
        .from('rabbitsss')
        .insert([
            rabbit
        ])
        .select()
    if (error)
        return new Response("oh no... seems we have database issues... relax, it's not your fault! plz contact our admin...", { status: 500 })
    return new Response(JSON.stringify(data));
}