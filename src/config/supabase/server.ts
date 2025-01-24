import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { supabaseUrl, supabaseApiKey } from "@/config/constants";

export async function createServer() {
    const cookieStore = await cookies();
    return createServerClient(supabaseUrl, supabaseApiKey, {
        cookies: {
            getAll() {
                return cookieStore.getAll().map((cookie) => ({
                    name: cookie.name,
                    value: cookie.value,
                }));
            },
            setAll(cookieValues) {
                for (const cookie of cookieValues) {
                    const { name, value, ...options } = cookie;
                    cookieStore.set({ name, value, ...options });
                }
            },
        },
    });
}
