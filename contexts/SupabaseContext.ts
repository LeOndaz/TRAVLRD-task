'use client';
import React from "react";
import {SupabaseClient} from "@supabase/supabase-js";


export const SupabaseContext = React.createContext<SupabaseClient | null>(null);
