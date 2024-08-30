import CreateForm from '@/app/(protected)/(components)/Form/CreateFrom';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Certificates Create',
};

export default function CertificatesCreate() {
    const arrayTenYears = Array.from({ length: 10 }, (_, i) => i + 2021);

    const fields = [
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            placeholder: 'Enter name',
        },
        {
            name: 'organization',
            label: 'Organization',
            type: 'text',
            placeholder: 'Enter organization name',
        },
        {
            name: 'month_obtained',
            label: 'Month Obtained',
            type: 'select',
            placeholder: 'Enter month obtained',
            optionSelect: [
                { value: 'January', label: 'January' },
                { value: 'February', label: 'February' },
                { value: 'March', label: 'March' },
                { value: 'April', label: 'April' },
                { value: 'May5', label: 'May' },
                { value: 'June', label: 'June' },
                { value: 'July', label: 'July' },
                { value: 'August', label: 'August' },
                { value: 'September', label: 'September' },
                { value: 'October', label: 'October' },
                { value: 'November', label: 'November' },
                { value: 'December', label: 'December' },
            ],
        },
        {
            name: 'year_obtained',
            label: 'Year Obtained',
            type: 'select',
            placeholder: 'Enter year obtained',
            optionSelect: arrayTenYears.map((year) => ({
                value: year.toString(),
                label: year.toString(),
            })),
        },
        {
            name: 'month_expired',
            label: 'Month Expired',
            type: 'select',
            placeholder: 'Enter month expired',
            optionSelect: [
                { value: 'January', label: 'January' },
                { value: 'February', label: 'February' },
                { value: 'March', label: 'March' },
                { value: 'April', label: 'April' },
                { value: 'May5', label: 'May' },
                { value: 'June', label: 'June' },
                { value: 'July', label: 'July' },
                { value: 'August', label: 'August' },
                { value: 'September', label: 'September' },
                { value: 'October', label: 'October' },
                { value: 'November', label: 'November' },
                { value: 'December', label: 'December' },
            ],
        },
        {
            name: 'year_expired',
            label: 'Year Expired',
            type: 'select',
            placeholder: 'Enter year expired',
            optionSelect: arrayTenYears.map((year) => ({
                value: year.toString(),
                label: year.toString(),
            })),
        },
        {
            name: 'url',
            label: 'Url',
            type: 'text',
            placeholder: 'Enter url',
        },
        {
            name: 'description',
            label: 'Description',
            type: 'textarea',
            placeholder: 'Enter description',
        },
    ];

    const storeEndpoint = `${process.env.NEXT_PUBLIC_API_FETCH}/certificates`;

    return (
        <>
            <div className="card bg-base-300">
                <div className="card-body">
                    <CreateForm fields={fields} endPoint={storeEndpoint}></CreateForm>
                </div>
            </div>
        </>
    );
}
