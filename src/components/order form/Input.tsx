import React from 'react';

interface Props {
    title: string;
    className?: string;
    id: string;
    value: string;
    onChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input:React.FC<Props> = ({title,className,id,value, onChange}) => {
    return (
        <div className={`w-full flex flex-col mb-3 ${className}`}>
            <label className='text-zinc-300 mb-1'>{title}</label>
            <input id={id} value={value} onChange={onChange} type='text' className='w-full border-2 border-zinc-200 rounded-md px-2 py-2 outline-none'/>
        </div>
    );
};
