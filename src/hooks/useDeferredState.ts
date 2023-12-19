import {useDeferredAction} from "@/src/hooks/useDeferredAction";
import {useEffect} from "react";
import {TDeferrableFunc} from "@/types/misc";
import {PostgrestError} from "@supabase/supabase-js";


export const useDeferredState = <T>(f: TDeferrableFunc<T>, deps = [], initialData = null): [T | null, boolean, Error | PostgrestError | null] => {
  const [action, isLoading, data, error] = useDeferredAction<T>(f,deps, initialData)

  useEffect(() => {
    action();
  }, [action])

  return [
    data,
    isLoading,
    error,
  ]
}