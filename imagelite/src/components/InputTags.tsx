import { FormikValues } from "formik";
import React from "react";
import { InputText } from ".";

interface InputTagsProps {
    id?: string;
    formik: FormikValues;
}

export const InputTags: React.FC<InputTagsProps> = ({
    id, formik
}: InputTagsProps) => {
    function handleKeyDown(e: React.KeyboardEvent<Element>) {
        if (e.key !== 'Enter') return

        let target = e.target as HTMLInputElement;
        const value = target.value;

        if (!value.trim() || formik.values.tags.includes(value.trim())) {
            e.preventDefault();
            return
        }

        formik.setFieldValue("tags", [...formik.values.tags, value.trim()])

        target.value = '';
        e.preventDefault();
    }

    function remove(index: number) {
        if (index > -1) {
            const tags = (formik.values.tags as string[]).filter((s:string, i:number) => (i != index))
            formik.setFieldValue("tags", tags);
        }
    }

    return (
        <div className="tags-input-container flex gap-2 flex-wrap flex-col">
            <InputText
                id={id}
                placeholder="type and press enter to add"
                onKeyDown={(e) => handleKeyDown(e)}
            />

            <div className="flex flex-wrap gap-1">
                {formik.values.tags.map((tag:string, index:number) => (
                    <div className="flex gap-2 bg-gray-300 rounded-lg px-2 py-1" key={index} >
                        <span>{tag}</span>
                        <span className="flex justify-center text-white bg-gray-700 rounded-full w-6 h-6" onClick={() => { remove(index) }}>&times;</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
