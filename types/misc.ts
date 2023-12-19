import {PostgrestError, PostgrestSingleResponse} from "@supabase/supabase-js";

export type TDeferrableFunc<T> = (...args: any[]) => Promise<T | void>
export type TDeferredActionResult<T> = [(...args: Parameters<any>) => void, boolean, T | null, PostgrestError | Error | null]
export type TDeferredSupabaseActionResult<T> = TDeferredActionResult<PostgrestSingleResponse<T>>