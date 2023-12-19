import {TBusiness, TBusinessCreate, TBusinessUpdate} from "@/types/business";
import React from "react";
import {useForm} from "react-hook-form";
import Input from "@/src/components/Input";

interface IProps {
  business?: TBusiness | null;
  onSubmit: (values: TBusinessCreate | TBusinessUpdate) => Promise<void> | void;
  onCancel: () => void;
}

export const BusinessForm: React.FC<IProps> = ({onCancel, onSubmit, business = null}) => {
  const {register, getValues, handleSubmit} = useForm<TBusiness | {}>({
    values: business || {},
  })

  const values = getValues();

  return (
    <div className="w-full max-w-xs">
      <form>
        <Input
          label="Name"
          wrapperProps={{className: "mb-4"}}
          {...register("name")}
        />
        <Input
          label="Created At"
          type="datetime-local"
          wrapperProps={{className: "mb-4"}}
          {...register("created_at", {disabled: true})}
        />

        <Input
          label="Owner Email"
          type="email"
          wrapperProps={{className: "mb-4"}}
          {...register("owner_email", {disabled: true})}
        />

      </form>

      <div className="flex justify-evenly p-4">
        <button className="p-4 bg-amber-400 rounded" onClick={() => onSubmit(values)}>Submit</button>
        <button className="p-4" onClick={() => onCancel()}>Cancel</button>
      </div>

      <p className="text-center text-gray-500 text-xs">
        I hope when I get the job that we use ChakraUI or something :)
      </p>
    </div>
  )
}

