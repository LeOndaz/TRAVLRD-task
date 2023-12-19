import {PostgrestSingleResponse, SupabaseClient} from "@supabase/supabase-js";
import {createClient} from "@/src/utils/supabase/client"
import {TBusiness, TBusinessCreate, TBusinessUpdate} from "@/types/business";

const client: SupabaseClient = createClient()
const fields = `
      id,
      name,
      owner_email,
      created_at
  `
export const getBusinesses = async (): Promise<PostgrestSingleResponse<TBusiness[]>> => {
  return client.from('businesses').select(fields).returns<TBusiness[]>();
}
export const getBusinessById = async (id: number): Promise<any> => {
  return client.from("businesses").select(fields).eq("id", id).single<TBusiness>();
}
export const updateBusiness = async (id: number, newData: TBusinessUpdate): Promise<PostgrestSingleResponse<null>> => {
  return client.from('businesses').update(newData).eq("id", id);
}

export const deleteBusiness = async (id: number) => {
  return client.from("businesses").delete().eq("id", id);
}

export const createBusiness = async (data: TBusinessCreate) => {
  return client.from('businesses').insert(data)
}