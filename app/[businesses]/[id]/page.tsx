'use client';

import React from "react";
import {businessApi} from "@/src/api";
import PageNotFound from "@/src/components/PageNotFound";
import {BusinessDetailForm} from "@/src/components/business/BusinessDetailForm";
import {useParams, useRouter} from "next/navigation";
import {useDeferredState} from "@/src/hooks/useDeferredState";

interface IProps {
  params: {
    id: string,
  }
}

export default function Page() {
  const {id} = useParams();
  const dbId = parseInt(id as string, 10)
  const router = useRouter()

  if (Number.isNaN(dbId)) {
    router.push("/businesses");
  }

  const [business, isLoading, error] = useDeferredState(async () => businessApi.getBusinessById(dbId), [], null)

  return <>
    <h1 className="inline-block">Business #{dbId}</h1>
    <div className="w-full mt-8 flex justify-center">
      {!isLoading && business &&
        <BusinessDetailForm business={business}/>
      }

      {isLoading && <p>Loading, bam</p>}
    </div>
  </>
}
