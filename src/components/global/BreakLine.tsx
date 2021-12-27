import React from 'react';

interface Props {
    className?: string
}

export const BreakLine: React.FC<Props> = ({className}) => {
    return (
        <div className={`bg-zinc-200 w-full h-[1px] ${className}`} />
    );
};
