import React from "react";
import {BusinessCreateForm} from "@/src/components/business/BusinessCreateForm";

export default async function Page() {
  return <>
    <h1 className="inline-block">Start a business in seconds</h1>
    <div className="w-full mt-8 flex justify-center">
      <BusinessCreateForm />
    </div>
  </>
}
