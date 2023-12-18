'use client';

import {TBusiness, TBusinessCreate, TBusinessUpdate} from "@/types/business";
import React from "react";
import {useFormContext} from "react-hook-form";

interface IProps {
  business?: TBusiness;
}

export const BusinessForm: React.FC<IProps> = ({business = null}) => {
  const { register} = useFormContext();

  return (
    <div className="w-full max-w-xs">
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name" type="text" placeholder="name" {...register("name", { required: true, minLength: 1})}/>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs">
        I hope when I get the job that we use ChakraUI or something :)
      </p>
    </div>
  )
}

