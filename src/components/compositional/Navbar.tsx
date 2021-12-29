import { BiCart } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import React from 'react';
import { locales } from './../../Locales';

export const Navbar: React.FC = () => {
    return (
        <div className='w-full flex shadow-md bg-white p-8 items-center justify-between z-20'>
            <div className='text-2xl font-bold'>
                <Link to='/'>{locales.ibooks}</Link>
            </div>
            <div className='flex'>
                <Link to='/shopping-cart'>
                    <BiCart size={24} className='cursor-pointer'/>
                </Link>
            </div>
        </div>
    );
};
