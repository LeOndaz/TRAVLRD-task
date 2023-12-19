'use client';

import {businessApi} from "@/src/api";
import {redirect} from "next/navigation";
import {BusinessForm} from "@/src/components/business/BusinessForm";
import React from "react";
import {useCurrentUser} from "@/src/hooks/useCurrentUser";
import toast from "react-hot-toast";
import {TBusinessCreate} from "@/types/business";

export const BusinessCreateForm: React.FC = () => {
  const user = useCurrentUser();

  const navigateBusiness = () => {
    redirect('/businesses');
  }
  const onSubmit = async (data: TBusinessCreate) => {
    await businessApi.createBusiness({
      ...data,
      owner_email: user!.email!
    }).then(() => {
      toast("business created successfully")
      navigateBusiness();
    }).catch(() => {
      toast("error hapenned while creating business")
    });
  }

  const onCancel = async () => {
    navigateBusiness();
  }

  return <BusinessForm onSubmit={onSubmit} onCancel={onCancel}/>

}
