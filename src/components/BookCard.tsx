import { PrimaryButton } from './global/PrimaryButton';
import React from 'react';

interface Props {
    title: string,
    author: string,
    pages: number,
    cover_url: string
}

export const BookCard: React.FC<Props> = ({
    author,cover_url,pages,title
}) => {
    return (
        <div className='w-64 h-[700px] flex flex-col m-5'>
            <div className='w-full h-1/2 shadow-xl bg-center bg-no-repeat bg-cover relative' style={{ backgroundImage: `url(${cover_url})` }}>
                <div className=' py-2 px-4 z-10 bg-black/50 absolute bottom-0 left-0 rounded-tr-md text-white text-xs flex mx-auto font-semibold'>
                    {pages} stron
                </div>
            </div>
            <div className='flex flex-col w-full'>
                <PrimaryButton title='Dodaj do koszyka' type='button' className='my-5' onClick={()=>{}}/>
                <p className='font-bold w-full'>{title}</p>
                <p className='text-zinc-400 font-medium text-sm mt-2'>{author}</p>
            </div>
        </div>
    );
};
