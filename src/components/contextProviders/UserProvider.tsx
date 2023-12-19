'use client';

import {UserContext} from "@/src/contexts/UserContext";
import React from "react";
import {User} from "@supabase/supabase-js";

type TProps = React.PropsWithChildren & React.ProviderProps<User | null>

export const UserProvider: React.FC<TProps> = (props) => {
  return <UserContext.Provider {...props}/>
}
