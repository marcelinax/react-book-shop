import { BiMinus } from 'react-icons/bi';
import { BiPlus } from 'react-icons/bi';
import { BiX } from 'react-icons/bi';
import React from 'react';

interface Props{
    cover_url: string;
    title: string;
    author: string;
    price: number;
    currency: string;
    amount: number;
    onDeleteBookFromShoppingCart: () => void;
    onIncreaseAmount: () => void;
    onDecreaseAmount: () => void;
}

export const ShoppingCartItem: React.FC<Props> = ({ author, cover_url, price, title, currency, onDeleteBookFromShoppingCart, amount, onIncreaseAmount, onDecreaseAmount }) => {
    return (
        <div className='w-full flex mb-10 last:mb-0 items-end'>
            <div className='bg-center bg-cover bg-no-repeat h-44 w-36 shadow-2xl book-cover before:w-[5px] relative border-zinc-300' style={{ backgroundImage: `url(${cover_url})` }} />
            <div className='py-14 w-full border-b border-zinc-200 flex pr-5 ml-10 items-center'>
                <div className='flex flex-col flex-1'>
                    <h6 className='font-semibold text-lg mb-3'>{title}</h6>
                    <p className='font-medium text-sm text-zinc-400'>{author}</p>
                </div>
                <div className='flex items-center flex-1 justify-end'>
                    <BiPlus className='mr-2 cursor-pointer' size={15} onClick={onIncreaseAmount}/>
                    <div className='w-12 h-12 border border-zinc-300 bg-zinc-50 rounded-full flex items-center justify-center text-xs font-extrabold'>{amount}</div>
                    <BiMinus className='ml-2 cursor-pointer' size={15} onClick={onDecreaseAmount}/>
                </div>
                <div className='flex-1 font-semibold text-center'>{price} {currency}</div>
                <div className='flex'>
                    <BiX className='cursor-pointer hover:scale-125 transition-all' size={20} onClick={onDeleteBookFromShoppingCart}/>
                </div>
            </div>
        </div>
    );
};
