'use client';
import EditForm from '@/app/(protected)/(components)/Form/EditForm';
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

export default function ProjectCategoriesEdit({ params }: { params: any }) {
    const slug = params.slug;

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

    const patchEndpoint = `${process.env.NEXT_PUBLIC_API_FETCH}/projects/${slug}`;

    return (
        <>
            <div className="card bg-base-300">
                <div className="card-body">
                    <EditForm
                        fields={fields}
                        endPoint={patchEndpoint}
                        identifier={slug}
                        type="projects"
                    />
                </div>
            </div>
        </>
    );
}
