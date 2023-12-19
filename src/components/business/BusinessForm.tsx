'use client';

import React, {FormEvent, useState} from "react";
import {TBusiness, TBusinessCreate, TBusinessUpdate} from "@/types/business";
import Input from "@/src/components/Input";
import {format} from "date-fns";
import {useCurrentUser} from "@/src/hooks/useCurrentUser";
import {z} from 'zod';

type TSubmitUpdate = (data: TBusinessUpdate) => Promise<void> | void;
type TSubmitCreate = (data: TBusinessCreate) => Promise<void> | void;

interface IProps {
  business?: TBusiness | null;
  onCancel: () => void;
  onSubmit: TSubmitCreate | TSubmitUpdate;
}

export const BusinessForm: React.FC<IProps> = ({onCancel, onSubmit, business = null}) => {
  const user = useCurrentUser();
  const disabled = !!business && user?.email !== business.owner_email;

  const [name, setName] = useState(business?.name || "");
  const [owner, setOwner] = useState(business?.owner_email || "");

  const formatDate = (dateAsString: string) => {
    return format(new Date(dateAsString), 'MM-dd-yyyy');
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const email = user!.email!;

    const validatedEmail = z.string().email().parse(email);
    onSubmit({
      name,
      owner_email: validatedEmail,
    });
  }

  return (
    <div className="w-full max-w-xs">
      <form onSubmit={handleSubmit}>
        <Input
          disabled={disabled}
          className={disabled ? "text-white" : "text-black"}
          name="name"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          wrapperProps={{className: "mb-4"}}
        />
        <Input
          disabled
          name="created_at"
          label="Created At"
          defaultValue={business?.created_at ? formatDate(business.created_at) : ""}
          wrapperProps={{className: "mb-4"}}
        />

        <Input
          disabled
          name="owner_email"
          defaultValue={owner}
          label="Owner Email"
          type="email"
          className={!business ? "text-black" : ""} // just for making sure it's not the same as the bg color
          wrapperProps={{className: "mb-4"}}
          onChange={(e) => setOwner(e.target.value)}
          readOnly={!!business && user?.email !== business?.owner_email}
        />

        <div className="flex justify-evenly p-4">
          <button className="p-4 bg-amber-400 rounded" type="submit">Submit</button>
          <button className="p-4" onClick={() => onCancel()} type="button">Cancel</button>
        </div>
      </form>

      <p className="text-center text-gray-500 text-xs">
        I hope when I get the job that we use ChakraUI or something :)
      </p>
    </div>
  )
}

