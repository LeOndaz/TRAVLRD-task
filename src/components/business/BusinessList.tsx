'use client';

import DataTable, {TableColumn} from 'react-data-table-component';
import {TBusiness} from "@/types/business";
import {format} from 'date-fns';
import React, {useEffect} from "react";
import {useCurrentUser} from "@/src/hooks/useCurrentUser";
import {useBusinesses} from "@/src/hooks/useBusinesses";
import {useRouter} from "next/navigation";

export const BusinessList = () => {
  const [updateListings, isLoading, data, error] = useBusinesses();
  const router = useRouter();

  const user = useCurrentUser();

  useEffect(() => {
    updateListings();
  }, [updateListings])

  const columns: TableColumn<TBusiness>[] = [
    {
      name: "#",
      selector: row => row.id,
    },
    {
      name: "Name",
      selector: row => row.name
    },
    {
      name: "Created at",
      selector: row => format(new Date(row.created_at), 'MM-dd-yyyy'),
    },
    {
      name: "Owner",
      selector: row => row.owner_email
    },
  ];


  const naiveErrorFallback = (
    <>
      {error?.message || "unknown error has occurred"}
    </>
  )

  const handleRowClick = (row: TBusiness) => {
    if (row.owner_email !== user?.email) {
      return;
    }

    router.push(`/businesses/${row.id}`);
  }

  return <div className="w-full">
    {error && naiveErrorFallback}
    {isLoading && <>LOADING</>}
    {!isLoading && data && <DataTable
      columns={columns}
      data={data}
      onRowClicked={handleRowClick}
      conditionalRowStyles={[
        {
          when: (business: TBusiness) => business.owner_email === user?.email,
          style: {
            background: "goldenrod",
            cursor: "pointer",
          }
        },
      ]}
    />
    }
  </div>
}
