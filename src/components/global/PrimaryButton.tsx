import React from 'react';

interface Props {
    title: string;
    type?: 'submit' | 'reset' | 'button';
    onClick: () => void;
    className?: string;
}

export const PrimaryButton: React.FC<Props> = ({ title, onClick, type, className }) => {
    return (
        <button className={`w-full py-2 bg-black text-white rounded-md ${className}`} type={type} onClick={onClick}>{title}</button>
    );
};
