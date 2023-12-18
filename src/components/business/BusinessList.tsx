'use client';

import DataTable, {TableColumn} from 'react-data-table-component';
import {TBusiness, TBusinessUpdate} from "@/types/business";
import {format} from 'date-fns';
import businessApi from "@/src/api/business";
import React, {useEffect, useState} from "react";
import Modal from "@/src/components/Modal";
import {BusinessForm} from './BusinessForm';
import {useDeferredAction} from "@/src/hooks/useDeferredAction";
import {FormProvider, useForm} from "react-hook-form";
import {useCurrentUser} from "@/src/hooks/useCurrentUser";
import {useBusinesses} from "@/src/hooks/useBusinesses";
import {BusinessCard} from "@/src/components/business/BusinessCard";

export const BusinessList = () => {
  // DateTable doesn't allow customizing the row component, so selectedRow gets set onRowClick
  const [selectedRow, setSelectedRow] = useState<TBusiness | null>(null)
  const modalIsShown = !!selectedRow;

  const onModalCancel = () => {
    setSelectedRow(null);
  }

  const form = useForm<TBusinessUpdate>({
    values: selectedRow || {},
  })

  const [updateListings, isLoading, data, error] = useBusinesses([form.formState.submitCount]);
  const user = useCurrentUser();

  const [updateBusiness,] = useDeferredAction(async (id: number, newData: TBusinessUpdate) => {
    await businessApi.updateBusiness(id, newData);
    await updateListings();
  }, [], [updateListings])

  const [deleteBusiness,] = useDeferredAction(async (id: number) => {
    await businessApi.deleteBusiness(id);
    await updateListings();
  }, [], [])

  const handleBusinessDelete = async (row: TBusiness) => {
    if (row.owner_email !== user?.email) {
      return;
    }

    await deleteBusiness(row.id);
  }

  const handleBusinessUpdate = async () => {
    const values = form.getValues();

    // update only name, selectedRow won't be undefined
    await updateBusiness(selectedRow?.id, {
      name: values.name,
    });
    setSelectedRow(null);
  };

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
    {
      name: "",
      cell: (row: TBusiness) => <button onClick={() => handleBusinessDelete(row)}>x</button>
    }
  ];


  const naiveErrorFallback = (
    <>
      {error?.message || "unknown error has occurred"}
    </>
  )
  const modalFooter = (
    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
      <button
        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={onModalCancel}
      >
        Close
      </button>
      <button
        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={form.handleSubmit(handleBusinessUpdate)}
      >
        Save Changes
      </button>
    </div>
  )

  const handleRowClick = (row: TBusiness) => {
    if (row.owner_email !== user?.email) {
      return;
    }

    setSelectedRow(row);
  }

  return <>
    <Modal title="Update business" show={modalIsShown} onClose={() => setSelectedRow(null)} footer={modalFooter}>
      <FormProvider {...form}>
        <BusinessForm business={selectedRow as TBusiness}/>
      </FormProvider>
    </Modal>

    {error && naiveErrorFallback}

    <div className="w-full">
      {isLoading && <>LOADING</>}
      {!isLoading && data && <DataTable
        columns={columns}
        data={data}
        onRowClicked={handleRowClick}
        conditionalRowStyles={[
          {
            when: (business: TBusiness) => business.owner_email === user?.email,
            style: {
              "hover": {
                background: "gold",
                cursor: "pointer",
              }
            }
          }
        ]}
      />
      }
    </div>
  </>
}
