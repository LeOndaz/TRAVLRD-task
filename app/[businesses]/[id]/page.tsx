import React from "react";
import {businessApi} from "@/src/api";
import PageNotFound from "@/src/components/PageNotFound";
import {BusinessForm} from "@/src/components/business";
import {updateBusiness} from "@/src/api/business";
import {TBusiness} from "@/types/business";
import {redirect} from "next/navigation";
import {BusinessDetailForm} from "@/src/components/business/BusinessDetailForm";
interface IProps {
  params: {
    id: string,
  }
}

export default async function Page({params}: IProps) {
  const dbId = parseInt(params.id as string, 10)

  if (Number.isNaN(dbId)) {
    // can be a redirect
    return <PageNotFound message={`invalid id provided ${params.id}`}/>
  }

  const {data: business, error} = await businessApi.getBusinessById(dbId);

  if (!business || error) {
    // can be a redirect as well
    return <PageNotFound message={`Business with id ${dbId} not found`}/>
  }

  return <>
    <h1 className="inline-block">Business #{dbId}</h1>
    <div className="w-full mt-8 flex justify-center">
      <BusinessDetailForm business={business} />
    </div>
  </>
}
