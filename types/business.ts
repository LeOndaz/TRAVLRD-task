import {Database, Tables} from "@/types/supabase";


export type TBusiness = Tables<'businesses'>;
export type TBusinessUpdate = Database['public']['Tables']['businesses']['Update']
export type TBusinessCreate = Database['public']['Tables']['businesses']['Insert']
