import {PostgrestError} from "@supabase/supabase-js";
import {PostgrestSingleResponse} from "@supabase/postgrest-js/src/types";

export type TDeferrableFunc<T> = (...args: any[]) => Promise<T | void>
export type TDeferredActionResult<T> = [(...args: Parameters<any>) => void, boolean, T | null, PostgrestError | Error | null]
export type TDeferredSupabaseActionResult<T> = TDeferredActionResult<PostgrestSingleResponse<T>>