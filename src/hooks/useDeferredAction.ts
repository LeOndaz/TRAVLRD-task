import {useCallback, useState} from "react";
import {PostgrestError} from "@supabase/supabase-js";
import {TDeferrableFunc, TDeferredActionResult} from "@/types/misc";

type TDeferredFunc<T> = (...args: Parameters<TDeferrableFunc<T>>) => Promise<T | void>;

export const useDeferredAction = <T>(f: TDeferrableFunc<any>, deps: any[], initialData: T | null = null): TDeferredActionResult<T> => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T | null>(initialData);
  const [error, setError] = useState<PostgrestError | null>(null);

  const callback: TDeferredFunc<T> = useCallback(async (...args: Parameters<TDeferrableFunc<T>>) => {
    setIsLoading(true);

    // f shouldn't be in deps
    f(...args).then(r => {
      if (r) {
        setData(r.data);
        setError(r.error);
      }
      setIsLoading(false);
    }) // no catch for now
  }, deps);

  return [
    callback,
    isLoading,
    data,
    error,
  ]
}