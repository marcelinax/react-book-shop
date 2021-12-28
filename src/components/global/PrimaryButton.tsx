import React from 'react';

interface Props {
    title: string;
    type?: 'submit' | 'reset' | 'button';
    onClick: () => void;
    className?: string;
    disabled?: boolean;
}

export const PrimaryButton: React.FC<Props> = ({ title, onClick, type, className,disabled }) => {
    return (
        <button className={`py-2 bg-black font-medium text-white rounded-md hover:scale-95 transition-all ${disabled && 'opacity-60 hover:scale-100 transition-none'} ${className}`} type={type} disabled={disabled} onClick={onClick}>{title}</button>
    );
};
