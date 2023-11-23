import React from "react";

interface InputTagsProps {
    tags: string[];
    remove: (index: number) => void;
    push: (tag: any) => void;
}

export const InputTags: React.FC<InputTagsProps> = ({
    tags, remove, push
}: InputTagsProps) => {

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>, push: any) {
        if (e.key !== 'Enter') return

        let target = e.target as HTMLInputElement;
        const value = target.value;

        if (!value.trim()) {
            e.preventDefault();
            return
        }

        if (tags.includes(value.trim())){
            e.preventDefault();
            return
        }

        push(value.trim());

        target.value = '';
        e.preventDefault();
    }

    return (
        <div className="tags-input-container flex gap-2 flex-wrap flex-col">
            <input
                type="text"
                className="tags-input border px-3 py-2 rounded-lg text-gray-900"
                placeholder="press enter to add"
                onKeyDown={e => handleKeyDown(e, push)}
            />

            <div className="flex flex-wrap gap-1">
                {tags.map((tag, index) => (
                    <div className="flex gap-2 bg-gray-300 rounded-lg px-2 py-1" key={index} >
                        <span>{tag}</span>
                        <span className="flex justify-center text-white bg-gray-700 rounded-full w-6 h-6" onClick={() => remove(index)}>&times;</span>
                    </div>
                ))}
            </div>
        </div>
    )
}


