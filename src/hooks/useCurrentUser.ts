import {useContext} from "react";
import {UserContext} from "@/src/contexts/UserContext";


export const useCurrentUser = () => {
  return useContext(UserContext);
}