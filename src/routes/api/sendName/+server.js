import { supabase } from "$lib/supabase.js"

export async function POST({ request }) {
    const rabbit = await request.json();
    if (rabbit.name[0] !== "J") {
        return new Response("Name must start with J", { status: 400 })
    }
    const { data, error } = await supabase
        .from('rabbits')
        .insert(rabbit)
        .select()

    // if (error)
    //     console.log(error);
    return new Response(JSON.stringify(data));
}