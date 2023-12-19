'use client';

import {TBusiness, TBusinessUpdate} from "@/types/business";
import {updateBusiness} from "@/src/api/business";
import {useRouter} from "next/navigation";
import {BusinessForm} from "@/src/components/business/BusinessForm";
import React, {memo} from "react";
import toast from "react-hot-toast";

interface IProps {
  business: TBusiness;
}

export const BusinessDetailForm: React.FC<IProps> = memo(({business}) => {
  const router = useRouter();

  const onSubmit = async (values: TBusinessUpdate) => {
    await updateBusiness(business.id, values).then(() => {
      toast("successfully updated business")
      router.push("/businesses");
    }).catch(() => {
      toast("Failed to update business");
    });
  }

  const onCancel = async () => {
    router.push('/businesses');
  }

  return <BusinessForm business={business} onSubmit={onSubmit} onCancel={onCancel}/>
});


BusinessDetailForm.displayName = "BusinessDetailForm";