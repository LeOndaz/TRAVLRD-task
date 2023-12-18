import React from "react";
import { BusinessList} from '@/src/components/business';

export default async function Page() {
  return <div className="wtf flex flex-col items-center p-4 container m-auto">
    <h1 className="inline-block">Business Listings</h1>
    <div className="w-full mt-8 flex justify-center">
        <BusinessList />
    </div>
  </div>
}
