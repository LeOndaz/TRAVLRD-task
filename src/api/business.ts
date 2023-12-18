import {PostgrestSingleResponse, SupabaseClient} from "@supabase/supabase-js";
import { createClient } from "@/src/utils/supabase/client"
import {TBusiness, TBusinessUpdate} from "@/types/business";

class BusinessAPI {
  client: SupabaseClient = createClient()

  getBusinesses = async (): Promise<PostgrestSingleResponse<TBusiness[]>> => {
    return this.client.from('businesses')
      .select(`
        id,
        name,
        owner_email,
        created_at
      `);
  }

  updateBusiness = async (id: number, newData: TBusinessUpdate): Promise<PostgrestSingleResponse<null>> => {
    return this.client.from('businesses').update(newData).eq("id", id);
  }

  deleteBusiness = async (id: number) => {
    return this.client.from("businesses").delete().eq("id", id);
  }
}

const businessApi = new BusinessAPI();
export default businessApi;