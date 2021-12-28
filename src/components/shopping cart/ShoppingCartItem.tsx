import { BiMinus } from 'react-icons/bi';
import { BiPlus } from 'react-icons/bi';
import { BiX } from 'react-icons/bi';
import React from 'react';

interface Props{
    cover_url: string;
    title: string;
    author: string
    price: number;
    currency: string;
    amount: number;
    onDeleteBookFromShoppingCart: () => void;
    onIncreaseAmount: () => void;
    onDecreaseAmount: () => void;
}

export const ShoppingCartItem: React.FC<Props> = ({ author, cover_url, price, title, currency, onDeleteBookFromShoppingCart, amount, onIncreaseAmount, onDecreaseAmount }) => {
    return (
        <div className='w-full flex flex-col md:flex-row mb-10 last:mb-0 items-start md:items-end relative'>
            <div className='bg-center bg-cover bg-no-repeat h-40 w-28 mx-auto md:w-36 md:h-42 xl:h-44 xl:w-36 shadow-2xl book-cover before:w-[5px] relative border-zinc-300' style={{ backgroundImage: `url(${cover_url})` }} />
            <div className='md:py-14 w-full md:border-b md:border-zinc-200 flex flex-col md:flex-row md:pr-5 md:ml-10 items-center mt-4 md:mt-0'>
                <div className='flex flex-col md:flex-1 text-center md:text-left'>
                    <h6 className='font-semibold text-xs lg:text-lg mb-3'>{title}</h6>
                    <p className='font-medium text-xs lg:text-sm text-zinc-400'>{author}</p>
                </div>
                <div className='flex flex-1 mt-4 md:mt-0 w-full justify-between'>
                    <div className='flex items-center justify-center flex-1 md:justify-end'>
                        <BiPlus className='mr-2 cursor-pointer' size={15} onClick={onIncreaseAmount}/>
                        <div className='w-8 h-8 lg:w-12 lg:h-12 border border-zinc-300  bg-white md:bg-zinc-50 rounded-full flex items-center justify-center text-xs font-extrabold'>{amount}</div>
                        <BiMinus className='ml-2 cursor-pointer' size={15} onClick={onDecreaseAmount}/>
                    </div>
                    <div className='flex-1 w-full text-sm lg:text-base font-semibold text-center flex items-center justify-center'>{price} {currency}</div>
                    <div className='flex items-center justify-center'>
                        <BiX className='absolute md:static top-0 right-3 cursor-pointer hover:scale-125 transition-all' size={20} onClick={onDeleteBookFromShoppingCart}/>
                    </div>
                </div>
            </div>
        </div>
    );
};
