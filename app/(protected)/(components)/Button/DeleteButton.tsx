'use client'; // Pastikan ini adalah Client Component

import React from 'react';
import Cookies from 'js-cookie';
import { useSWRConfig } from 'swr';
import toast from 'react-hot-toast';

interface DeleteButtonProps {
    identifier: string;
    endPoint: string;
    mutatePoint: [string, number, string];
}

async function deleteData(identifier: string, token: string, endPoint: string) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_FETCH}/${endPoint}/${identifier}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (!response.ok) {
        throw new Error('Failed to delete data');
    }

    return await response.json(); // Mengembalikan respons setelah berhasil dihapus
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
    identifier,
    endPoint,
    mutatePoint,
}) => {
    const token = Cookies.get('token') || '';

    const { mutate } = useSWRConfig();

    const handleDelete = async (identifier: string) => {
        const confirmDelete = confirm(
            'Are you sure you want to delete this data?'
        );

        if (confirmDelete) {
            try {
                await deleteData(identifier, token, endPoint);
                // Setelah berhasil dihapus, Anda dapat memperbarui state atau melakukan refetch data
                toast.success('Data deleted successfully');
                // revalidation
                mutate(mutatePoint, undefined, { revalidate: true });
            } catch (error) {
                console.error('Error deleting data:', error);
                toast.error('Failed to delete data');
            }
        }
    };

    return (
        <button
            className="btn btn-sm btn-error"
            onClick={() => handleDelete(identifier)}
        >
            Delete
        </button>
    );
};

export default DeleteButton;
