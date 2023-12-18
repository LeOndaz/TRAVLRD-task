import {useDeferredAction} from "@/src/hooks/useDeferredAction";
import {useEffect} from "react";
import {TDeferrableFunc} from "@/types/misc";


export const useDeferredState = (f: TDeferrableFunc<any>, deps = [], initialData = null) => {
  const [action, isLoading, data, error] = useDeferredAction(f,deps, initialData)

  useEffect(() => {
    action();
  }, [action])

  return [
    isLoading,
    data,
    error,
  ]
}