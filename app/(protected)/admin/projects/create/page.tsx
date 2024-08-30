'use client';

import CreateForm from '@/app/(protected)/(components)/Form/CreateFrom';
import { getData } from '@/app/(protected)/utils/data';
import React from 'react';
import useSWR from 'swr';

interface ProjectCategory {
    id: number;
    uuid: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export default function ProjectCreate() {
    const { data: projectCategories } = useSWR(
        [`project-categories-select`],
        () =>
            getData(`${process.env.NEXT_PUBLIC_API_FETCH}/project-categories`),
        {
            revalidateOnFocus: false,
        }
    );

    const fields = [
        {
            name: 'title',
            label: 'Title',
            type: 'text',
            placeholder: 'Enter title',
        },
        {
            name: 'project_category_id',
            label: 'Project Category',
            type: 'select',
            placeholder: 'Enter Project Category',
            optionSelect: projectCategories?.data.map(
                (category: ProjectCategory) => ({
                    value: category.id.toString(),
                    label: category.name,
                })
            ),
        },
        {
            name: 'image',
            label: 'Image',
            type: 'file',
            placeholder: 'Enter project image',
        },
        {
            name: 'description',
            label: 'Description',
            type: 'editor',
            placeholder: 'Enter description',
        },
        {
            name: 'stack',
            label: 'Stack',
            type: 'text',
            placeholder: 'Enter Stack Project',
        },
        {
            name: 'link_github',
            label: 'Link Github',
            type: 'text',
            placeholder: 'Enter Link Github',
        },
        {
            name: 'link_project',
            label: 'Link Project',
            type: 'text',
            placeholder: 'Enter Link Project',
        },
        {
            name: 'link_documentation',
            label: 'Link Documentation',
            type: 'text',
            placeholder: 'Enter Link Documentation',
        },
        {
            name: 'meta_desc',
            label: 'Meta Description',
            type: 'textarea',
            placeholder: 'Enter Meta Description',
        },
        {
            name: 'meta_keyword',
            label: 'Meta Keyword',
            type: 'textarea',
            placeholder: 'Enter Meta Keyword',
        },
    ];

    const storeEndpoint = `${process.env.NEXT_PUBLIC_API_FETCH}/projects`;

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
