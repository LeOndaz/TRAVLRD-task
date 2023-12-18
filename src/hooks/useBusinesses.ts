import {useDeferredAction} from "@/src/hooks/useDeferredAction";
import businessApi from "../api/business";
import {TDeferredActionResult} from "@/types/misc";
import {TBusiness} from "@/types/business";

export const useBusinesses = (deps: any[] = []): TDeferredActionResult<TBusiness[]> => {
  return useDeferredAction<TBusiness[]>(businessApi.getBusinesses, deps, null)
}
