import { Link } from 'react-router-dom';
import React from 'react';

interface Props{
    title: string;
    to: string;
}

export const UnderlineLink: React.FC<Props> = ({ title, to }) => {
    return (
        <Link to={to} className='font-bold text-xs xl:text-sm relative underline-link transition-all'>{title}</Link>
    );
};
