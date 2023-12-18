import {createContext} from "react";
import {User} from "@supabase/gotrue-js";

export const UserContext = createContext<User | null>(null);