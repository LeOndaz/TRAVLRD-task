import React from "react";
import {BusinessList} from '@/src/components/business';

export default async function Page() {
  return <>
    <h1 className="inline-block">Business Listings</h1>
    <div className="w-full mt-8 flex justify-center">
      <BusinessList/>
    </div>
  </>
}
