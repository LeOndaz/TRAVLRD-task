'use client';

import {TBusiness, TBusinessUpdate} from "@/types/business";
import {businessApi} from "@/src/api";
import {useRouter} from "next/navigation";
import {BusinessForm} from "@/src/components/business/BusinessForm";
import React, {memo} from "react";
import toast from "react-hot-toast";
import {useCurrentUser} from "@/src/hooks/useCurrentUser";

interface IProps {
  business: TBusiness;
}

export const BusinessDetailForm: React.FC<IProps> = memo(({business}) => {
  const router = useRouter();
  const user = useCurrentUser();

  const onSubmit = async (values: TBusinessUpdate) => {
    await businessApi.updateBusiness(business.id, values).then(() => {
      toast("successfully updated business")
      router.push("/businesses");
    }).catch(() => {
      toast("Failed to update business");
    });
  }

  const onDelete = async (business: TBusiness) => {
    if (business.owner_email !== user?.email) {
      return;
    }

    await businessApi.deleteBusiness(business.id).then(() => {
      toast("deleted successfully");
      router.replace("/businesses");
    }).catch(() => {
      toast("failed to delete")
    });
  }

  const onCancel = async () => {
    router.push('/businesses');
  }

  return <div className="flex flex-col items-center">
    <BusinessForm business={business} onSubmit={onSubmit} onCancel={onCancel}/>

    <button className="bg-red-600 p-4 mb-4 rounded text-white" onClick={() => onDelete(business)}>Delete</button>

    <p className="text-center text-gray-500 text-xs">
      I hope when I get the job that we use ChakraUI or something :)
    </p>
  </div>
});


BusinessDetailForm.displayName = "BusinessDetailForm";