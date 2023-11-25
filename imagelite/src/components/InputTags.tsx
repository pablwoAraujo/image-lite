import React, { Dispatch, SetStateAction } from "react";
import { InputText } from ".";

interface InputTagsProps {
    id?: string;
    tags: string[];
    setTags: Dispatch<SetStateAction<string[]>>;
}

export const InputTags: React.FC<InputTagsProps> = ({
    id, tags, setTags
}: InputTagsProps) => {
    function handleKeyDown(e: React.KeyboardEvent<Element>) {
        if (e.key !== 'Enter') return

        let target = e.target as HTMLInputElement;
        const value = target.value;

        if (!value.trim() || tags.includes(value.trim())) {
            e.preventDefault();
            return
        }

        setTags(tags => [...tags, value.trim()]);

        target.value = '';
        e.preventDefault();
    }

    function remove(index: number) {
        if (index > -1) {
            setTags(tags => tags.filter((s, i) => (i != index)))
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
                {tags.map((tag, index) => (
                    <div className="flex gap-2 bg-gray-300 rounded-lg px-2 py-1" key={index} >
                        <span>{tag}</span>
                        <span className="flex justify-center text-white bg-gray-700 rounded-full w-6 h-6" onClick={() => { remove(index) }}>&times;</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
