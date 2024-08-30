'use client';

import React from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

import toast from 'react-hot-toast';
import dynamic from 'next/dynamic';

if (typeof window !== 'undefined') {
    require('froala-editor/js/plugins.pkgd.min.js');
}

const FroalaEditorComponent = dynamic(() => import('react-froala-wysiwyg'), {
    ssr: false,
});

type Field = {
    name: string;
    label: string;
    type?: string;
    placeholder?: string;
    optionSelect?: { value: string; label: string }[];
};

type CreateFormProps = {
    fields: Field[];
    endPoint: string;
};

const CreateForm: React.FC<CreateFormProps> = ({ fields, endPoint }) => {
    const configEditor = {
        placeholderText: 'Edit Your Content Here!',
        imageAllowedTypes: ['jpeg', 'jpg', 'png'],
        plainPaste: false,
        height: '300',
        width: '100%',
        paragraphFormat: {
            N: 'Normal',
            heading1: 'Heading 1',
            H2: 'Heading 2',
        },
        pluginsEnabled: [
            'align',
            'colors',
            'image',
            'video',
            'imageManager',
            'link',
            'lists',
            'paragraphFormat',
            'quote',
            'table',
            'url',
            'wordPaste',
            'wordCounter',
            'fullscreen',
            'embedly',
            'charCounter',
            'codeView',
            'codeBeautifier',
            'getPDF',
            'html',
            'lineBreaker',
            'inlineStyle',
            'paragraphStyle',
            'markdown',
            'entities',
            'quickInsert',
            'fontSize',
        ],
        colorsBackground: ['REMOVE'],
    };

    const [formData, setFormData] = React.useState<{ [key: string]: any }>({});
    const [errorMessages, setErrorMessages] = React.useState<{
        [key: string]: string[];
    }>({});
    const token = Cookies.get('token');
    const router = useRouter();

    const handleChange = (
        event: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });

        // Clear error message when user types
        setErrorMessages((prev) => ({
            ...prev,
            [event.target.name]: [],
        }));
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
            method: 'POST',
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

        if (response.status === 201) {
            toast.success('Data created successfully');
            router.back();
        }
    };

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
                            className="textarea"
                            rows={5}
                            cols={175}
                            onChange={handleChange}
                        />
                    ) : field.type === 'editor' ? (
                        typeof window !== 'undefined' && (
                            <FroalaEditorComponent
                                tag="textarea"
                                model={formData[field.name]}
                                onModelChange={(model: string) =>
                                    setFormData({
                                        ...formData,
                                        [field.name]: model,
                                    })
                                }
                                config={configEditor}
                            />
                        )
                    ) : field.type === 'file' ? (
                        <input
                            type="file"
                            name={field.name}
                            id={field.name}
                            placeholder={field.placeholder || ''}
                            className="file-input file-input-bordered w-full max-w-full"
                            onChange={(event) => {
                                const file = event.target.files?.[0];
                                if (file) {
                                    setFormData({
                                        ...formData,
                                        [field.name]: file,
                                    });
                                }
                            }}
                        />
                    ) : (
                        <input
                            type={field.type || 'text'}
                            name={field.name}
                            id={field.name}
                            placeholder={field.placeholder || ''}
                            className="input input-bordered w-full max-w-full"
                            onChange={handleChange}
                        />
                    )}

                    {/* Tampilkan pesan error untuk field ini */}
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

export default CreateForm;
