import {createClient} from "@/src/utils/supabase/client";
import {SupabaseClient} from "@supabase/supabase-js";


export const useSupabase = (): SupabaseClient => createClient();