'use client';
import React, {useState} from 'react';
import {Tables} from "@/types/supabase";
import {format} from 'date-fns';

interface IProps {
  business: Tables<'businesses'>
}

export const BusinessCard: React.FC<IProps> = ({business}) => {
  const createdAt = format(new Date(business.created_at), 'MM/dd/yyyy');

  return <tr className="hover:bg-amber-400 hover:cursor-pointer">
    <td align="center">{business.id}</td>
    <td align="center">{business.name}</td>
    <td align="center">{createdAt}</td>
    <td align="center">{business.owner_email}</td>
  </tr>
}