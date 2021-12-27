import { BiX } from 'react-icons/bi';
import { BreakLine } from '../global/BreakLine';
import React from 'react';

interface Props{
    cover_url: string;
    title: string;
    author: string;
    price: number;
    currency: string;
    onDeleteBookFromShoppingCart: () => void;
}

export const ShoppingCartItem: React.FC<Props> = ({author,cover_url,price,title,currency,onDeleteBookFromShoppingCart}) => {
    return (
        <div className='w-full flex py-10'>
            <div className='bg-center bg-cover bg-no-repeat h-full w-36 shadow-md' style={{ backgroundImage: `url(${cover_url})` }} />
            <div className='py-16 w-full border-b border-zinc-200 ml-10 flex pr-5'>
                <div className='flex flex-col flex-1'>
                    <h6 className='font-semibold'>{title}</h6>
                    <p className='font-medium text-sm text-zinc-400'>{author}</p>
                </div>
                <div className='flex items-center flex-1'>
                    <p className=' font-semibold mr-2 cursor-pointer'>-</p>
                    <div className='w-6 h-6 border border-zinc-200 flex items-center justify-center text-xs font-semibold'>1</div>
                    <p className=' font-semibold ml-2 cursor-pointer'>+</p>
                </div>
                <div className='flex-1'>{price} {currency}</div>
                <div className=''>
                    <BiX onClick={onDeleteBookFromShoppingCart}/>
                </div>
            </div>
        </div>
    );
};
