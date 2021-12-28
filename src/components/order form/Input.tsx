import React from 'react';

interface Props {
    title: string;
    className?: string;
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}

export const Input:React.FC<Props> = ({title,className,id,value, onChange, error}) => {
    return (
        <div className={`w-full flex flex-col mb-3 ${className}`}>
            <label className='text-xs xl:text-base text-zinc-300 mb-1'>{title}</label>
            <input id={id} value={value} onChange={onChange} type='text' className={`w-full text-sm lg:text-base border lg:border-2 border-zinc-200 rounded-md px-2 py-2 outline-none ${error && 'border-red-500'}`} />
            {error && <span className='text-[10px] xl:text-xs text-red-500 font-medium mt-1'>{error}</span>}
        </div>
    );
};
