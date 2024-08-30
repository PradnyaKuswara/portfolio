import CreateForm from '@/app/(protected)/(components)/Form/CreateFrom';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Tags Create',
};

export default function TagsCreate() {
    const fields = [
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            placeholder: 'Enter tag name',
        },
    ];

    const storeEndpoint = `${process.env.NEXT_PUBLIC_API_FETCH}/tags`;

    return (
        <>
            <div className="card bg-base-300">
                <div className="card-body">
                    <CreateForm
                        fields={fields}
                        endPoint={storeEndpoint}
                    ></CreateForm>
                </div>
            </div>
        </>
    );
}
