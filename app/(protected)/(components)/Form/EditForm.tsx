'use client';

import React from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { showData } from '../../utils/data';

import toast from 'react-hot-toast';

import dynamic from 'next/dynamic';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

type Field = {
    name: string;
    label: string;
    type?: string;
    placeholder?: string;
    optionSelect?: { value: string; label: string }[];
};

type EditFormProps = {
    fields: Field[];
    endPoint: string;
    identifier: string;
    type: string;
};

const EditForm: React.FC<EditFormProps> = ({
    fields,
    endPoint,
    identifier,
    type,
}) => {
    const editor = React.useRef(null);
    const [content, setContent] = React.useState('');

    const config = React.useMemo(
        () => ({
            readonly: false,
            placeholder: 'Start typings...',
            uploader: {
                insertImageAsBase64URI: true,
            },
            minHeight: '800',
        }),
        []
    );

    const [formData, setFormData] = React.useState<{ [key: string]: any }>({});
    const [loading, setLoading] = React.useState<boolean>(true);
    const [errorMessages, setErrorMessages] = React.useState<{
        [key: string]: string[];
    }>({});

    const token = Cookies.get('token');

    const router = useRouter();

    React.useEffect(() => {
        const fetchData = async () => {
            const dataFetch = await showData(
                `${process.env.NEXT_PUBLIC_API_FETCH}/${type}/${identifier}`
            );

            setFormData({
                ...dataFetch,
                tags: dataFetch.tags
                    ? dataFetch.tags.map((tag: any) => tag.name).join(', ')
                    : '',
            });
            setLoading(false);
        };

        fetchData();
    }, [fields, type, identifier]);

    const handleChange = (
        event: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const hasFile = fields.some((field) => field.type === 'file');

        let formDataToSend;

        if (hasFile) {
            formDataToSend = new FormData();
            for (const key in formData) {
                formDataToSend.append(key, formData[key]);
            }
        } else {
            formDataToSend = JSON.stringify(formData);
        }

        const headers: { [key: string]: string } = {
            Authorization: `Bearer ${token}`,
        };

        if (!hasFile) {
            headers['Content-Type'] = 'application/json';
        }

        const response = await fetch(endPoint, {
            method: 'PATCH',
            headers,
            body: formDataToSend,
        });

        if (response.status === 400) {
            const { errors } = await response.json();
            const newErrorMessages: { [key: string]: string[] } = {};

            errors.forEach((error: any) => {
                const fieldName = error.path;
                if (!newErrorMessages[fieldName]) {
                    newErrorMessages[fieldName] = [];
                }
                newErrorMessages[fieldName].push(error.msg);
            });

            setErrorMessages(newErrorMessages);
        }

        if (response.status == 422) {
            toast.error(await response.text());
        }

        if (response.status === 200) {
            toast.success('Data updated successfully');
            router.back();
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            {fields.map((field) => (
                <div key={field.name} className="mb-4">
                    <label
                        htmlFor={field.name}
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        {field.label}
                    </label>

                    {field.type === 'select' ? (
                        <select
                            value={formData[field.name]}
                            name={field.name}
                            id={field.name}
                            className="select select-bordered w-full max-w-full"
                            onChange={handleChange}
                        >
                            <option value="">Select an option</option>
                            {field.optionSelect?.map((option, index) => (
                                <option key={index} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    ) : field.type === 'textarea' ? (
                        <textarea
                            name={field.name}
                            id={field.name}
                            placeholder={field.placeholder || ''}
                            value={formData[field.name] || ''}
                            className="textarea"
                            rows={5}
                            cols={175}
                            onChange={handleChange}
                        />
                    ) : field.type === 'editor' ? (
                        <JoditEditor
                            ref={editor}
                            value={formData[field.name]}
                            config={config}
                            onBlur={(newContent) => setContent(newContent)}
                            onChange={(newContent) => {
                                setFormData({
                                    ...formData,
                                    [field.name]: newContent,
                                });
                            }}
                        />
                    ) : field.type === 'file' ? (
                        <input
                            type="file"
                            name={field.name}
                            id={field.name}
                            placeholder={field.placeholder || ''}
                            className="file-input file-input-bordered w-full max-w-full"
                            onChange={(event) => {
                                setFormData({
                                    ...formData,
                                    [field.name]: event.target.files?.[0],
                                });
                            }}
                        />
                    ) : (
                        <input
                            type={field.type || 'text'}
                            name={field.name}
                            id={field.name}
                            placeholder={field.placeholder || ''}
                            value={formData[field.name] || ''}
                            className="input input-bordered w-full max-w-full"
                            onChange={handleChange}
                        />
                    )}

                    {errorMessages[field.name] &&
                        errorMessages[field.name].length > 0 && (
                            <p className="text-red-500 text-xs mt-2">
                                {errorMessages[field.name][0]}
                            </p>
                        )}
                </div>
            ))}
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Submit
            </button>
        </form>
    );
};

export default EditForm;
