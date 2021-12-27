import { BiCart } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import React from 'react';

export const Navbar: React.FC = () => {
    return (
        <div className='w-full flex shadow-lg bg-white p-8 items-center justify-between'>
            <div className='text-2xl font-bold'>
                <Link to='/'>IBooks</Link>
            </div>
            <div className='flex'>
                <Link to='/shopping-cart'>
                    <BiCart size={24} className='cursor-pointer'/>
                </Link>
            </div>
        </div>
    );
};
