import React from 'react';

interface Props {
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
}

export const BookFilterItem: React.FC<Props> = ({ id, onChange, value,placeholder }) => {
    return (
        <div className='w-full flex rounded-lg overflow-hidden shadow-md'>
            <input type='text' placeholder={placeholder} className='w-full text-sm px-5 lg:py-2 py-3 rounded-lg outline-none border border-zinc-300 xl:text-base' onChange={onChange} value={value} id={id}/>
        </div>
    );
};
