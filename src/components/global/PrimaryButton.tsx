import React from 'react';

interface Props {
    title: string;
    type?: 'submit' | 'reset' | 'button';
    onClick: () => void;
    className?: string;
}

export const PrimaryButton: React.FC<Props> = ({ title, onClick, type, className }) => {
    
    return (
        <button className={`py-2 bg-black font-medium text-white rounded-md hover:scale-95 transition-all ${className}`} type={type} onClick={onClick}>{title}</button>
    );
   
};
