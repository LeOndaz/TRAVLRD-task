import {SupabaseClient} from "@supabase/supabase-js";
import {createClient} from "@/src/utils/supabase/client";
import {User} from "@supabase/gotrue-js";

const client: SupabaseClient = createClient()

export const getCurrentUser = async (): Promise<User | null> => {
  return client.auth.getUser().then(r => r.data.user).catch(() => null)
}

export const getSession = async ()=> {
  return client.auth.getSession().then(r => r.data.session?.user).catch(() => null);
}