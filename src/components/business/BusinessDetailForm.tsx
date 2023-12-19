'use client';

import {TBusiness, TBusinessUpdate} from "@/types/business";
import {updateBusiness} from "@/src/api/business";
import {redirect} from "next/navigation";
import {BusinessForm} from "@/src/components/business/BusinessForm";
import React from "react";
import toast from "react-hot-toast";

interface IProps {
  business: TBusiness;
}

export const BusinessDetailForm: React.FC<IProps> = ({business}) => {
  const onSubmit = async (values: TBusinessUpdate) => {
    await updateBusiness(business.id, values).then(() => {
      toast("successfully updated business")
      redirect("/businesses");
    }).catch(() => {
      toast("Failed to update business");
    });
  }

  const onCancel = async () => {
    redirect('/businesses');
  }

  return <BusinessForm business={business} onSubmit={onSubmit} onCancel={onCancel}/>

}
