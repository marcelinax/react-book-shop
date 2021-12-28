import { PrimaryButton } from './global/PrimaryButton';
import React from 'react';

interface Props {
    id: number;
    title: string;
    author: string;
    pages: number;
    cover_url: string;
    price: number;
    onAddToShoppingCart: () => void;
}

export const BookCard: React.FC<Props> = ({
    author,cover_url,pages,title,onAddToShoppingCart, price
}) => {
    return (
        <div className='w-1/5 flex justify-center group transition-all'>
            <div className='w-48 h-[520px] flex flex-col mx-10'>
                <div className='w-full h-1/2 shadow-md border-zinc-300 border bg-center bg-no-repeat bg-cover relative book-cover' style={{ backgroundImage: `url(${cover_url})` }}>
                    <div className=' py-2 px-4 z-10 bg-black/50 absolute bottom-0 right-0 rounded-tl-md text-white text-xs flex mx-auto font-semibold'>
                        {pages} stron/-y
                    </div>
                </div>
                <div className='flex flex-col w-full'>
                    <PrimaryButton title='Dodaj do koszyka' type='button' className='my-5' onClick={onAddToShoppingCart} />
                    <p className='group-hover:text-base group-hover:font-semibold text-red-600  text-[0px] text-center -mt-2 mb-2 transition-all'>{price} PLN</p>
                    <p className='font-bold w-full'>{title}</p>
                    <p className='text-zinc-400 font-medium text-sm mt-2'>{author}</p>
                </div>
            </div>
        </div>
    );
};
